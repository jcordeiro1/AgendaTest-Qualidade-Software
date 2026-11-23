import {test, expect} from '@playwright/test';

// Estes casos exercitam a API pelo request fixture do Playwright.
// Cada teste usa uma data diferente para nao interferir nos demais.
const base={nome:'Marina',data:'2026-12-20',hora:'09:00',duracao:30};

test('CT29: API GET retorna lista e status 200',async ({request})=>{
  const resposta=await request.get('/api/agendamentos');
  expect(resposta.status()).toBe(200);
  expect(Array.isArray(await resposta.json())).toBe(true);
});

test('CT30: API POST cria agendamento e retorna 201',async ({request})=>{
  const resposta=await request.post('/api/agendamentos',{data:{...base,data:'2026-12-21'}});
  expect(resposta.status()).toBe(201);
  const corpo=await resposta.json();
  expect(corpo.item).toMatchObject({nome:'Marina',data:'2026-12-21',status:'ativo'});
});

test('CT31: API impede agendamento sobreposto',async ({request})=>{
  const dados={...base,data:'2026-12-22'};
  expect((await request.post('/api/agendamentos',{data:dados})).status()).toBe(201);
  const resposta=await request.post('/api/agendamentos',{data:{...dados,hora:'09:15'}});
  expect(resposta.status()).toBe(400);
  expect((await resposta.json()).erro).toBe('Horário indisponível');
});

test('CT32: API cancela agendamento criado',async ({request})=>{
  const criado=await request.post('/api/agendamentos',{data:{...base,data:'2026-12-23'}});
  expect(criado.status()).toBe(201);
  const {item}=await criado.json();
  const resposta=await request.post(`/api/agendamentos/${item.id}/cancelar`);
  expect(resposta.status()).toBe(200);
  expect((await resposta.json()).item.status).toBe('cancelado');
});

test('CT33: API rejeita dados invalidos',async ({request})=>{
  const resposta=await request.post('/api/agendamentos',{data:{...base,data:'2026-12-24',duracao:10}});
  expect(resposta.status()).toBe(400);
  expect((await resposta.json()).erro).toContain('Duração');
});
