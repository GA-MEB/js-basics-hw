"use strict";

// 'require' external code //
const assert = require('assert');

const routeCommand = require('../command-center.js').routeCommand;

describe('routeCommand(tokens, app)', function(){
  context('when the first token is "ls-films",', function(){
    context('and either --before and --after flags have been specified', function(){
      context('and data has been correctly passed to them,', function(){
        context('and all other tokens are valid, i.e. either "title", "year", "director", or "rottentomatoes",', function(){
          context('when trying to call app.listFilms and pass it (1) an options object, and (2) the other tokens as an array,', function(){
            let testCases = [
              {tokens: ['ls-films', '--before', '2000'], opts: { before: 2000 }, columnNames: []},
              {tokens: ['ls-films', '--after', '1979'], opts: { after: 1979 }, columnNames: []},
              {tokens: ['ls-films', '--before', '2000', '--after', '1979'],
                opts: { after: 1979, before: 2000 }, columnNames: []},
              {tokens: ['ls-films', '--after', '1979', '--before', '2000'],
                opts: { after: 1979, before: 2000 }, columnNames: []},
              {tokens: ['ls-films', '--before', '2000', 'title', 'year'],
                opts: { before: 2000 }, columnNames: ['title', 'year']},
              {tokens: ['ls-films', '--after', '1979', 'title', 'year'],
                opts: { after: 1979 }, columnNames: ['title', 'year']},
              {tokens: ['ls-films', '--after', '1979', '--before', '1990', 'title', 'year'],
                opts: { after: 1979, before: 1990 }, columnNames: ['title', 'year']},
            ];
            testCases.forEach(function(testCase){
              it(`works for test case "${testCase.tokens.join(' ')}"`, function(done){
                routeCommand(testCase.tokens, {
                  listFilms: function(columnNames, opts){
                    assert.deepStrictEqual(opts, testCase.opts);
                    assert.deepStrictEqual(columnNames, testCase.columnNames);
                    done();
                  }
                });
              });
            });
          });

        });
        context('but at least one of the other tokens is invalid,', function(){
          context('calls app.showError, with an error message in the format \'Bad Argument "..."\', and quits', function(){
            let testCases = [
              {tokens: ['ls-films', '--before', '2000', 'alpha'], badColumn: 'alpha'},
              {tokens: ['ls-films', '--before', '2000', 'bravo'], badColumn: 'bravo'},
              {tokens: ['ls-films', '--before', '2000', 'charlie'], badColumn: 'charlie'},
              {tokens: ['ls-films', '--before', '2000', 'delta'], badColumn: 'delta'}
            ];
            testCases.forEach(function(testCase){
              it(`test case: ${testCase.tokens.join(' ')}`, function(done){
                routeCommand(testCase.tokens, {
                  showError: function(errorMessage){
                    assert.equal(errorMessage, `Bad Argument "${testCase.badColumn}"`);
                    done();
                  }
                });
              });
            });
          });
        });
      });
      context('but the flags have not been passed data correctly', function(){
        context('calls app.showError, with the error message \'Incorrect Flags\', and quits', function(){
          let testCases = [
            {tokens: ['ls-films', '--during', '2000', 'title']},
            {tokens: ['ls-films', '--before', '--after', '2000', 'title']},
            {tokens: ['ls-films', '2000', '--before', 'title']},
            {tokens: ['ls-films', 'title', '--after', '1950', '--before']}
          ];
          testCases.forEach(function(testCase){
            it(`test case: ${testCase.tokens.join(' ')}`, function(done){
              routeCommand(testCase.tokens, {
                showError: function(errorMessage){
                  assert.equal(errorMessage, 'Incorrect Flags');
                  done();
                }
              });
            });
          });
        });
      });
    });
  });
});
