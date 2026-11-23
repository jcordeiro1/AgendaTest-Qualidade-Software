import test from 'node:test';
import assert from 'node:assert/strict';
import {validarAgendamento, haConflito, criarAgenda} from '../../src/agenda.js';
const base={nome:'Ana',data:'2026-12-10',hora:'09:00',duracao:30};
test('CT21: rejeita horario com formato invalido',()=>assert.equal(validarAgendamento({...base,hora:'25:00'}),'Hora inválida'));
test('CT22: rejeita duracao acima de 240 minutos',()=>assert.match(validarAgendamento({...base,duracao:241}),/Duração/));
test('CT23: permite agendamentos iguais em dias diferentes',()=>assert.equal(haConflito([{...base,status:'ativo'}],{...base,data:'2026-12-11'}),false));
test('CT24: impede cancelar duas vezes o mesmo agendamento',()=>{const agenda=criarAgenda();const id=agenda.agendar(base).item.id;assert.ok(agenda.cancelar(id).item);assert.equal(agenda.cancelar(id).erro,'Agendamento já cancelado');});
test('CT25: remove espacos do nome ao cadastrar',()=>{const agenda=criarAgenda();assert.equal(agenda.agendar({...base,nome:'  Ana  '}).item.nome,'Ana');});
