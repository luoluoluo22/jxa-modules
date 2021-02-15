#!/usr/bin/env osascript -l JavaScript

/*

接收命令行传入的参数

*/

// ObjC.import('stdlib')
// $.getenv('_') // 运行时的环境为 '/usr/bin/osascript'

// =================================================================
// 执行shell的方法有两种，推荐第二种

// 1.直接运行命令
// app.doShellScript(asdf; true)

// 2.保存为以下代码test.js文件命令行输入：osascript -l JavaScript test.js ls -a
// ObjC.import('stdlib')

// function run(argv) {
//   argc = argv.length // If you want to iterate through each arg.

//   status = $.system(argv.join(' '))
//   $.exit(status >> 8)
// }
// =================================================================



function get_argv() {
  var args = $.NSProcessInfo.processInfo.arguments

  // Build the normal argv/argc
  var argv = []
  var argc = args.count // -[NSArray count]

  for (var i = 0; i < argc; i++) {
    argv.push(ObjC.unwrap(args.objectAtIndex(i))) // -[NSArray objectAtIndex:]
  }
  delete args
  return argv
}

function run(argv) {
  console.log(JSON.stringify(argv))
}

// get_argv()

// 设置退出码
// ObjC.import('stdlib')
// $.exit(123)

// 参考文档：
// [Shell and CLI Interactions · JXA-Cookbook/JXA-Cookbook Wiki](https://github.com/JXA-Cookbook/JXA-Cookbook/wiki/Shell-and-CLI-Interactions#running-shell-scripts)
