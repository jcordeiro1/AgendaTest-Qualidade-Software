# Registro de testes manuais

Projeto: AgendaTest - Qualidade de Software

Data: 22/11/2026. Ambiente: Windows, Google Chrome, `http://localhost:3000`.

| ID | Passos | Esperado | Resultado observado | Status | Evidencia |
|---|---|---|---|---|---|
| CT18 | Abrir em viewport de celular e verificar campos e botoes | Tudo legivel e utilizavel | Testado no Chrome DevTools em 317 x 464 px. Campos e botoes visiveis. Lista de agendamentos quebra linhas em tela estreita. | Executado com observacao de layout | `docs/evidencias/CT18_responsividade.png` |
| CT19 | Clicar Agendar com formulario vazio | Campos obrigatorios bloqueiam envio | Chrome exibiu 'Preencha este campo' no campo Nome e bloqueou envio. | Aprovado no cenario observado | `docs/evidencias/CT19_validacao_obrigatoria.png` |
| CT20 | Preencher agendamento valido, confirmar na lista e cancelar | Confirmacao, listagem, cancelamento | Capturas mostram 'Agendamento confirmado', item ativo, 'Agendamento cancelado' e item cancelado na lista. | Aprovado no cenario observado | `docs/evidencias/CT20_confirmacao.png` |

## Observacoes

- Resultados registrados a partir de capturas reais de 22/11/2026, nao de uma nova execucao.
- CT18 nao comprova compatibilidade com todos os aparelhos e tamanhos de tela.
- Capturas ja presentes em `docs/evidencias/` e referenciadas nesta tabela.
- GitHub Actions mostrou 14 testes unitarios e de integracao e 3 E2E aprovados, sem falhas.
