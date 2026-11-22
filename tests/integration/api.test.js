import test from 'node:test';import assert from 'node:assert/strict';import {once} from 'node:events';import {criarServidor} from '../../src/app.js';
async function ambiente(fn){const s=criarServidor();s.listen(0,'127.0.0.1');await once(s,'listening');try{await fn(`http://127.0.0.1:${s.address().port}`);}finally{await new Promise((resolve,reject)=>s.close(e=>e?reject(e):resolve()));}}
const dados={nome:'Bia',data:'2026-12-10',hora:'10:00',duracao:40};
const postar=(url,body)=>fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
test('CT10: POST cria e GET lista agendamento',()=>ambiente(async url=>{const r=await postar(url+'/api/agendamentos',dados);assert.equal(r.status,201);const lista=await(await fetch(url+'/api/agendamentos')).json();assert.equal(lista.length,1);assert.equal(lista[0].nome,'Bia');}));
test('CT11: API impede conflito e preserva lista',()=>ambiente(async url=>{await postar(url+'/api/agendamentos',dados);const r=await postar(url+'/api/agendamentos',{...dados,hora:'10:20'});assert.equal(r.status,400);assert.equal((await(await fetch(url+'/api/agendamentos')).json()).length,1);}));
test('CT12: API cancela e libera horário',()=>ambiente(async url=>{const criado=await(await postar(url+'/api/agendamentos',dados)).json();const r=await fetch(url+`/api/agendamentos/${criado.item.id}/cancelar`,{method:'POST'});assert.equal(r.status,200);assert.equal((await postar(url+'/api/agendamentos',dados)).status,201);}));
test('CT13: API rejeita JSON inválido',()=>ambiente(async url=>{const r=await fetch(url+'/api/agendamentos',{method:'POST',body:'{'});assert.equal(r.status,400);}));
test('CT14: rota inexistente retorna 404',()=>ambiente(async url=>{const r=await fetch(url+'/nao-existe');assert.equal(r.status,404);}));
