// Copyright 2013 The Obvious Corporation.

var Q = require('kew')
var nodeunitq = require('nodeunitq')
var builder = new nodeunitq.Builder(exports)
var utils = require('../lib/utils')

builder.add(function testNodeNames(test) {
  var ok = function (str) {
    utils.assertValidNodeName(str)
  }
  var bad = function (str) {
    test.throws(function () {
      ok(str)
    }, 'Expected error: ' + str)
  }

  ok('req')
  ok('req.body')
  ok('req.body.id')
  ok('*')
  ok('args.*')
  ok('!req')
  ok('+req')
  ok('?req')
  ok('req1')
  ok('body-forId')
  ok('body-forId.property')

  ok('req.params.*')
  ok('req_params_*') // internal-only representation
  ok('req.0') // arrays
  ok('req.10') // arrays

  bad('1req')
  bad('req..body')
  bad('!!req')
  bad('req.body-fromX')
  bad('req.1x')
  bad('req.*x')
  bad('**')
  bad('req.**')
  bad('req.*.*')
  bad('req.*.*')
  bad('req.*.abc')
  bad('req*')

  test.done()
})
