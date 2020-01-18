const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);
  

module.exports = routes;



  // Métodos HTTP: GET, POSTS, PUT, DELETE
 
// Tipos de parâmetros:

// Query Params  req.query (Filtros, ordenação, paginação ...)
// Route Params: request.params (Identifica o recurso na alteração ou remoção)
// Body: request.body (Dados para a criação ou alteração de um registro)

// MongoDB (Não-relacional) Poucos relacionamentos 