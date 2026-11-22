
import { test, expect } from '@playwright/test';

async function preencher(page, nome, data, hora, duracao = '30') {
  await page.getByLabel('Nome').fill(nome);
  await page.getByLabel('Data').fill(data);
  await page.getByLabel('Hora').fill(hora);
  await page.getByLabel('Duração (minutos)').fill(duracao);
  await page.getByRole('button', { name: 'Agendar' }).click();
}

test('CT15: fluxo completo de agendamento', async ({ page }) => {
  await page.goto('/');

  await preencher(page, 'Carlos', '2026-12-11', '09:00');

  await expect(page.getByRole('status'))
    .toHaveText('Agendamento confirmado');

  await expect(page.locator('#lista'))
    .toContainText('Carlos');
});

test('CT16: impedir conflito de horários', async ({ page }) => {
  await page.goto('/');

  await preencher(page, 'Carlos', '2026-12-12', '09:00');

  await expect(page.getByRole('status'))
    .toHaveText('Agendamento confirmado');

  await expect(page.getByRole('listitem')
    .filter({ hasText: 'Carlos | 2026-12-12 09:00' }))
    .toBeVisible();

  await preencher(page, 'Davi', '2026-12-12', '09:15');

  await expect(page.getByRole('status'))
    .toHaveText('Horário indisponível');
});

test('CT17: cancelar agendamento', async ({ page }) => {
  await page.goto('/');

  await preencher(page, 'Eva', '2026-12-13', '11:00');

  await expect(page.getByRole('status'))
    .toHaveText('Agendamento confirmado');

  const agendamento = page.getByRole('listitem')
    .filter({ hasText: 'Eva | 2026-12-13 11:00' });

  await expect(agendamento).toBeVisible();

  await agendamento.getByRole('button', {
    name: 'Cancelar'
  }).click();

  await expect(page.getByRole('status'))
    .toHaveText('Agendamento cancelado');

  await expect(agendamento)
    .toContainText('cancelado');
});
