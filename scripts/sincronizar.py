"""Le os calendarios (iCal) do Airbnb, Booking e Vrbo e grava disponibilidade.js.

Roda no GitHub Actions. Os links ficam no segredo ICAL_LINKS (um JSON no formato
{"caiapo": {"airbnb": "...", "booking": "...", "vrbo": "..."}, ...}) e nunca entram no site:
o arquivo gerado tem so as datas ocupadas, sem nomes de hospedes nem links.
"""
import json
import os
import re
import sys
import time
import urllib.request
from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

ARQUIVO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "disponibilidade.js")
FUSO = ZoneInfo("America/Sao_Paulo")
LIMITE_NOITES = 60  # bloqueios maiores que isso costumam ser agenda fechada, nao reserva
CABECALHO = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) CiJoSync/1.0"}


def baixar(url):
    ultimo_erro = None
    for tentativa in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=CABECALHO), timeout=30) as r:
                texto = r.read().decode("utf-8", errors="replace")
            if "BEGIN:VCALENDAR" not in texto:
                raise ValueError("resposta nao e um calendario iCal")
            return texto
        except Exception as erro:  # noqa: BLE001 - qualquer falha vira nova tentativa
            ultimo_erro = erro
            time.sleep(5 * (tentativa + 1))
    raise ultimo_erro


def ler_dia(valor):
    return datetime.strptime(valor, "%Y%m%d").date()


def periodos(texto, hoje, rotulo):
    texto = re.sub(r"\r?\n[ \t]", "", texto)  # desfaz linhas dobradas do iCal
    saida = []
    for bloco in re.findall(r"BEGIN:VEVENT(.*?)END:VEVENT", texto, flags=re.S):
        ini = re.search(r"DTSTART[^:\r\n]*:(\d{8})", bloco)
        if not ini:
            continue
        inicio = ler_dia(ini.group(1))
        fim_m = re.search(r"DTEND[^:\r\n]*:(\d{8})", bloco)
        fim = ler_dia(fim_m.group(1)) if fim_m else inicio + timedelta(days=1)
        if fim <= inicio:
            fim = inicio + timedelta(days=1)
        if fim <= hoje:
            continue  # ja passou
        noites = (fim - inicio).days
        if noites > LIMITE_NOITES and "SUMMARY:Reserved" not in bloco:
            print(f"  ignorado {rotulo}: {inicio} -> {fim} ({noites} noites)")
            continue
        saida.append((inicio, fim))
    return saida


def juntar(lista):
    juntos = []
    for inicio, fim in sorted(lista):
        if juntos and inicio <= juntos[-1][1]:
            juntos[-1][1] = max(juntos[-1][1], fim)
        else:
            juntos.append([inicio, fim])
    return juntos


def anteriores():
    """Datas do arquivo atual, usadas se algum calendario falhar (para nao mostrar livre por engano)."""
    try:
        with open(ARQUIVO, encoding="utf-8") as f:
            texto = f.read()
    except FileNotFoundError:
        return {}
    dados = {}
    for apto, conteudo in re.findall(r'^\s*"([\w-]+)": \[(.*)\],\s*$', texto, flags=re.M):
        pares = re.findall(r'inicio: "([\d-]+)", fim: "([\d-]+)"', conteudo)
        if pares or conteudo.strip() == "":
            dados.setdefault(apto, [(date.fromisoformat(a), date.fromisoformat(b)) for a, b in pares])
    return dados


def main():
    bruto = os.environ.get("ICAL_LINKS", "").strip()
    if not bruto:
        sys.exit("Segredo ICAL_LINKS vazio: configure em Settings > Secrets and variables > Actions.")
    links = json.loads(bruto)
    hoje = datetime.now(FUSO).date()
    antes = anteriores()
    linhas, fontes = [], []

    for apto, sites in links.items():
        if apto.startswith("_") or not isinstance(sites, dict):
            continue
        todos, ok, falhou = [], [], False
        for site, url in sites.items():
            if not url:
                continue
            try:
                todos += periodos(baixar(url), hoje, f"{apto} {site}")
                ok.append(site)
            except Exception as erro:  # noqa: BLE001
                falhou = True
                print(f"ERRO {apto} {site}: {erro}")
        if falhou and apto in antes:
            # mantem o que ja se sabia e acrescenta o que foi lido agora
            todos += [p for p in antes[apto] if p[1] > hoje]
        juntos = juntar(todos)
        itens = ", ".join(f'{{ inicio: "{a.isoformat()}", fim: "{b.isoformat()}" }}' for a, b in juntos)
        linhas.append(f'    "{apto}": [{itens}],')
        fontes.append(f'    "{apto}": [{", ".join(json.dumps(s) for s in ok)}],')
        print(f"{apto:13} fontes={','.join(ok):22} periodos={len(juntos)}")

    agora = datetime.now(FUSO).strftime("%Y-%m-%dT%H:%M")
    js = (
        "/* Disponibilidade gerada automaticamente a partir dos calendarios (iCal) do Airbnb, Booking e Vrbo.\n"
        "   Nao edite a mao: este arquivo e substituido a cada sincronizacao. So contem datas.\n"
        '   "fim" e o dia do check-out (fica livre nesse dia). */\n'
        "const DISPONIBILIDADE = {\n"
        f'  atualizado: "{agora}",\n'
        "  ocupado: {\n" + "\n".join(linhas) + "\n  },\n"
        "  fontes: {\n" + "\n".join(fontes) + "\n  },\n"
        "};\n"
    )
    with open(ARQUIVO, "w", encoding="utf-8", newline="\n") as f:
        f.write(js)
    print("gravado disponibilidade.js")


if __name__ == "__main__":
    main()
