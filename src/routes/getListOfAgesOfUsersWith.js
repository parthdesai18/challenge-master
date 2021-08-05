'use strict';
const mockDBCalls = require('../database/index.js');

const getListOfAgesOfUsersWithHandler = async (request, response) => {
    try{
         const itemToLookup = request.body.item;
         const data = await mockDBCalls.getListOfAgesOfUsersWith(itemToLookup);
         return response.status(200).send(JSON.stringify(data));
    }catch(error){
        return response.status(400).send(JSON.stringify(error));
    }
};

module.exports = (app) => {
    app.post('/users/age', getListOfAgesOfUsersWithHandler);
};
