
const fs = require('fs');

const heroku = `export const environment = {
    production: true,
    apiURLBase: '${process.env.CLIENTES-API}'
};`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
    if (err) {
        console.log('Falha ao escrever arquivo');
    }
});