import {criarServidor} from './app.js';
const porta=Number(process.env.PORT||3000);criarServidor().listen(porta,()=>console.log(`AgendaTest: http://localhost:${porta}`));
