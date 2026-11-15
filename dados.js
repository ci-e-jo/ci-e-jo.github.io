/* =========================================================
   DADOS DO SITE — é só editar este arquivo.
   Datas sempre no formato "AAAA-MM-DD".
   ========================================================= */

const SITE = {
  titulo: "Hospedagens Ci&Jo",
  instagram: "https://instagram.com/ciejo",
  // WhatsApp Business: número só com dígitos (código do país + número). "nome" é opcional, ex.: "Ci".
  whatsapp: [
    { nome: "CI", numero: "447482989922" },
    { nome: "JO", numero: "447922212026" },
  ],
};

/* ---------- APARTAMENTOS ----------
   fotos:    imagens da pasta "fotos" (baixadas dos anúncios do Airbnb). Para trocar,
             coloque a nova imagem na pasta e escreva o caminho, ex.: "fotos/sala-nova.jpg".
   links:    deixe vazio ("") a plataforma onde o apartamento não está anunciado.
   ocupado:  períodos já reservados. "fim" é o dia do check-out (fica livre nesse dia).
             Use null enquanto as datas não forem informadas — o site mostra "consulte o anúncio".
*/
// Os dois primeiros valores identificam a foto no Airbnb; o arquivo fica em fotos/<arquivo>.jpg
const fotoAirbnb = (id, arquivo) => `fotos/${arquivo}.jpg`;

const APARTAMENTOS = [
  {
    id: "caiapo",
    nome: "Caiapó",
    cidade: "São Paulo",
    bairro: "Campo Grande · Interlagos",
    hospedes: 8,
    quartos: 3,
    descricao: "Apartamento de 3 quartos em condomínio com piscina. Pertinho do Autódromo de Interlagos, do Aeroporto de Congonhas, do IBC e do Parque da Mônica.",
    fotos: [
      fotoAirbnb("32332771", "69fae8fc-7409-4b39-9515-d99f00c49bfa"),
      fotoAirbnb("32332771", "35a78543-390d-41c7-9907-7da35d3e5327"),
      fotoAirbnb("32332771", "da65d971-b249-4353-bf05-4c1bff34e43a", "miso"),
      fotoAirbnb("32332771", "3d27765c-67aa-402f-8f5c-1518a5da6e31"),
      fotoAirbnb("32332771", "c914824e-c3ed-49fa-8299-bda302bfdc30"),
    ],
    links: {
      airbnb: "https://www.airbnb.com.br/rooms/32332771",
      booking: "https://www.booking.com/hotel/br/flat-ibc-congonhas-interlagos-zona-sul.pt-br.html",
      vrbo: "https://www.vrbo.com/7935154ha",
      outro: "",
    },
    ocupado: null,
  },
  {
    id: "solimoes",
    nome: "Solimões",
    cidade: "São Paulo",
    bairro: "Campo Grande · Interlagos",
    hospedes: 4,
    quartos: 2,
    descricao: "Apto moderno de 60 m² no 3º andar, com vista para o verde, ar-condicionado e condomínio completo com piscina. Aceita pets.",
    fotos: [
      fotoAirbnb("1272563749755570691", "a8efe853-fe30-403e-929e-3febd731327d"),
      fotoAirbnb("1272563749755570691", "ec379026-7ba1-4348-a6ac-1600e917eb44"),
      fotoAirbnb("1272563749755570691", "09d889f0-c08d-48c3-9c16-5c99f0680ac2"),
      fotoAirbnb("1272563749755570691", "dd6c4971-2854-44b5-80d9-effce52c1960"),
      fotoAirbnb("1272563749755570691", "97e75ba8-1607-4050-b0e0-c0c6ba2f9ef0"),
    ],
    links: {
      airbnb: "https://www.airbnb.com.br/rooms/1272563749755570691",
      booking: "https://www.booking.com/hotel/br/solimoes-interlagos.pt-br.html",
      vrbo: "https://www.vrbo.com/20076570ha",
      outro: "",
    },
    ocupado: null,
  },
  {
    id: "amazonas",
    nome: "Amazonas",
    cidade: "São Paulo",
    bairro: "Campo Grande · Interlagos",
    hospedes: 4,
    quartos: 2,
    descricao: "Flat estiloso de 60 m² no 10º andar, adaptado para PCD (porta larga para cadeira de rodas). Condomínio com portaria, padaria, salão e área de lazer.",
    fotos: [
      fotoAirbnb("1271939776921903949", "4dc03f2f-5126-4650-b8ed-d58d35cff56e", "miso"),
      fotoAirbnb("1271939776921903949", "fadf9ad7-4640-4a84-8bc2-cd9f2f583184"),
      fotoAirbnb("1271939776921903949", "3990a92e-3e49-4eb2-b1a4-1cea2afda1c5", "miso"),
      fotoAirbnb("1271939776921903949", "488350d0-e765-4239-a1f4-831282160c86", "miso"),
      fotoAirbnb("1271939776921903949", "5b907329-0bf0-407d-9ca9-cf68199aa1d5", "miso"),
    ],
    links: {
      airbnb: "https://www.airbnb.com.br/rooms/1271939776921903949",
      booking: "https://www.booking.com/hotel/br/amazonas-ibc-aeroporto-congonhas-expo-transamerica-pq-da-monica.pt-br.html",
      vrbo: "https://www.vrbo.com/20077011ha",
      outro: "",
    },
    ocupado: null,
  },
  {
    id: "xingu",
    nome: "Xingu",
    cidade: "São Paulo",
    bairro: "Campo Grande · Interlagos",
    hospedes: 4,
    quartos: 2,
    descricao: "Apartamento em condomínio fechado e tranquilo, com piscina e vaga. Perto de Congonhas, Interlagos e das áreas do Lollapalooza e do The Town.",
    fotos: [
      fotoAirbnb("1614772844303392280", "ea4679f2-3567-4ee8-8ab2-5808a3132316"),
      fotoAirbnb("1614772844303392280", "2706985d-2f3d-48ba-8f1d-6b08307ab3d3"),
      fotoAirbnb("1614772844303392280", "2cff1748-cac2-4c82-af45-abd80a83c01b"),
      fotoAirbnb("1614772844303392280", "eb50cc0c-379b-47f0-9347-2ee93ebd2c5a"),
      fotoAirbnb("1614772844303392280", "0ba8c210-a58f-457d-bf18-e3b82d68a583"),
    ],
    links: {
      airbnb: "https://www.airbnb.com.br/rooms/1614772844303392280",
      booking: "https://www.booking.com/hotel/br/aeroporto-congonhas-ibc-autodromo-expo-sp-pq-da-monica-lollapalooza-the-town.pt-br.html",
      vrbo: "https://www.vrbo.com/20250793ha",
      outro: "",
    },
    ocupado: null,
  },
  {
    id: "ibirarema",
    nome: "Ibirarema",
    cidade: "São Paulo",
    bairro: "Saúde · Zona Sul",
    hospedes: 6,
    quartos: 3,
    descricao: "Sobrado aconchegante com vaga grátis e espaço para trabalhar. Perto da Expo Imigrantes, do Zoológico, do Simba Safari, do Jardim Botânico e do Museu do Ipiranga.",
    fotos: [
      fotoAirbnb("1614867748149120553", "97bcd629-b1f5-4b84-ace9-2f9e9ea75657"),
      fotoAirbnb("1614867748149120553", "cae95d9d-b883-4655-b208-111feeff2b38"),
      fotoAirbnb("1614867748149120553", "2ea92441-35ed-4e40-a6df-83843c85aec8"),
      fotoAirbnb("1614867748149120553", "6a72e083-fe0d-435c-a282-fe29e542b9c7"),
      fotoAirbnb("1614867748149120553", "cdabf12a-d7e5-40b7-bac6-b7b03313513f"),
    ],
    links: {
      airbnb: "https://www.airbnb.com.br/rooms/1614867748149120553",
      booking: "https://www.booking.com/hotel/br/expo-imigrantes-simba-safari-jardim-botanico-museo-ipiranga-zoologico.pt-br.html",
      vrbo: "https://www.vrbo.com/20252842ha",
      outro: "",
    },
    ocupado: null,
  },
  {
    id: "canary-wharf",
    nome: "Flat Canary Wharf",
    cidade: "Londres",
    bairro: "Canary Wharf",
    hospedes: 4,
    quartos: 1,
    descricao: "Flat com vista para o Rio Tâmisa e os prédios de Canary Wharf. Cama king, sofá-cama, TV de 70\" e cozinha completa. Estacionamento grátis.",
    fotos: [
      fotoAirbnb("1622774475696368630", "0a0ba134-0f03-49d4-b739-8e298123700a"),
      fotoAirbnb("1622774475696368630", "dee4d482-311e-4182-aaa0-0c8dc31265c9"),
      fotoAirbnb("1622774475696368630", "cca82a2f-2276-44d5-8cf6-a989244e9753"),
      fotoAirbnb("1622774475696368630", "66dde236-af6b-4290-9603-80f53418d412"),
      fotoAirbnb("1622774475696368630", "a365b3dd-1384-4b2a-afba-21ee326cd2d5"),
    ],
    links: {
      airbnb: "https://www.airbnb.com.br/rooms/1622774475696368630",
      booking: "",
      vrbo: "https://www.vrbo.com/12049977ha",
      outro: "",
    },
    ocupado: null,
  },
];

/* ---------- O QUE TEM PERTO (uma aba por região) ----------
   Lugares fixos (o ano todo) perto de cada grupo de apartamentos.
   titulo:    completa "O que tem perto ..." no cabeçalho da aba.
   destaque:  frase curta que aparece no card de cada apartamento da região.
   distancia: aproximada, a partir dos apartamentos.
   mapa:      o que buscar no Google Maps.
   foto:      foto de fundo do cartão (fotos/fundos/); sem foto, o cartão fica liso.
*/
const PERTO_REGIOES = [
{
  id: "interlagos",
  aba: "Interlagos",
  titulo: "em Interlagos",
  etiqueta: "Zona Sul de São Paulo",
  texto: "Nossos quatro apartamentos de Interlagos ficam a poucos minutos do autódromo, do aeroporto e de passeios para a família inteira, em qualquer época do ano.",
  destaque: "Perto do Autódromo, do Parque da Mônica e de Congonhas",
  apartamentos: ["caiapo", "solimoes", "amazonas", "xingu"],
  lugares: [
    {
      nome: "Autódromo de Interlagos",
      tipo: "Corrida",
      distancia: "5 km",
      descricao: "Casa da Fórmula 1 no Brasil. Fora do GP, recebe Stock Car, track days, corridas de rua e visitas guiadas.",
      mapa: "Autódromo José Carlos Pace, São Paulo",
      foto: "fotos/fundos/autodromo.jpg",
    },
    {
      nome: "Parque da Mônica",
      tipo: "Família",
      distancia: "3 km",
      descricao: "Parque coberto da Turma da Mônica dentro do Shopping SP Market. Programa garantido com as crianças, faça chuva ou sol.",
      mapa: "Parque da Mônica, Shopping SP Market",
      foto: "fotos/fundos/monica.jpg",
    },
    {
      nome: "Transamerica Expo Center",
      tipo: "Feiras",
      distancia: "4 km",
      descricao: "Centro de convenções com congressos, feiras de negócios e shows ao longo do ano.",
      mapa: "Transamerica Expo Center, São Paulo",
      foto: "fotos/fundos/transamerica.jpg",
    },
    {
      nome: "Aeroporto de Congonhas",
      tipo: "Aeroporto",
      distancia: "5 km",
      descricao: "Aeroporto central de São Paulo, com voos para todo o Brasil. Pertinho para quem chega ou sai cedo.",
      mapa: "Aeroporto de Congonhas",
      foto: "fotos/fundos/congonhas.jpg",
    },
    {
      nome: "Cemitério do Morumby",
      tipo: "História",
      distancia: "7 km",
      descricao: "Onde está o túmulo de Ayrton Senna, visitado por fãs e pilotos do mundo inteiro, principalmente na semana do GP.",
      mapa: "Cemitério do Morumby, São Paulo",
      foto: "fotos/fundos/morumby.jpg",
    },
    {
      nome: "IBC – Instituto Brasileiro de Coaching",
      tipo: "Cursos e treinamentos",
      distancia: "3 km",
      descricao: "Sede do IBC, com imersões e formações que reúnem alunos do Brasil inteiro. Perfeito para quem vem fazer curso e quer ficar pertinho.",
      mapa: "IBC Instituto Brasileiro de Coaching, Av. Sargento Lourival Alves de Souza, 153, São Paulo",
      foto: "fotos/fundos/congresso.jpg",
    },
  ],
},
{
  id: "saude",
  aba: "Saúde",
  titulo: "na Saúde",
  etiqueta: "Zona Sul de São Paulo",
  texto: "O Ibirarema fica num bairro tranquilo e bem servido de metrô, perto da São Paulo Expo e dos passeios mais clássicos da zona sul: zoológico, jardim botânico e Museu do Ipiranga.",
  destaque: "Perto da São Paulo Expo, do Zoológico e do Museu do Ipiranga",
  apartamentos: ["ibirarema"],
  lugares: [
    {
      nome: "São Paulo Expo",
      tipo: "Feiras",
      distancia: "4 km",
      descricao: "Um dos maiores centros de eventos do país, na Rodovia dos Imigrantes. Recebe CCXP, Fenatran e grandes feiras o ano todo.",
      mapa: "São Paulo Expo, Rodovia dos Imigrantes",
      foto: "fotos/fundos/cultura-pop.jpg",
    },
    {
      nome: "Zoológico de São Paulo",
      tipo: "Família",
      distancia: "5 km",
      descricao: "O maior zoológico do Brasil, com milhares de animais numa área de Mata Atlântica.",
      mapa: "Zoológico de São Paulo",
      foto: "fotos/fundos/zoologico.jpg",
    },
    {
      nome: "Simba Safari",
      tipo: "Família",
      distancia: "5 km",
      descricao: "Passeio de carro entre leões, girafas, zebras e outros animais soltos, ao lado do Zoológico.",
      mapa: "Simba Safari, São Paulo",
      foto: "fotos/fundos/simba.jpg",
    },
    {
      nome: "Jardim Botânico",
      tipo: "Natureza",
      distancia: "4 km",
      descricao: "Trilhas, estufas históricas e lagos no meio do Parque Estadual Fontes do Ipiranga.",
      mapa: "Jardim Botânico de São Paulo",
      foto: "fotos/fundos/jardim-botanico.jpg",
    },
    {
      nome: "Museu do Ipiranga",
      tipo: "História",
      distancia: "4 km",
      descricao: "O Museu Paulista, reaberto e restaurado, com os jardins e o Parque da Independência à frente.",
      mapa: "Museu do Ipiranga, São Paulo",
      foto: "fotos/fundos/ipiranga.jpg",
    },
    {
      nome: "Parque Ibirapuera",
      tipo: "Lazer",
      distancia: "5 km",
      descricao: "O parque mais famoso de São Paulo, com museus, o Auditório Ibirapuera e muito espaço para caminhar e pedalar.",
      mapa: "Parque Ibirapuera, São Paulo",
      foto: "fotos/fundos/ibirapuera.jpg",
    },
  ],
},
{
  id: "canary-wharf",
  aba: "Canary Wharf",
  titulo: "em Canary Wharf",
  etiqueta: "Londres",
  texto: "O flat fica no coração de Canary Wharf, a poucos minutos de metrô e DLR do ExCeL, de Greenwich e do centro de Londres.",
  destaque: "Perto do ExCeL London, da O2 e de Greenwich",
  apartamentos: ["canary-wharf"],
  lugares: [
    {
      nome: "ExCeL London",
      tipo: "Feiras",
      distancia: "2,5 km",
      descricao: "O maior centro de convenções de Londres, a poucas estações de DLR do flat.",
      mapa: "ExCeL London",
      foto: "fotos/fundos/negocios.jpg",
    },
    {
      nome: "The O2",
      tipo: "Shows",
      distancia: "1 km",
      descricao: "Arena dos grandes shows de Londres, logo do outro lado do Tâmisa, a uma estação de Jubilee line.",
      mapa: "The O2, London",
      foto: "fotos/fundos/o2.jpg",
    },
    {
      nome: "Greenwich",
      tipo: "História",
      distancia: "3 km",
      descricao: "Observatório Real, o Cutty Sark e o meridiano de Greenwich, com vista linda do parque para Canary Wharf.",
      mapa: "Royal Observatory Greenwich",
      foto: "fotos/fundos/greenwich.jpg",
    },
    {
      nome: "Torre e Tower Bridge",
      tipo: "Cartão-postal",
      distancia: "5 km",
      descricao: "A Torre de Londres e a Tower Bridge, dois dos cartões-postais mais visitados da cidade.",
      mapa: "Tower Bridge, London",
      foto: "fotos/fundos/tower-bridge.jpg",
    },
    {
      nome: "London City Airport",
      tipo: "Aeroporto",
      distancia: "4 km",
      descricao: "Aeroporto pequeno e rápido, com voos para a Europa, a poucos minutos de DLR.",
      mapa: "London City Airport",
      foto: "fotos/fundos/city-airport.jpg",
    },
    {
      nome: "Canary Wharf",
      tipo: "Compras",
      distancia: "0,5 km",
      descricao: "Shoppings, restaurantes e o jardim suspenso da Crossrail Place, com a Elizabeth line para o centro.",
      mapa: "Crossrail Place Roof Garden, Canary Wharf",
      foto: "fotos/fundos/canary-wharf.jpg",
    },
  ],
},
];

/* ---------- AGENDA DE EVENTOS ----------
   descricao:    uma frase curta sobre o evento.
   foto:         opcional; sem ela, o card usa fotos/fundos/<ilustracao>.jpg, e se a foto
                 não existir, mostra o desenho.
   ilustracao:   desenho de fundo do card (ver ILUSTRACOES em app.js): corrida, caminhao,
                 congresso, eletrico, saude, cultura-pop, mistico, musica, viagem, negocios,
                 construcao, perfume, hipismo, fogos.
   apartamentos: ids dos apartamentos que ficam perto do evento.
   dataFim:      opcional, para eventos de mais de um dia.
   Datas pesquisadas em nov/2026 — confirme no site de cada evento.
*/
const PERTO_INTERLAGOS = ["caiapo", "solimoes", "amazonas", "xingu"];
const PERTO_EXPO_IMIGRANTES = ["ibirarema", ...PERTO_INTERLAGOS];

const EVENTOS = [
  // ----- São Paulo -----
  {
    titulo: "Grande Prêmio de São Paulo de Fórmula 1",
    descricao: "A etapa brasileira do Mundial de Fórmula 1, com treinos livres, classificação e a corrida no domingo.",
    data: "2026-11-06", dataFim: "2026-11-08",
    local: "Autódromo de Interlagos", categoria: "Automobilismo", ilustracao: "corrida",
    foto: "fotos/fundos/autodromo.jpg",
    apartamentos: PERTO_INTERLAGOS,
    link: "https://www.eventim.com.br/campaign/f1saopaulo",
  },
  {
    titulo: "Fenatran",
    descricao: "Salão internacional do transporte rodoviário de cargas e da logística, com montadoras e fornecedores de todo o setor.",
    data: "2026-11-09", dataFim: "2026-11-13",
    local: "São Paulo Expo", categoria: "Feira de negócios", ilustracao: "caminhao",
    apartamentos: PERTO_EXPO_IMIGRANTES,
    link: "https://www.saopauloexpo.com.br/pt/agenda-de-eventos/",
  },
  {
    titulo: "Congresso Brasileiro de Fonoaudiologia",
    descricao: "Encontro nacional de profissionais, professores e pesquisadores da fonoaudiologia.",
    data: "2026-11-12", dataFim: "2026-11-14",
    local: "Transamerica Expo Center", categoria: "Congresso", ilustracao: "congresso",
    apartamentos: PERTO_INTERLAGOS,
    link: "",
  },
  {
    titulo: "E-MOB",
    descricao: "Feira e congresso de mobilidade elétrica e cidades inteligentes.",
    data: "2026-11-25", dataFim: "2026-11-27",
    local: "São Paulo Expo", categoria: "Feira de negócios", ilustracao: "eletrico",
    apartamentos: PERTO_EXPO_IMIGRANTES,
    link: "https://www.saopauloexpo.com.br/pt/agenda-de-eventos/",
  },
  {
    titulo: "CASE 2026",
    descricao: "Evento da área da saúde dedicado a tecnologias e equipamentos médicos.",
    data: "2026-11-26", dataFim: "2026-11-27",
    local: "Transamerica Expo Center", categoria: "Congresso", ilustracao: "saude",
    apartamentos: PERTO_INTERLAGOS,
    link: "",
  },
  {
    titulo: "CCXP26",
    descricao: "Um dos maiores festivais de cultura pop do mundo, com cinema, séries, quadrinhos e games.",
    data: "2026-12-03", dataFim: "2026-12-06",
    local: "São Paulo Expo", categoria: "Cultura pop", ilustracao: "cultura-pop",
    apartamentos: PERTO_EXPO_IMIGRANTES,
    link: "https://visitesaopaulo.com/evento/ccxp26-2026/",
  },
  {
    titulo: "Mystic Fair",
    descricao: "Feira de bem-estar, terapias integrativas e autoconhecimento.",
    data: "2026-12-12", dataFim: "2026-12-13",
    local: "São Paulo Expo", categoria: "Feira", ilustracao: "mistico",
    apartamentos: PERTO_EXPO_IMIGRANTES,
    link: "https://www.saopauloexpo.com.br/pt/agenda-de-eventos/",
  },
  {
    titulo: "Lollapalooza Brasil 2027",
    descricao: "Três dias de festival com grandes nomes da música nacional e internacional.",
    data: "2027-03-19", dataFim: "2027-03-21",
    local: "Autódromo de Interlagos", categoria: "Festival de música", ilustracao: "musica",
    apartamentos: PERTO_INTERLAGOS,
    link: "https://www.lollapaloozabr.com/",
  },

  // ----- Londres (ExCeL London fica a poucos minutos de Canary Wharf pelo DLR) -----
  {
    titulo: "World Travel Market",
    descricao: "Uma das principais feiras de turismo do mundo, com destinos, companhias aéreas e redes hoteleiras.",
    data: "2026-11-03", dataFim: "2026-11-05",
    local: "ExCeL London", categoria: "Feira de turismo", ilustracao: "viagem",
    apartamentos: ["canary-wharf"],
    link: "https://www.excel.london/whats-on",
  },
  {
    titulo: "The Business Show London",
    descricao: "Feira para empreendedores e pequenas empresas, com palestras, mentorias e expositores.",
    data: "2026-11-10", dataFim: "2026-11-12",
    local: "ExCeL London", categoria: "Negócios", ilustracao: "negocios",
    apartamentos: ["canary-wharf"],
    link: "https://www.excel.london/whats-on",
  },
  {
    titulo: "London EV Show",
    descricao: "Exposição de veículos elétricos e das novas tecnologias de recarga.",
    data: "2026-11-18", dataFim: "2026-11-19",
    local: "ExCeL London", categoria: "Feira de negócios", ilustracao: "eletrico",
    apartamentos: ["canary-wharf"],
    link: "https://www.excel.london/whats-on",
  },
  {
    titulo: "London Build Expo",
    descricao: "Feira de construção, arquitetura e design, realizada junto com a elementalLONDON.",
    data: "2026-11-25", dataFim: "2026-11-26",
    local: "ExCeL London", categoria: "Feira de negócios", ilustracao: "construcao",
    apartamentos: ["canary-wharf"],
    link: "https://www.excel.london/whats-on/london-build-expo",
  },
  {
    titulo: "London Perfume Exhibition",
    descricao: "Exposição de perfumaria com marcas de nicho, perfumistas e lançamentos.",
    data: "2026-12-10", dataFim: "2026-12-13",
    local: "ExCeL London", categoria: "Exposição", ilustracao: "perfume",
    apartamentos: ["canary-wharf"],
    link: "https://www.excel.london/whats-on",
  },
  {
    titulo: "London International Horse Show",
    descricao: "Competição internacional de hipismo com programação especial de fim de ano.",
    data: "2026-12-17", dataFim: "2026-12-21",
    local: "ExCeL London", categoria: "Hipismo", ilustracao: "hipismo",
    apartamentos: ["canary-wharf"],
    link: "https://www.excel.london/whats-on",
  },
  {
    titulo: "Réveillon em Londres",
    descricao: "A tradicional queima de fogos da virada do ano às margens do Rio Tâmisa.",
    data: "2026-12-31",
    local: "Rio Tâmisa", categoria: "Celebração", ilustracao: "fogos",
    apartamentos: ["canary-wharf"],
    link: "",
  },
];

/* ---------- CRÉDITOS DAS FOTOS (Wikimedia Commons) ---------- */
const CREDITOS_FOTOS = [
  { tema: "Autódromo de Interlagos", autor: "ProtoplasmaKid", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Vista_aérea_del_Autódromo_José_Carlos_Pace_02.jpg" },
  { tema: "Shopping SP Market (Parque da Mônica)", autor: "CORRETOR-CARVALHO", licenca: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Shopping_SP_Market_-_Avenida_das_Nações_Unidas,_22540_-_Jurubatuba_-_panoramio.jpg" },
  { tema: "Transamerica Expo Center", autor: "Mauro Cateb", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Transamerica_Expo_Center_01.jpg" },
  { tema: "Aeroporto de Congonhas", autor: "Valter Campanato/ABr", licenca: "CC BY 3.0 br", pagina: "https://commons.wikimedia.org/wiki/File:Aeroporto_de_Congonhas_-_Aeronaves.jpg" },
  { tema: "Túmulo de Ayrton Senna", autor: "ProtoplasmaKid", licenca: "CC BY 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Tumba_de_Ayrton_Senna_01.jpg" },
  { tema: "Congresso", autor: "Mammysou17", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Audience_during_the_Language_Diversity_Conference_2026.jpg" },
  { tema: "Recarga de carros elétricos", autor: "Philip Halling", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Electric_car_charging_points_-_geograph.org.uk_-_7322507.jpg" },
  { tema: "Tecnologia médica", autor: "Tyler Frew MD", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Operating_Room_Surgical_Light_During_Plastic_Surgery_Procedure.jpg" },
  { tema: "CCXP", autor: "Fronteira", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Primeiro_dia_da_CCXP_2024_(quinta),_São_Paulo,_dezembro_de_2024_(20).jpg" },
  { tema: "Cristais de ametista", autor: "Lisa Ann Yount", licenca: "CC0", pagina: "https://commons.wikimedia.org/wiki/File:Amethyst_crystals_close.jpg" },
  { tema: "Lollapalooza Brasil", autor: "Gustavo Paques from Osasco, Brasil", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Lollapalooza_2013_(8626114994).jpg" },
  { tema: "World Travel Market", autor: "Cancillería Ecuador", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:World_Travel_Market_London_2008_(3039842499).jpg" },
  { tema: "Guindastes em Londres", autor: "Colin Smith", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Blots_on_the_Skyline_-_geograph.org.uk_-_2587271.jpg" },
  { tema: "Perfume", autor: "Santeri Viinamäki", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Perfume_glass_bottle.jpg" },
  { tema: "Salto a cavalo", autor: "Caygill", licenca: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Show_jumping.jpg" },
  { tema: "Fogos de Ano Novo em Londres", autor: "Tony Hisgett from Birmingham, UK", licenca: "CC BY 2.0", pagina: "https://commons.wikimedia.org/wiki/File:London_New_Year_Fireworks_4_(23838016940).jpg" },
  { tema: "Zoológico de São Paulo", autor: "Wilfredor", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Monkey_Island_in_São_Paulo_Zoo,_Brazil.jpg" },
  { tema: "Simba Safari", autor: "Sintegrity", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:São_Paulo_-_Simba_Safari_01.jpg" },
  { tema: "Jardim Botânico", autor: "Samuel Davis Domingues Lima", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Pedacinho_da_mata_atlantica.jpg" },
  { tema: "Museu do Ipiranga", autor: "Mike Peel", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Museu_do_Ipiranga_2018_001.jpg" },
  { tema: "Parque Ibirapuera", autor: "Sérgio Valle Duarte", licenca: "CC BY 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Parque_Ibirapuera_com_Avenida_Paulista.jpg" },
  { tema: "The O2", autor: "Toi & Moi from au bord de la mer Méditerranée, France", licenca: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:The_O2_Millenium_Dome_(5103672612).jpg" },
  { tema: "Greenwich", autor: "Dietmar Rabich", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:London,_Greenwich,_Blick_vom_Hügel_des_Royal_Greenwich_Observatory_--_2016_--_4736-8.jpg" },
  { tema: "Tower Bridge", autor: "Diliff", licenca: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Tower_Bridge_London_Dusk_Feb_2006.jpg" },
  { tema: "London City Airport", autor: "mattbuck", licenca: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:London_City_Airport_DLR_station_MMB_05.jpg" },
  { tema: "Canary Wharf", autor: "Acabashi", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Crossrail_Park_Crossrail_Place_Roof_Garden_roof_Canary_Wharf_London_England.jpg" },
  { tema: "ExCeL London", autor: "mattbuck", licenca: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:ExCeL_Centre_MMB_42.jpg" },
];
