#!/usr/bin/env osascript -l JavaScript

/*
alfred
*/

function get_query() {
  let argv = []
  let args = $.NSProcessInfo.processInfo.arguments

  for (let i = 4; i < args.count; i++) {
    argv.push(ObjC.unwrap(args.objectAtIndex(i)))
  }
  return argv.toString()
}

function show_results(obj = null) {
  return `res:${obj}`
  // return JSON.stringify(obj)
}

var module = { exports: {} }
module.exports = { get_query, show_results }
