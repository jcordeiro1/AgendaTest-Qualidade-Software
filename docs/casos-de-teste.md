# Plano de casos de teste - AgendaTest

**Objetivo:** validar regras de agendamento, endpoints HTTP e fluxos de interface.

**Formato:** resumo dos 20 casos de teste. A planilha `docs/AgendaTest_Atividade1_Casos_de_Teste.xlsx` segue as nove colunas do modelo da Atividade 1 do professor, incluindo procedimentos, resultados obtidos e evidências.

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
| CT15 | E2E | Agendamento pela tela | Preencher e enviar formulario | Mensagem de confirmacao; item listado | Automatizada | Aprovado conforme evidencias |
| CT16 | E2E | Conflito pela tela | Dois horarios sobrepostos | Mensagem de indisponibilidade | Automatizada | Aprovado conforme evidencias |
| CT17 | E2E | Cancelamento pela tela | Agendar e clicar Cancelar | Mensagem de cancelamento; status alterado | Automatizada | Aprovado conforme evidencias |
| CT18 | Manual | Responsividade | Abrir em viewport de celular | Campos visiveis e utilizaveis | Manual | Executado com observacao de layout |
| CT19 | Manual | Obrigatoriedade dos campos | Enviar formulario vazio | Envio bloqueado pelo navegador | Manual | Aprovado conforme evidencias |
| CT20 | Manual | Fluxo principal | Agendar, consultar, cancelar | Interface atualizada corretamente | Manual | Aprovado conforme evidencias |

## Procedimento e rastreabilidade
- CT01-CT09: `tests/unit/agenda.test.js`; executar `npm run test:unit`.
- CT10-CT14: `tests/integration/api.test.js`; executar `npm run test:integration`.
- CT15-CT17: `tests/e2e/fluxos.spec.js`; executar `npm run test:e2e`.
- CT18-CT20: `docs/testes-manuais.md`; resultados e prints reais de 22/11/2026 em `docs/evidencias/`.

## Observacoes
O armazenamento e em memoria e reinicia quando o servidor reinicia. Nao ha banco de dados. A suite de integracao verifica HTTP, roteamento e servico de agenda, nao integracao com banco.

## Evidencias verificadas
- CI unidade e integracao: `docs/evidencias/CI_testes_unitarios_integracao.png`.
- CI E2E: `docs/evidencias/CI_testes_E2E.png`.
- CT18: `docs/evidencias/CT18_responsividade.png` (observacao de layout em tela estreita).
- CT19: `docs/evidencias/CT19_validacao_obrigatoria.png`.
- CT20: `docs/evidencias/CT20_confirmacao.png`.
- Execucao local em 23/11/2026: 14 testes unitarios e de integracao aprovados.
- Nao ha video de execucao confirmado entre os arquivos fornecidos.
