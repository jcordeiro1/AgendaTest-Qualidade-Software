# AgendaTest: Projeto de Qualidade de Software

Projeto acadêmico para demonstrar toda a pirâmide de testes, testes manuais e CI.

## Tecnologias
Node.js 22 (servidor HTTP nativo), JavaScript, HTML/CSS, `node:test` para unidade e integração e Playwright para E2E.

**Os dados são armazenados em memória e reiniciam ao reiniciar o servidor.** Não há banco de dados ou autenticação. Essa simplificação é intencional para focar nos testes.

## Como executar
```bash
npm install
npm start
```
Abrir http://localhost:3000

## Testes
```bash
npm test                 # unidade + integração
npx playwright install chromium
npm run test:e2e         # interface no Chromium
```

## Estrutura
- `src/agenda.js`: regras de negócio
- `src/app.js`: API HTTP
- `public/`: interface web
- `tests/unit/`: base da pirâmide
- `tests/integration/`: meio da pirâmide
- `tests/e2e/`: topo da pirâmide
- `docs/casos-de-teste.md`: planejamento e rastreabilidade
- `docs/testes-manuais.md`: roteiro e evidências pendentes
- `.github/workflows/testes.yml`: pipeline automática

## Publicação
1. Criar repositório público `AgendaTest-Qualidade-Software` no GitHub.
2. Enviar os arquivos e fazer commit.
3. Abrir a aba **Actions** e conferir se a pipeline passou.
4. Executar os testes manuais e preencher as evidências.
5. Elaborar o relatório PDF final usando os resultados realmente obtidos.

**Atenção:** o formato original da Atividade 1 não foi disponibilizado. O documento usa uma tabela de casos de teste que pode ser adaptada aos cabeçalhos exigidos pelo professor.
