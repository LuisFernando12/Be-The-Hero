const connection = require("../database/connection")

module.exports = {
    async index (request, response){
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .select('*')
            .where('ong_id',ong_id);
            try {
                 return response.json(incidents);
            } catch (error) {
                console.log('erro inesperado '+ error);           
            }
    }
}