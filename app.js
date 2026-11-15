/* Lógica do site — normalmente não precisa mexer aqui. Os dados ficam em dados.js. */

const MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
const MESES_CURTOS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const SEMANA = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---------- Datas ---------- */
const chave = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const deChave = (k) => { const [a, m, d] = k.split("-").map(Number); return new Date(a, m - 1, d); };
const somaDias = (k, n) => { const d = deChave(k); d.setDate(d.getDate() + n); return chave(d); };
const HOJE = chave(new Date());

function dataLonga(k) {
  const d = deChave(k);
  return `${SEMANA[d.getDay()]}, ${d.getDate()} de ${MESES[d.getMonth()]}`;
}
function dataCurta(k) {
  const d = deChave(k);
  return `${d.getDate()} ${MESES_CURTOS[d.getMonth()]}`;
}

/* ---------- Disponibilidade ---------- */
const aptoPorId = (id) => APARTAMENTOS.find((a) => a.id === id);

// Datas vindas dos calendários (disponibilidade.js) substituem o "ocupado" de dados.js.
if (typeof DISPONIBILIDADE !== "undefined" && DISPONIBILIDADE.ocupado) {
  for (const a of APARTAMENTOS) {
    const per = DISPONIBILIDADE.ocupado[a.id];
    if (Array.isArray(per)) a.ocupado = per;
  }
}

function renderAtualizado() {
  const p = $("#cal-atualizado");
  if (!p || typeof DISPONIBILIDADE === "undefined" || !DISPONIBILIDADE.atualizado) return;
  const [data, hora] = DISPONIBILIDADE.atualizado.split("T");
  p.textContent = `Datas sincronizadas com Airbnb, Booking e Vrbo em ${dataCurta(data)} às ${hora}. Confirme sempre no anúncio antes de reservar.`;
  p.hidden = false;
}

// ocupado: null = datas ainda não informadas; nesse caso o site manda conferir no anúncio.
const semDatas = (apto) => !Array.isArray(apto.ocupado);

// "fim" é o dia do check-out, então esse dia já conta como livre.
const estaOcupado = (apto, k) => !semDatas(apto) && apto.ocupado.some((p) => k >= p.inicio && k < p.fim);

function livreNoPeriodo(apto, inicio, fim) {
  for (let k = inicio; k <= fim; k = somaDias(k, 1)) if (estaOcupado(apto, k)) return false;
  return true;
}

function proximoDiaLivre(apto) {
  for (let i = 0, k = HOJE; i < 365; i++, k = somaDias(k, 1)) if (!estaOcupado(apto, k)) return k;
  return null;
}

const eventosDoDia = (k) => EVENTOS.filter((e) => k >= e.data && k <= (e.dataFim || e.data));

/* ---------- Links de reserva ---------- */
function botoesReserva(apto, pequeno = false) {
  const tam = pequeno ? " botao-pequeno" : "";
  const l = apto.links || {};
  let html = "";
  if (l.airbnb) html += `<a class="botao botao-airbnb${tam}" href="${esc(l.airbnb)}" target="_blank" rel="noopener">Airbnb ↗</a>`;
  if (l.booking) html += `<a class="botao botao-booking${tam}" href="${esc(l.booking)}" target="_blank" rel="noopener">Booking ↗</a>`;
  if (l.vrbo) html += `<a class="botao botao-vrbo${tam}" href="${esc(l.vrbo)}" target="_blank" rel="noopener">Vrbo ↗</a>`;
  if (l.outro) html += `<a class="botao botao-outro${tam}" href="${esc(l.outro)}" target="_blank" rel="noopener">Reservar ↗</a>`;
  return html;
}

/* ---------- Apartamentos ---------- */
let cidadeSel = "todas";

function renderFiltroCidades() {
  const cidades = [...new Set(APARTAMENTOS.map((a) => a.cidade))];
  const box = $("#filtro-cidades");
  if (cidades.length < 2) { box.hidden = true; return; }
  box.innerHTML = ["todas", ...cidades].map((c) =>
    `<button class="filtro" data-cidade="${esc(c)}" aria-pressed="${c === cidadeSel}">${c === "todas" ? "Todas as cidades" : esc(c)}</button>`
  ).join("");
  box.onclick = (ev) => {
    const b = ev.target.closest("[data-cidade]");
    if (!b) return;
    cidadeSel = b.dataset.cidade;
    renderFiltroCidades();
    renderApartamentos();
  };
}

function renderGaleria(apto) {
  if (!apto.fotos.length) return `<div class="foto-vazia">[Foto do apartamento]</div>`;
  const multi = apto.fotos.length > 1;
  return `
    <img src="${esc(apto.fotos[0])}" alt="${esc(apto.nome)}" loading="lazy" data-i="0">
    ${multi ? `
      <button class="galeria-nav ant" aria-label="Foto anterior">‹</button>
      <button class="galeria-nav prox" aria-label="Próxima foto">›</button>
      <div class="galeria-pontos">${apto.fotos.map((_, i) => `<i class="${i ? "" : "ativo"}"></i>`).join("")}</div>` : ""}`;
}

function renderApartamentos() {
  const lista = APARTAMENTOS.filter((a) => cidadeSel === "todas" || a.cidade === cidadeSel);
  $("#lista-aptos").innerHTML = lista.map((a) => {
    const livreHoje = !estaOcupado(a, HOJE);
    const prox = livreHoje ? null : proximoDiaLivre(a);
    const status = semDatas(a)
      ? `<i style="background:var(--texto-suave)"></i> Consulte as datas no anúncio`
      : livreHoje
      ? `<i style="background:var(--ouro)"></i> Livre hoje`
      : `<i style="background:var(--rosa)"></i> Ocupado hoje${prox ? ` · livre a partir de ${dataCurta(prox)}` : ""}`;
    return `
      <article class="apto" data-id="${esc(a.id)}">
        <div class="galeria">
          ${renderGaleria(a)}
          <span class="apto-local">${esc(a.cidade)}</span>
        </div>
        <div class="apto-corpo">
          <h3>${esc(a.nome)}</h3>
          <div class="apto-info">
            <span><b>${a.hospedes}</b> hóspedes</span>
            <span><b>${a.quartos}</b> ${a.quartos === 1 ? "quarto" : "quartos"}</span>
            <span>${esc(a.bairro)}</span>
          </div>
          <p class="apto-desc">${esc(a.descricao)}</p>
          ${regiaoDoApto(a.id) ? `<a class="apto-perto" href="#perto" data-ver-regiao="${esc(regiaoDoApto(a.id).id)}">${esc(regiaoDoApto(a.id).destaque)}</a>` : ""}
          <p class="apto-status">${status}</p>
          <button class="link-texto" data-ver-cal="${esc(a.id)}">Ver datas livres no calendário</button>
          <div class="apto-acoes">${botoesReserva(a)}</div>
        </div>
      </article>`;
  }).join("");
}

$("#lista-aptos").addEventListener("click", (ev) => {
  const perto = ev.target.closest("[data-ver-regiao]");
  if (perto) { regiaoSel = perto.dataset.verRegiao; renderPerto(); return; }
  const cal = ev.target.closest("[data-ver-cal]");
  if (cal) {
    aptoCal = cal.dataset.verCal;
    renderCalendario();
    $("#calendario").scrollIntoView();
    return;
  }
  const nav = ev.target.closest(".galeria-nav");
  if (nav) {
    const card = nav.closest(".apto");
    const apto = aptoPorId(card.dataset.id);
    const img = card.querySelector(".galeria img");
    const n = apto.fotos.length;
    const i = (Number(img.dataset.i) + (nav.classList.contains("prox") ? 1 : -1) + n) % n;
    img.src = apto.fotos[i];
    img.dataset.i = i;
    card.querySelectorAll(".galeria-pontos i").forEach((p, j) => p.classList.toggle("ativo", j === i));
  }
});

/* ---------- O que tem perto (abas por região) ---------- */
const linkMapa = (busca) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(busca)}`;
const regiaoDoApto = (id) => PERTO_REGIOES.find((r) => r.apartamentos.includes(id));
let regiaoSel = PERTO_REGIOES[0].id;

function renderPerto() {
  const info = PERTO_REGIOES.find((r) => r.id === regiaoSel);
  $("#abas-regiao").innerHTML = PERTO_REGIOES.map((r) =>
    `<button class="aba-regiao" role="tab" data-regiao="${esc(r.id)}" aria-selected="${r.id === regiaoSel}">${esc(r.aba)}</button>`
  ).join("");
  $("#perto-etiqueta").textContent = info.etiqueta;
  $("#perto-titulo").textContent = info.titulo;
  $("#perto-texto").textContent = info.texto;
  $("#interlagos-aptos").innerHTML = info.apartamentos.map(aptoPorId).filter(Boolean).map((a) => `
    <button class="interlagos-apto" data-ir-apto="${esc(a.id)}">
      ${a.fotos[0] ? `<img src="${esc(a.fotos[0])}" alt="" loading="lazy">` : ""}
      <span><b>${esc(a.nome)}</b><small>${a.hospedes} hóspedes · ${a.quartos} ${a.quartos === 1 ? "quarto" : "quartos"}</small></span>
    </button>`).join("");

  $("#lista-lugares").innerHTML = info.lugares.map((l) => `
    <article class="lugar">
      ${l.foto ? fotoFundo(l.foto, "lugar-foto") : ""}
      <div class="lugar-topo">
        <span class="lugar-tipo">${esc(l.tipo)}</span>
        <span class="lugar-dist">${esc(l.distancia)}</span>
      </div>
      <h3>${esc(l.nome)}</h3>
      <p>${esc(l.descricao)}</p>
      <a class="link-texto" href="${linkMapa(l.mapa)}" target="_blank" rel="noopener">Ver no mapa ↗</a>
    </article>`).join("");
}

$("#abas-regiao").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-regiao]");
  if (!b) return;
  regiaoSel = b.dataset.regiao;
  renderPerto();
});

$("#interlagos-aptos").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-ir-apto]");
  if (!b) return;
  if (cidadeSel !== "todas") { cidadeSel = "todas"; renderFiltroCidades(); renderApartamentos(); }
  document.querySelector(`.apto[data-id="${b.dataset.irApto}"]`)?.scrollIntoView({ block: "center" });
});

/* ---------- Calendário ---------- */
// Cada apartamento ganha uma cor própria, usada nas barrinhas do calendário e no painel do dia.
const CORES_APTO = ["#A4475D", "#C99C68", "#6B2E3E", "#C9775B", "#8A8B5C", "#B58BA0"];
const corApto = (a) => a.cor || CORES_APTO[APARTAMENTOS.indexOf(a) % CORES_APTO.length];
const SEMANA_CURTA = ["D", "S", "T", "Q", "Q", "S", "S"];

let aptoCal = "todos";
let modoCal = "linha";          // "linha" = uma linha por apartamento; "mes" = calendário do mês
let diaSel = HOJE;
let mesCal = deChave(HOJE.slice(0, 8) + "01");
const MES_MIN = new Date(mesCal);
const MES_MAX = new Date(mesCal.getFullYear(), mesCal.getMonth() + 12, 1);

const aptosDoCalendario = () => aptoCal === "todos" ? APARTAMENTOS : [aptoPorId(aptoCal)];

function diasDoMes() {
  const ano = mesCal.getFullYear(), mes = mesCal.getMonth();
  const total = new Date(ano, mes + 1, 0).getDate();
  return Array.from({ length: total }, (_, i) => chave(new Date(ano, mes, i + 1)));
}

// Primeiro dia (a partir de k) em que o apartamento volta a ficar livre.
function livreDeNovo(apto, k) {
  for (let i = 0; i < 400 && estaOcupado(apto, k); i++) k = somaDias(k, 1);
  return k;
}

function resumoDia(k, aptos) {
  const ocup = aptos.filter((a) => estaOcupado(a, k)).length;
  if (aptos.length === 1) return ocup ? "Ocupado" : "Livre";
  if (!ocup) return "Todos livres";
  if (ocup === aptos.length) return "Lotado";
  return `${aptos.length - ocup} livres`;
}

function renderFiltroCal() {
  const opcoes = [{ id: "todos", nome: "Todos" }, ...APARTAMENTOS];
  $("#filtro-cal").innerHTML = opcoes.map((a) =>
    `<button class="filtro filtro-apto" data-apto="${esc(a.id)}" aria-pressed="${a.id === aptoCal}">${
      a.id === "todos" ? "" : `<i style="--c:${corApto(a)}"></i>`}${esc(a.nome)}</button>`
  ).join("");
}

$("#filtro-cal").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-apto]");
  if (!b) return;
  aptoCal = b.dataset.apto;
  renderCalendario();
});

function classeDia(k) {
  if (k < HOJE) return "passado";
  const aptos = aptosDoCalendario().filter((a) => !semDatas(a));
  if (!aptos.length) return "consulte";
  const livres = aptos.filter((a) => !estaOcupado(a, k)).length;
  if (livres === aptos.length) return "livre";
  if (livres === 0) return "ocupado";
  return "parcial";
}

/* Visão "Por apartamento": uma linha para cada apartamento, uma coluna para cada dia. */
function vistaLinha() {
  const dias = diasDoMes();
  const aptos = aptosDoCalendario();
  const colClasse = (k) => [k < HOJE && "passado", k === HOJE && "hoje", k === diaSel && "sel",
    [0, 6].includes(deChave(k).getDay()) && "fds"].filter(Boolean).join(" ");

  const cabeca = dias.map((k) => {
    const d = deChave(k);
    return `<th scope="col" class="${colClasse(k)}" data-dia="${k}"><small>${SEMANA_CURTA[d.getDay()]}</small>${d.getDate()}</th>`;
  }).join("");

  const linhas = aptos.map((a) => {
    const cor = corApto(a);
    const celulas = dias.map((k, i) => {
      const oc = estaOcupado(a, k);
      const cls = [colClasse(k)];
      if (oc) {
        cls.push("oc");
        if (!(i > 0 && estaOcupado(a, dias[i - 1]))) cls.push("ini");
        if (!(i < dias.length - 1 && estaOcupado(a, dias[i + 1]))) cls.push("fim");
      }
      return `<td class="${cls.join(" ")}" data-dia="${k}" title="${esc(a.nome)} · ${dataCurta(k)}: ${oc ? "ocupado" : "livre"}">${
        oc ? `<span style="--c:${cor}"></span>` : ""}</td>`;
    }).join("");
    return `<tr><th scope="row" class="linha-apto"><div><i style="--c:${cor}"></i><span><b>${esc(a.nome)}</b><small>${esc(a.cidade)}</small></span></div></th>${celulas}</tr>`;
  }).join("");

  const eventos = dias.map((k) => {
    const evs = eventosDoDia(k);
    return `<td class="${colClasse(k)}" data-dia="${k}"${evs.length ? ` title="${esc(evs.map((e) => e.titulo).join(", "))}"` : ""}>${evs.length ? "<i></i>" : ""}</td>`;
  }).join("");

  return `
    <div class="linha-scroll">
      <table class="linha">
        <thead><tr><th class="linha-apto"></th>${cabeca}</tr></thead>
        <tbody>
          ${linhas}
          <tr class="linha-ev"><th scope="row" class="linha-apto"><div><span><b>Eventos</b><small>na região</small></span></div></th>${eventos}</tr>
        </tbody>
      </table>
    </div>`;
}

/* Visão "Mês": calendário tradicional; cada dia mostra barrinhas com a cor dos apartamentos ocupados. */
function vistaMes() {
  const ano = mesCal.getFullYear(), mes = mesCal.getMonth();
  const aptos = aptosDoCalendario();
  let html = `<div class="cal-semana">${["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((s) => `<span>${s}</span>`).join("")}</div><div class="cal-dias">`;
  for (let i = 0, n = new Date(ano, mes, 1).getDay(); i < n; i++) html += `<span class="dia vazio"></span>`;
  for (const k of diasDoMes()) {
    const evs = eventosDoDia(k);
    const passado = k < HOJE;
    const ocup = passado ? [] : aptos.filter((a) => estaOcupado(a, k));
    const resumo = passado ? "" : resumoDia(k, aptos);
    const cls = ["dia", classeDia(k)];
    if (k === HOJE) cls.push("hoje");
    if (k === diaSel) cls.push("selecionado");
    html += `<button class="${cls.join(" ")}" data-dia="${k}"${passado ? " disabled" : ""} aria-label="${dataLonga(k)}${resumo ? ": " + resumo : ""}">
      <span class="dia-num">${deChave(k).getDate()}</span>
      ${evs.length && !passado ? `<span class="ponto-evento" title="${esc(evs.map((e) => e.titulo).join(", "))}"></span>` : ""}
      <span class="dia-resumo">${resumo}</span>
      <span class="dia-marcas">${ocup.map((a) => `<i style="--c:${corApto(a)}" title="${esc(a.nome)} ocupado"></i>`).join("")}</span>
    </button>`;
  }
  return html + "</div>";
}

function legendaCal() {
  if (modoCal === "linha") return `
    <span><i class="leg leg-barra"></i>Reservado (cor do apartamento)</span>
    <span><i class="leg leg-livre"></i>Livre</span>
    <span><i class="leg leg-evento"></i>Evento na região</span>`;
  return `
    <span><i class="leg leg-livre"></i>Todos livres</span>
    <span><i class="leg leg-parcial"></i>Alguns ocupados: as barrinhas mostram quais</span>
    <span><i class="leg leg-ocupado"></i>Lotado</span>
    <span><i class="leg leg-evento"></i>Evento</span>`;
}

function renderCalendario() {
  renderFiltroCal();
  const ano = mesCal.getFullYear(), mes = mesCal.getMonth();
  $("#mes-titulo").textContent = `${MESES[mes]} ${ano}`;
  $("#mes-anterior").disabled = mesCal <= MES_MIN;
  $("#mes-proximo").disabled = new Date(ano, mes + 1, 1) >= MES_MAX;
  document.querySelectorAll(".cal-modo").forEach((b) => b.setAttribute("aria-selected", b.dataset.modo === modoCal));
  $("#cal-layout").classList.toggle("modo-linha", modoCal === "linha");

  // Na visão por apartamento, mantém a rolagem lateral ao trocar de dia no mesmo mês.
  const rolagem = $(".linha-scroll");
  const manter = rolagem && rolagem.dataset.mes === `${ano}-${mes}` ? rolagem.scrollLeft : null;
  $("#cal-vista").innerHTML = modoCal === "linha" ? vistaLinha() : vistaMes();
  $("#cal-legenda").innerHTML = legendaCal();
  const nova = $(".linha-scroll");
  if (nova) {
    nova.dataset.mes = `${ano}-${mes}`;
    if (manter !== null) nova.scrollLeft = manter;
    else {
      const th = nova.querySelector(`thead [data-dia="${diaSel}"]`);
      // deixa o dia escolhido logo depois da coluna com os nomes, com um dia anterior à vista
      if (th) nova.scrollLeft = Math.max(0, th.offsetLeft - nova.querySelector(".linha-apto").offsetWidth - th.offsetWidth);
    }
  }
  renderPainelDia();
}

function renderPainelDia() {
  const k = diaSel;
  const evs = eventosDoDia(k);
  const aptos = aptosDoCalendario();
  const livres = aptos.filter((a) => !estaOcupado(a, k));
  const ocupados = aptos.filter((a) => estaOcupado(a, k));
  const quartos = (a) => `${a.hospedes} hóspedes · ${a.quartos} ${a.quartos === 1 ? "quarto" : "quartos"}`;

  const resumo = aptos.length > 1
    ? `${livres.length} de ${aptos.length} apartamentos livres`
    : livres.length ? "Livre nesta data" : "Ocupado nesta data";

  const htmlLivres = livres.length
    ? livres.map((a) => `
        <div class="painel-apto">
          <i style="--c:${corApto(a)}"></i>
          <div><p><b>${esc(a.nome)}</b> <small>· ${esc(a.cidade)}</small></p><small>${quartos(a)}</small></div>
          <div class="painel-links">${botoesReserva(a, true)}</div>
        </div>`).join("")
    : `<p class="painel-vazio">Nenhum apartamento livre nesta data.</p>`;

  const htmlOcupados = ocupados.map((a) => `
        <div class="painel-apto ocupado">
          <i style="--c:${corApto(a)}"></i>
          <div><p><b>${esc(a.nome)}</b> <small>· ${esc(a.cidade)}</small></p><small>Reservado · livre de novo em ${dataCurta(livreDeNovo(a, k))}</small></div>
        </div>`).join("");

  const htmlEventos = evs.length
    ? evs.map((e) => `
        <div class="painel-item">
          <div><p><b>${esc(e.titulo)}</b></p><small>${esc(e.local)} · ${esc(e.categoria)}</small></div>
          ${e.link ? `<a class="link-texto" href="${esc(e.link)}" target="_blank" rel="noopener">Saiba mais</a>` : ""}
        </div>`).join("")
    : `<p class="painel-vazio">Nenhum evento cadastrado neste dia.</p>`;

  $("#dia-painel").innerHTML = `
    <p class="sub">${k === HOJE ? "Hoje · " : ""}${deChave(k).getFullYear()}</p>
    <h3>${dataLonga(k)}</h3>
    <span class="painel-resumo${livres.length ? "" : " cheio"}">${resumo}</span>
    <div class="painel-blocos">
      <div class="painel-bloco"><h4>Livres nesta data</h4>${htmlLivres}</div>
      ${ocupados.length ? `<div class="painel-bloco"><h4>Ocupados nesta data</h4>${htmlOcupados}</div>` : ""}
      <div class="painel-bloco"><h4>Eventos na região</h4>${htmlEventos}</div>
    </div>`;
}

$("#cal-vista").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-dia]");
  if (!b || b.disabled || b.dataset.dia < HOJE) return;
  diaSel = b.dataset.dia;
  renderCalendario();
});
document.querySelector(".cal-modos").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-modo]");
  if (!b) return;
  modoCal = b.dataset.modo;
  renderCalendario();
});
function mudarMes(n) {
  mesCal = new Date(mesCal.getFullYear(), mesCal.getMonth() + n, 1);
  const primeiro = chave(mesCal);
  diaSel = primeiro < HOJE ? HOJE : primeiro;
  renderCalendario();
}
$("#mes-anterior").onclick = () => mudarMes(-1);
$("#mes-proximo").onclick = () => mudarMes(1);

/* ---------- Eventos ---------- */
let cidadeEvento = "todas";
const cidadeDoEvento = (e) => aptoPorId(e.apartamentos[0])?.cidade || "";

function renderFiltroEventos() {
  const cidades = [...new Set(EVENTOS.map(cidadeDoEvento).filter(Boolean))];
  const box = $("#filtro-eventos");
  if (cidades.length < 2) { box.hidden = true; return; }
  box.innerHTML = ["todas", ...cidades].map((c) =>
    `<button class="filtro" data-cidade="${esc(c)}" aria-pressed="${c === cidadeEvento}">${c === "todas" ? "Todas as cidades" : esc(c)}</button>`
  ).join("");
}

$("#filtro-eventos").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-cidade]");
  if (!b) return;
  cidadeEvento = b.dataset.cidade;
  renderFiltroEventos();
  renderEventos();
});

/* Ilustrações de fundo dos cards de evento: traço fino, no estilo art déco do logo.
   Cada uma é o miolo de um <svg viewBox="0 0 200 200">. */
function raios(cx, cy, r1, r2, n) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const [c, si] = [Math.cos(a), Math.sin(a)];
    s += `<path d="M${(cx + c * r1).toFixed(1)} ${(cy + si * r1).toFixed(1)}L${(cx + c * r2).toFixed(1)} ${(cy + si * r2).toFixed(1)}"/>`;
    s += `<circle cx="${(cx + c * (r2 + 5)).toFixed(1)}" cy="${(cy + si * (r2 + 5)).toFixed(1)}" r="1.6" fill="currentColor" stroke="none"/>`;
  }
  return s;
}
function xadrez(x, y, cols, rows, t) {
  let s = "";
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++)
    if ((r + c) % 2 === 0) s += `<rect x="${x + c * t}" y="${y + r * t}" width="${t}" height="${t}" fill="currentColor" stroke="none"/>`;
  return s + `<rect x="${x}" y="${y}" width="${cols * t}" height="${rows * t}"/>`;
}
const ILUSTRACOES = {
  corrida: `<path d="M40 30v150"/>${xadrez(40, 34, 5, 3, 16)}
    <path d="M70 128h110M90 146h90M80 164h100"/><path d="M128 110l14-14h28"/>`,
  caminhao: `<path d="M28 150v-46h36l22 24v22z"/><path d="M40 112h20v14H40z"/><rect x="90" y="66" width="86" height="84"/>
    <path d="M100 80h66M100 94h66"/><circle cx="54" cy="156" r="12"/><circle cx="118" cy="156" r="12"/><circle cx="152" cy="156" r="12"/>`,
  congresso: `<path d="M64 176h72l-10-58H74z"/><path d="M74 132h52"/><path d="M100 118V84"/><rect x="90" y="52" width="20" height="32" rx="10"/>
    <path d="M74 60a30 30 0 0 0 52 0"/><path d="M62 34a50 50 0 0 1 76 0M50 20a68 68 0 0 1 100 0"/>`,
  eletrico: `<circle cx="100" cy="100" r="62"/><circle cx="100" cy="100" r="72" stroke-dasharray="4 8"/>
    <path d="M110 52L76 108h26l-10 42 34-58h-26z"/>`,
  saude: `<path d="M100 164C44 124 36 80 64 64c18-10 30 2 36 14 6-12 18-24 36-14 28 16 20 60-36 100z"/>
    <path d="M24 108h42l10-22 14 42 12-32 8 12h66"/>`,
  "cultura-pop": `<path d="M42 44h116a12 12 0 0 1 12 12v62a12 12 0 0 1-12 12H88l-28 26v-26H42a12 12 0 0 1-12-12V56a12 12 0 0 1 12-12z"/>
    <path d="M100 60l7 20h21l-17 13 7 21-18-13-18 13 7-21-17-13h21z"/>`,
  mistico: `<path d="M118 34a62 62 0 1 0 46 104 50 50 0 1 1-46-104z"/>
    <path d="M58 44l4 10 10 4-10 4-4 10-4-10-10-4 10-4z"/><path d="M40 118l3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>
    <circle cx="76" cy="88" r="2" fill="currentColor" stroke="none"/><circle cx="150" cy="40" r="2" fill="currentColor" stroke="none"/>`,
  musica: `<path d="M80 148V64l74-16v86"/><path d="M80 86l74-16"/><ellipse cx="66" cy="150" rx="15" ry="11"/><ellipse cx="140" cy="136" rx="15" ry="11"/>
    <path d="M24 40l30 30M24 70l18-4M176 168l-20-20"/>`,
  viagem: `<circle cx="96" cy="112" r="56"/><ellipse cx="96" cy="112" rx="24" ry="56"/><path d="M40 112h112M48 84h96M48 140h96"/>
    <path d="M28 70C70 18 140 18 176 58" stroke-dasharray="5 7"/><path d="M178 60l-16-2 8-12z" fill="currentColor"/>`,
  negocios: `<rect x="44" y="82" width="112" height="76" rx="8"/><path d="M80 82V66h40v16"/><path d="M44 112h112"/><path d="M92 106h16v12H92z"/>
    <path d="M150 54l22-22M158 32h14v14"/>`,
  construcao: `<path d="M52 178V44M68 178V44"/><path d="M52 60l16 16-16 16 16 16-16 16 16 16-16 16 16 16-16 16"/>
    <path d="M36 44h142M60 22v22M60 22l118 22M60 22L36 44"/><path d="M150 44v64"/><path d="M150 108a8 8 0 1 1-8 8"/>
    <rect x="110" y="140" width="56" height="38"/><path d="M110 159h56M138 140v38"/>`,
  perfume: `<rect x="86" y="36" width="28" height="22" rx="3"/><path d="M93 58v12h14V58"/><rect x="56" y="70" width="88" height="100" rx="14"/>
    <path d="M100 96l20 28-20 28-20-28z"/><path d="M100 96v56M80 124h40"/><path d="M128 42c10-4 18-2 24 4M134 30c12-2 20 2 26 8"/>`,
  hipismo: `<path d="M70 30v62a30 30 0 0 0 60 0V30"/><path d="M84 30v62a16 16 0 0 0 32 0V30"/>
    <circle cx="77" cy="56" r="2.5"/><circle cx="123" cy="56" r="2.5"/><circle cx="77" cy="80" r="2.5"/><circle cx="123" cy="80" r="2.5"/>
    <path d="M24 178v-46M176 178v-46M24 140h152M24 160h152"/><path d="M52 140v20M80 140v20M108 140v20M136 140v20"/>`,
  fogos: `${raios(104, 70, 10, 40, 14)}${raios(48, 132, 6, 24, 10)}${raios(156, 146, 6, 22, 10)}
    <path d="M20 190c40-8 120-8 160 0"/>`,
};
// Fundo do card: foto real (fotos/fundos/<ilustracao>.jpg); se a foto faltar, fica o desenho
const fotoFundo = (src, classe) => `<img class="${classe}" src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">`;
const desenhoEvento = (e) => (ILUSTRACOES[e.ilustracao]
  ? `<svg class="evento-arte" viewBox="0 0 200 200" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${ILUSTRACOES[e.ilustracao]}</svg>`
  : "") + (e.foto || e.ilustracao ? fotoFundo(e.foto || `fotos/fundos/${e.ilustracao}.jpg`, "evento-foto") : "");

// "6 a 8 de novembro", "30 de novembro a 2 de dezembro", "quinta-feira, 31 de dezembro"
function periodoLongo(e) {
  const a = deChave(e.data);
  if (!e.dataFim) return `${SEMANA[a.getDay()]}, ${a.getDate()} de ${MESES[a.getMonth()]}`;
  const b = deChave(e.dataFim);
  return a.getMonth() === b.getMonth()
    ? `${a.getDate()} a ${b.getDate()} de ${MESES[b.getMonth()]}`
    : `${a.getDate()} de ${MESES[a.getMonth()]} a ${b.getDate()} de ${MESES[b.getMonth()]}`;
}

function renderEventos() {
  const futuros = EVENTOS
    .filter((e) => (e.dataFim || e.data) >= HOJE)
    .filter((e) => cidadeEvento === "todas" || cidadeDoEvento(e) === cidadeEvento)
    .sort((a, b) => a.data.localeCompare(b.data));
  if (!futuros.length) {
    $("#lista-eventos").innerHTML = `<p class="painel-vazio" style="text-align:center">Nenhum evento próximo cadastrado.</p>`;
    return;
  }
  $("#lista-eventos").innerHTML = futuros.map((e) => {
    const d = deChave(e.data);
    const fim = e.dataFim || e.data;
    const dias = e.dataFim && e.data.slice(0, 7) === e.dataFim.slice(0, 7) ? `${d.getDate()}–${deChave(e.dataFim).getDate()}` : d.getDate();
    const chips = e.apartamentos.map(aptoPorId).filter(Boolean).map((a) => {
      if (semDatas(a)) return `<span class="chip">${esc(a.nome)}</span>`;
      const livre = livreNoPeriodo(a, e.data, fim);
      return `<span class="chip ${livre ? "livre" : "ocupado"}" title="${livre ? "Livre" : "Ocupado"} nesta data">${livre ? "✓ " : ""}${esc(a.nome)}</span>`;
    }).join("");
    return `
      <article class="evento">
        ${desenhoEvento(e)}
        <div class="evento-data"><span class="num">${dias}</span><span class="mes">${MESES_CURTOS[d.getMonth()]}</span></div>
        <div class="evento-corpo">
          <p class="evento-cat">${esc(e.categoria)} · ${esc(cidadeDoEvento(e))}</p>
          <h3>${esc(e.titulo)}</h3>
          ${e.descricao ? `<p class="evento-desc">${esc(e.descricao)}</p>` : ""}
          <p class="evento-info">${periodoLongo(e)} · ${esc(e.local)}</p>
          <div class="evento-aptos"><span class="evento-rotulo">Hospede-se perto</span>${chips}</div>
        </div>
        <div class="evento-acoes">
          <button class="botao botao-ouro botao-pequeno" data-ir-dia="${e.data}">Ver disponibilidade</button>
          ${e.link ? `<a class="link-texto" href="${esc(e.link)}" target="_blank" rel="noopener">Site oficial ↗</a>` : ""}
        </div>
      </article>`;
  }).join("");
}

$("#lista-eventos").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-ir-dia]");
  if (!b) return;
  diaSel = b.dataset.irDia < HOJE ? HOJE : b.dataset.irDia;
  mesCal = deChave(diaSel.slice(0, 8) + "01");
  aptoCal = "todos";
  renderCalendario();
  $("#calendario").scrollIntoView();
});

/* ---------- Rodapé ---------- */
function renderRodape() {
  let html = "";
  if (SITE.instagram) html += `<a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>`;
  const contatos = (SITE.whatsapp || []).filter((c) => c.numero);
  if (contatos.length) {
    const msg = encodeURIComponent("Olá! Vi o site de vocês e quero saber sobre as hospedagens.");
    const linkWa = (c) => `https://wa.me/${esc(c.numero)}?text=${msg}`;
    const rotulo = (c) => c.nome ? `${esc(c.nome)} · ${formatarFone(c.numero)}` : formatarFone(c.numero);
    html += contatos.map((c) => `<a href="${linkWa(c)}" target="_blank" rel="noopener">WhatsApp ${rotulo(c)}</a>`).join("");

    const icone = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.3z"/></svg>`;
    // Um contato: o botão abre a conversa direto. Mais de um: o botão abre a escolha.
    const botao = contatos.length === 1
      ? `<a class="whatsapp-flutuante" href="${linkWa(contatos[0])}" target="_blank" rel="noopener">${icone}<span>Fale com a gente</span></a>`
      : `<button class="whatsapp-flutuante" id="wa-botao" aria-expanded="false" aria-controls="wa-menu">${icone}<span>Fale com a gente</span></button>`;
    const menu = contatos.length === 1 ? "" : `
      <div class="wa-menu" id="wa-menu" hidden>
        <p>Fale com a gente no WhatsApp</p>
        ${contatos.map((c) => `<a href="${linkWa(c)}" target="_blank" rel="noopener">${icone}<span>${rotulo(c)}</span></a>`).join("")}
      </div>`;
    document.body.insertAdjacentHTML("beforeend", `<div class="wa">${menu}${botao}</div>`);

    const b = $("#wa-botao");
    if (b) {
      b.onclick = () => {
        const aberto = $("#wa-menu").hidden;
        $("#wa-menu").hidden = !aberto;
        b.setAttribute("aria-expanded", aberto);
      };
      document.addEventListener("click", (ev) => {
        if (!ev.target.closest(".wa")) { $("#wa-menu").hidden = true; b.setAttribute("aria-expanded", "false"); }
      });
    }
  }
  $("#rodape-links").innerHTML = html;

  const creditos = typeof CREDITOS_FOTOS === "undefined" ? [] : CREDITOS_FOTOS;
  $("#lista-creditos").innerHTML = creditos.map((c) =>
    `<li><a href="${esc(c.pagina)}" target="_blank" rel="noopener">${esc(c.tema)}</a>: ${esc(c.autor)} (${esc(c.licenca)})</li>`
  ).join("");
}

// "447482989922" -> "+44 7482 989922"; "5511999999999" -> "+55 11 99999-9999"
function formatarFone(n) {
  if (n.startsWith("44") && n.length === 12) return `+44 ${n.slice(2, 6)} ${n.slice(6)}`;
  if (n.startsWith("55") && n.length === 13) return `+55 ${n.slice(2, 4)} ${n.slice(4, 9)}-${n.slice(9)}`;
  return `+${n}`;
}

renderFiltroCidades();
renderApartamentos();
renderPerto();
renderCalendario();
renderFiltroEventos();
renderEventos();
renderRodape();
renderAtualizado();
