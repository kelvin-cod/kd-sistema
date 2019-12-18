'use strict'

const Sequelize = require('sequelize');
/*
const sequelize = new Sequelize('lanchonete', 'root', 'fatec123*', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  timezone: '-03:00', // for writing to database
  logging: false
});
*/
const sequelize = new Sequelize('lanchonete', 'root', '468468', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  timezone: '-03:00', // for writing to database
  logging: false,
  port:3307
});



sequelize
  .authenticate()
  .then(() => {
    console.log('Autenticação OK');
  })
  .catch(err => {
    console.error('********** Não autenticado: ', err);
  });

module.exports = sequelize;
