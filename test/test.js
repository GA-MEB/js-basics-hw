// General Assembly, WDI (Web Development Immersive) Remote, Cohort 02 (R2D2)
// Copyright (C) 2016 Matt Brendzel under the GNU General Public License.
// See LICENSE for details.

"use strict";

// 'require' external code //
const assert = require('assert');

const routeCommand = require('../command-center.js').routeCommand;

describe('routeCommand(tokens, app)', function(){
  context('when the first token is "ls-films"', function(){
    context('and all other tokens are valid, i.e. either "title", "year", "director", or "rottentomatoes",', function(){
      it('calls app.listFilms, passing it the other tokens as an array.', function(done){
        routeCommand(['ls-films', 'title', 'year', 'director', 'rottentomatoes'], {
          listFilms: function(columnNames){
            assert.deepStrictEqual(columnNames, ['title', 'year', 'director', 'rottentomatoes']);
            done();
          }
        })
      });
    });
    context('but at least one of the other tokens is invalid,', function(){
      it('calls app.showError, with an error message in the format \'Bad Argument "..."\', and quits', function(done){
        routeCommand(['ls-films', 'title', 'year', 'heroes'], {
          showError: function(errorMessage){
            assert.equal(errorMessage, 'Bad Argument "heroes"');
            done();
          }
        })
      });
    });
  });
  context('when the first token is "ls-worlds"', function(){
    context('and all other tokens are valid, i.e. either "name", "climate", "appearances", or "significance",', function(){
      it('calls app.listWorlds, passing it the other tokens as an array', function(done){
        routeCommand(['ls-worlds', 'name', 'climate', 'appearances', 'significance'], {
          listWorlds: function(columnNames){
            assert.deepStrictEqual(columnNames, ['name', 'climate', 'appearances', 'significance']);
            done();
          }
        });
      });
    });
    context('but at least one of the other tokens is invalid', function(){
      it('calls app.showError, with an error message in the format \'Bad Argument "..."\', and quits', function(done){
        routeCommand(['ls-worlds', 'name', 'size', 'significance'], {
          showError: function(errorMessage){
            assert.equal(errorMessage, 'Bad Argument "size"');
            done();
          }
        })
      });
    });
  });
  context('when the first token is "lightsaber"', function(){
    context('and there is only one other token', function(done){
      it('calls app.lightsaber and passes in the second token as an argument', function(done){
        routeCommand(['lightsaber', '==='], {
          lightsaber: function(chars){
            assert.equal(chars, '===');
            done();
          }
        });
      });
    });
    context('but there is more than one other token', function(done){
      it('calls app.showError, with an error message of \'Too Many Arguments\', and quits', function(done){
        routeCommand(['lightsaber', '===', '==='], {
          showError: function(errorMessage){
            assert.equal(errorMessage, 'Too Many Arguments');
            done();
          }
        });
      });
    });
  });
  context('when the first token is "roll"', function(){
    it('calls app.rollIt, without passing it any arguments', function(done){
      routeCommand(['roll'], {
        rollIt: function(){
          assert.equal(arguments.length, 0);
          done();
        }
      })
    });
  });
  context('when the first token is not recognized', function(){
    it('calls app.ShowError, with an error message in the format \'Invalid Command "..."\', and quits', function(done){
      routeCommand(['use-the-force-luke'], {
        showError: function(errorMessage){
          assert.equal(errorMessage, 'Invalid Command "use-the-force-luke"');
          done();
        }
      });
    });
  });
});
