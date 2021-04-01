
const fs = require('fs');

const heroku = `export const environment = {
    production: true,
    apiURLBase: '${process.env.CLIENTES_API}',
    clientId: '${process.env.CLIENT_ID}',
    clientSecret: '${process.env.CLIENT_SECRET}',
    obterTokenUrl: '${process.env.OBTER_TOKEN_URL}'
};`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
    if (err) {
        console.log('Falha ao escrever arquivo');
    }
});