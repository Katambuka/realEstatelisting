const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title:'users Api',
      description: 'users Api'
   },
   host:'localhost:8000',
   schemes:['https', 'http']
}

const outputFile = './swagger.json';
const endpointsFile = ['./routes/index.js'];

//regenerate swagger.json
swaggerAutogen(outputFile,endpointsFile,doc);