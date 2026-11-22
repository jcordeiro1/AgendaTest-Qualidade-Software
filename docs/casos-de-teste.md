# Plano de casos de teste - AgendaTest

**Objetivo:** validar regras de agendamento, endpoints HTTP e fluxos de interface.

**Formato:** tabela academica de casos de teste, adaptada ao projeto. O modelo original da Atividade 1 nao foi disponibilizado para comparacao.

**Pre-condicoes:** Node.js 22; projeto instalado; para E2E, Chromium instalado; ambiente de testes isolado com agenda em memoria.

**Criterio de aprovacao:** resultado obtido igual ao esperado; testes automatizados encerram sem falhas; testes manuais exigem registro de evidencia.

| ID | Nivel | Objetivo | Dados e passos resumidos | Resultado esperado | Execucao | Situacao verificada |
|---|---|---|---|---|---|---|
| CT01 | Unidade | Cadastro valido | Ana; 10/12/2026; 09:00; 30 min | Validacao sem erro | Automatizada | Aprovado localmente |
| CT02 | Unidade | Nome vazio | Nome em branco | Nome obrigatorio | Automatizada | Aprovado localmente |
| CT03 | Unidade | Data impossivel | 2026-02-30 | Data invalida | Automatizada | Aprovado localmente |
| CT04 | Unidade | Duracao abaixo do limite | 14 minutos | Duracao rejeitada | Automatizada | Aprovado localmente |
| CT05 | Unidade | Fronteira inferior | 15 minutos | Duracao aceita | Automatizada | Aprovado localmente |
| CT06 | Unidade | Fim apos expediente | 17:45; 30 minutos | Horario rejeitado | Automatizada | Aprovado localmente |
| CT07 | Unidade | Conflito parcial | 09:00 e 09:15; 30 minutos | Conflito detectado | Automatizada | Aprovado localmente |
| CT08 | Unidade | Horarios adjacentes | 09:00 e 09:30; 30 minutos | Sem conflito | Automatizada | Aprovado localmente |
| CT09 | Unidade | Reuso apos cancelamento | Criar, cancelar, criar no mesmo horario | Segundo agendamento aceito | Automatizada | Aprovado localmente |
| CT10 | Integracao | Criacao e consulta API | POST seguido de GET | HTTP 201; item na lista | Automatizada | Aprovado localmente |
| CT11 | Integracao | Conflito API | Dois POST sobrepostos | HTTP 400; lista sem duplicacao | Automatizada | Aprovado localmente |
| CT12 | Integracao | Cancelamento API | POST; cancelar; POST | HTTP 200; novo HTTP 201 | Automatizada | Aprovado localmente |
| CT13 | Integracao | JSON malformado | POST com corpo { | HTTP 400 | Automatizada | Aprovado localmente |
| CT14 | Integracao | Rota inexistente | GET /nao-existe | HTTP 404 | Automatizada | Aprovado localmente |
| CT15 | E2E | Agendamento pela tela | Preencher e enviar formulario | Mensagem de confirmacao; item listado | Automatizada | Pendente de verificacao |
| CT16 | E2E | Conflito pela tela | Dois horarios sobrepostos | Mensagem de indisponibilidade | Automatizada | Pendente de verificacao |
| CT17 | E2E | Cancelamento pela tela | Agendar e clicar Cancelar | Mensagem de cancelamento; status alterado | Automatizada | Pendente de verificacao |
| CT18 | Manual | Responsividade | Abrir em viewport de celular | Campos visiveis e utilizaveis | Manual | Pendente de verificacao |
| CT19 | Manual | Obrigatoriedade dos campos | Enviar formulario vazio | Envio bloqueado pelo navegador | Manual | Pendente de verificacao |
| CT20 | Manual | Fluxo principal | Agendar, consultar, cancelar | Interface atualizada corretamente | Manual | Pendente de verificacao |

## Procedimento e rastreabilidade
- CT01-CT09: `tests/unit/agenda.test.js`; executar `npm run test:unit`.
- CT10-CT14: `tests/integration/api.test.js`; executar `npm run test:integration`.
- CT15-CT17: `tests/e2e/fluxos.spec.js`; executar `npm run test:e2e`.
- CT18-CT20: `docs/testes-manuais.md`; registrar data, navegador, resultado observado e print.

## Observacoes
O armazenamento e em memoria e reinicia quando o servidor reinicia. Nao ha banco de dados. A suite de integracao verifica HTTP, roteamento e servico de agenda, nao integracao com banco.
