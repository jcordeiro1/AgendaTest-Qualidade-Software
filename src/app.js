import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {criarAgenda} from './agenda.js';
const base=join(dirname(fileURLToPath(import.meta.url)),'../public');
export function criarServidor(agenda=criarAgenda()) {
 return http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost');
  const enviar=(status,obj)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(obj));};
  try {
   if(req.method==='GET' && url.pathname==='/api/agendamentos')return enviar(200,agenda.listar());
   if(req.method==='POST' && url.pathname==='/api/agendamentos'){
    let corpo='';for await(const parte of req){corpo+=parte;if(corpo.length>10000)return enviar(413,{erro:'Requisição muito grande'});}
    let dados;try{dados=JSON.parse(corpo);}catch{return enviar(400,{erro:'JSON inválido'});}
    const resultado=agenda.agendar(dados);return enviar(resultado.erro?400:201,resultado);
   }
   const match=url.pathname.match(/^\/api\/agendamentos\/(\d+)\/cancelar$/);
   if(req.method==='POST'&&match){const resultado=agenda.cancelar(Number(match[1]));return enviar(resultado.erro?404:200,resultado);}
   if(req.method==='GET'&&(url.pathname==='/'||url.pathname==='/index.html')){
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(await readFile(join(base,'index.html')));
   }
   if(req.method==='GET'&&['/app.js','/style.css'].includes(url.pathname)){
    res.writeHead(200,{'Content-Type':url.pathname.endsWith('.js')?'text/javascript; charset=utf-8':'text/css; charset=utf-8'});
    return res.end(await readFile(join(base,url.pathname.slice(1))));
   }
   return enviar(404,{erro:'Rota não encontrada'});
  } catch {return enviar(500,{erro:'Erro interno'});}
 });
}
