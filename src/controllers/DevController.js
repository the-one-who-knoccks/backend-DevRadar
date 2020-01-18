const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');



module.exports = {
  async index(request, response){
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username }); //  Verfifica se já existe o username

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

      const { name = login, avatar_url, bio } = apiResponse.data; // Destruturação para pegar somente o necessário/desejado
    
      const techsArray = parseStringAsArray(techs); // Pecorre o array e remove possiveis espçamentos
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude], // 1 - longit, 2 - latit - padrão mongo
      }
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
      
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
      
  }


  return response.json(dev);
}

};