"use strict";

const net = require('net');
const cursor = require('ansi')(process.stdout);
const appRouter = require('./command-center.js');

const dataStore = {
  films: [
    { title: 'Episode IV - A New Hope', year: 1977, director: 'George Lucas', rottentomatoes: 93 },
    { title: 'Episode V - The Empire Strikes Back', year: 1980, director: 'Irvin Kirschner', rottentomatoes: 94 },
    { title: 'Episode VI - Return of the Jedi', year: 1983, director: 'Richard Marquand', rottentomatoes: 80 },
    { title: 'Episode I - The Phantom Menace', year: 1999, director: 'George Lucas', rottentomatoes: 55 },
    { title: 'Episode II - Attack of the Clones', year: 2002, director: 'George Lucas', rottentomatoes: 65 },
    { title: 'Episode III - Revenge of the Sith', year: 2005, director: 'George Lucas', rottentomatoes: 79 },
    { title: 'Episode VII - The Force Awakens', year: 2015, director: 'J.J. Abrams', rottentomatoes: 92 }
  ],
  worlds: [
    {
      name: 'Tatooine', climate: 'hot and dry', appearances: 'Episodes 1, 2, 4, and 6',
      significance: 'Home of Anakin and Luke Skywalker, and Jabba the Hutt.'
    },
    {
      name: 'Hoth', climate: 'frigid cold', appearances: 'Episode 5',
      significance: "Former site of a Rebel base."
    }
  ]
};

const api = {
  listFilms: function(columnNames, options){
    if (!columnNames || columnNames.length === 0) {
      columnNames = ['title', 'year', 'director', 'rottentomatoes'];
    }
    console.log(columnNames.map(col => col.toUpperCase()).join(' | '));
    dataStore.films.filter((film)=> {
      return (options.after || -Infinity) < film.year && film.year < (options.before || Infinity);
    }).forEach((film)=>{
      console.log(columnNames.map(col => film[col.toLowerCase()]).join(' | '));
    });
  },
  listWorlds: function(columnNames){
    if (!columnNames || columnNames.length === 0) {
      columnNames = ['name', 'climate', 'appearances', 'significance'];
    }
    console.log(columnNames.map(col => col.toUpperCase()).join(' | '));
    dataStore.worlds.forEach((world)=>{
      console.log(columnNames.map(col => world[col.toLowerCase()]).join(' | '));
    });
  },
  lightsaber: function(chars){
    let blade = '';
    if (!chars) { chars = '=='; }
    for (let i = 0; i < (24 / chars.length); i++){
      blade += chars;
    }
    console.log(`[]#######//{${blade}`);
  },
  rollIt: function(){
    let socket = net.connect(23, 'towel.blinkenlights.nl');
    socket.on('connect', ()=>{
      cursor.hide();
      socket.pipe(process.stdout);
    });
    process.on('SIGINT', ()=>{
      socket.destroy();
    });
    process.on('exit', function () {
      cursor.show().write('\n')
    });
  },
  showWarning: function(msg){ console.warn(`Warning : ${msg}`); },
  showError: function(msg){ console.error(`Error : ${msg}`); }
};

appRouter.routeCommand(process.argv.slice(2), api);
