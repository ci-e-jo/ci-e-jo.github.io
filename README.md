# Hospedagens Ci & Jo

Site dos apartamentos da Ci & Jo em São Paulo e Londres: fotos, links de reserva (Airbnb, Booking e Vrbo), calendário de ocupação, o que tem perto e eventos na região.

## Onde mexer

- `dados.js` — apartamentos, links, lugares próximos, eventos e créditos das fotos.
- `estilo.css` — cores e visual.
- `app.js` — funcionamento do site (normalmente não precisa mexer).
- `disponibilidade.js` — **gerado automaticamente**, não editar à mão.

## Datas ocupadas

A cada 3 horas o GitHub Actions (`.github/workflows/publicar.yml`) lê os calendários iCal de cada anúncio e atualiza `disponibilidade.js`. Os links dos calendários ficam no segredo `ICAL_LINKS` (Settings › Secrets and variables › Actions) e nunca aparecem no site.

Para atualizar na hora: aba **Actions** › **Publicar site** › **Run workflow**.
