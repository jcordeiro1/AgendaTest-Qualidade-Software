import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {criarServidor} from '../../src/app.js';
async function ambiente(fn){const servidor=criarServidor();servidor.listen(0,'127.0.0.1');await once(servidor,'listening');try{await fn(`http://127.0.0.1:${servidor.address().port}`);}finally{await new Promise((resolve,reject)=>servidor.close(e=>e?reject(e):resolve()));}}
const dados={nome:'Marina',data:'2026-12-15',hora:'09:00',duracao:30};
const postar=(url,body)=>fetch(url+'/api/agendamentos',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
test('CT26: API lista agenda inicialmente vazia',()=>ambiente(async url=>{const r=await fetch(url+'/api/agendamentos');assert.equal(r.status,200);assert.deepEqual(await r.json(),[]);}));
test('CT27: API rejeita nome vazio sem criar registro',()=>ambiente(async url=>{const r=await postar(url,{...dados,nome:' '});assert.equal(r.status,400);assert.equal((await r.json()).erro,'Nome obrigatório');assert.deepEqual(await(await fetch(url+'/api/agendamentos')).json(),[]);}));
test('CT28: API retorna 404 ao cancelar identificador inexistente',()=>ambiente(async url=>{const r=await fetch(url+'/api/agendamentos/999/cancelar',{method:'POST'});assert.equal(r.status,404);assert.equal((await r.json()).erro,'Agendamento não encontrado');}));
