export function validarAgendamento(dados) {
  if (!dados || typeof dados.nome !== 'string' || !dados.nome.trim()) return 'Nome obrigatório';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dados.data) || !dataReal(dados.data)) return 'Data inválida';
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(dados.hora || '')) return 'Hora inválida';
  if (!Number.isInteger(dados.duracao) || dados.duracao < 15 || dados.duracao > 240) return 'Duração deve ser de 15 a 240 minutos';
  const inicio = minutos(dados.hora);
  if (inicio < 8 * 60 || inicio + dados.duracao > 18 * 60) return 'Fora do horário de atendimento';
  return null;
}
function dataReal(s) { const [a,m,d]=s.split('-').map(Number);const dt=new Date(Date.UTC(a,m-1,d));return dt.getUTCFullYear()===a&&dt.getUTCMonth()===m-1&&dt.getUTCDate()===d; }
export function minutos(hora) { const [h,m]=hora.split(':').map(Number); return h*60+m; }
export function haConflito(lista, novo) {
 const inicio=minutos(novo.hora),fim=inicio+novo.duracao;
 return lista.some(item=>item.status==='ativo' && item.data===novo.data && inicio < minutos(item.hora)+item.duracao && fim>minutos(item.hora));
}
export function criarAgenda() {
 const itens=[];let proximoId=1;
 return {
  listar:()=>itens.map(x=>({...x})),
  agendar(dados) { const erro=validarAgendamento(dados);if(erro)return {erro};if(haConflito(itens,dados))return {erro:'Horário indisponível'};
   const item={id:proximoId++,nome:dados.nome.trim(),data:dados.data,hora:dados.hora,duracao:dados.duracao,status:'ativo'};itens.push(item);return {item:{...item}}; },
  cancelar(id) {const item=itens.find(x=>x.id===id);if(!item)return {erro:'Agendamento não encontrado'};if(item.status==='cancelado')return {erro:'Agendamento já cancelado'};item.status='cancelado';return {item:{...item}};}
 };
}
