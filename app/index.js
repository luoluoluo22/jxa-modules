#!/usr/bin/env osascript -l JavaScript
/*
app class
*/

ObjC.import('AppKit')
function require(file_name) {
  let path = ''
  // 相对路径的文件读取方法
  if (file_name.substr(0, 2) == './') {
    function __dirname() {
      //当前文件绝对路径
      let args = $.NSProcessInfo.processInfo.arguments
      let current_file_path = ObjC.unwrap(args.objectAtIndex(3)) // 当前路径
      delete args

      // 从路径中分割出文件名
      let pos = current_file_path.lastIndexOf('/') //获得最后‘/’的索引
      let dir_path = current_file_path.substr(0, pos) //截取路径部分

      return dir_path
    }

    let dir = __dirname()
    s
    path = `${dir}/${file_name.replace('./', '')}.js`
  }
  // 绝对路径模块文件所在目录：'/Users/luomingyang/jxa_modules'
  else {
    path = `/Users/luomingyang/jxa_modules/${file_name}/index.js`
  }

  if (typeof app === 'undefined') {
    var app = Application.currentApplication()
    app.includeStandardAdditions = true
  }
  let handle = app.openForAccess(path)
  let contents = app.read(handle)
  app.closeAccess(path)

  let module = { exports: {} }
  let exports = module.exports
  eval(contents)

  return module.exports
}

const Keyboard_maestro = require('keyboard-maestro')
let km = new Keyboard_maestro()

class App {
  constructor(app) {
    this.app = Application(app)
    this.name = this.app.name()
    this.current_window = this.app.windows[0] ? this.app.windows[0] : null
  }

  max_window(window = this.current_window) {
    let that = this
    try {
      window.bounds = { x: 0, y: 25, width: 1680, height: 1025 }
    } catch (e) {
      this.do_km('resize_window_to_full', that.name)
    }
  }

  get window() {
    console.log(`${this.name} 的窗口信息:`)
    try {
      console.log(JSON.stringify(this.app.windows[0].properties()))
    } catch (e) {
      console.log(JSON.stringify(this.app.windows[0].properties()))
    }
  }

  get menu() {
    const se = Application('System Events')
    console.log(`${this.name}的菜单列表:`)
    let menubar = se.processes.byName(this.name).menuBars[0]
    // console.log(menubar.menuBarItems.name())
    for (var i = 0; i < menubar.menuBarItems.length; i++) {
      console.log(menubar.menuBarItems[i].name())
      console.log(menubar.menuBarItems[i].menus[0].menuItems.name())
      // for (
      //   var j = 0;
      //   j < menubar.menuBarItems[i].menus[0].menuItems.length;
      //   j++
      // ) {
      //   console.log(menubar.menuBarItems[i].menus[0].menuItems[j].name())
      // }
    }
  }

  open(file_path) {
    // let file_path = '/Users/luomingyang/Desktop/test.jsx'
    let cmd = `open -a '${this.name}' ${file_path}`
    return this.do_shell(cmd)
  }

  get is_launched() {
    try {
      return this.app.exists()
    } catch (e) {
      console.log('无法通过该方法判断该应用是否启动')
    }
  }

  launch() {
    $.NSWorkspace.sharedWorkspace.launchApplication(this.app.name())
    return true
  }

  launch_in_bg() {
    let id = this.app.id()
    // 如果没有启动，则后台启动，否则显示窗口
    $.NSWorkspace.sharedWorkspace.launchAppWithBundleIdentifierOptionsAdditionalEventParamDescriptorLaunchIdentifier(
      id,
      $.NSWorkspaceLaunchAsync | $.NSWorkspaceLaunchAndHide,
      $.NSAppleEventDescriptor.nullDescriptor,
      null
    )
    return true
  }

  print(obj) {
    console.log(JSON.stringify(obj))
  }

  get info() {
    try {
      console.log(JSON.stringify(this.app.properties()))
    } catch (e) {
      console.log(`无 ${this.name} 相关信息`)
    }
  }

  do_km(cmd, params) {
    km.execute(cmd, params)
  }

  do_shell(cmd) {
    let app = Application.currentApplication()
    app.includeStandardAdditions = true
    return app.doShellScript(cmd)
  }

  quit() {
    this.app.quit()
  }
}

var module = { exports: {} }
module.exports = App

// let p = new App('Adobe Photoshop 2021')
// let p = new App('Adobe UXP Developer Tool')
// let p = new App('notes')
// p.launch_in_bg()
// p.is_launched
// w.rgb2hex([10, 20, 30])
// w.hex2rgb('#0a141e')
// w.menu
// console.log(1)
// w.do_shell('ls')
