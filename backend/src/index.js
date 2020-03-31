const express = require('express');
const cors = require('cors');
 routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
/**
 * Tipos de parametros: 
 * 
 * Query: Parametros nomeados  enviados na rota  após "?", (para fitros,paginação),
 * Params: Pararmetris ultilizados para identificar recursos,
 * Request Body: Corpo da requisição ultilizado para criar ou alterar recursos  
 */


app.listen('3333');