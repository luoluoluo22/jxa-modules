#!/usr/bin/env osascript -l JavaScript

function require(file_name) {
  let path = ''
  // 相对路径的文件读取方法
  if (file_name.substr(0, 2) == './') {
    function _dirname() {
      //当前文件绝对路径
      let args = $.NSProcessInfo.processInfo.arguments
      let current_file_path = ObjC.unwrap(args.objectAtIndex(3)) // 当前路径
      delete args

      // 从路径中分割出文件名
      let pos = current_file_path.lastIndexOf('/') //获得最后‘/’的索引
      let dir_path = current_file_path.substr(0, pos) //截取路径部分

      return dir_path
    }

    let dir = _dirname()
    path = `${dir}/${file_name.replace('./', '')}.js`
  }
  // 绝对路径模块文件所在目录：'/Users/luomingyang/jxa_modules'
  else {
    path = `/Users/luomingyang/jxa_modules/${file_name}/index.js`
  }

  function read(path, encoding) {
    !encoding && (encoding = $.NSUTF8StringEncoding)

    const fm = $.NSFileManager.defaultManager
    const data = fm.contentsAtPath(path)
    const str = $.NSString.alloc.initWithDataEncoding(data, encoding)
    return ObjC.unwrap(str)
  }
  let contents = read(path)

  let module = { exports: {} }
  let exports = module.exports
  eval(contents)

  return module.exports
}

const App = require('app')
const fs = require('filesystem')

class Photoshop extends App {
  constructor() {
    super('Adobe Photoshop 2021')
  }

  add_document() {
    return this.app.Document().make()
  }

  set current_tool(name) {
    this.tools = JSON.parse(fs.read('../photoshop-2021/ps_tools.json'))
    try {
      this.app.currentTool = this.tools[name]
    } catch (e) {
      console.log(`没有该工具：${name}`)
    }
  }

  get current_tool() {
    console.log(this.app.currentTool())
  }

  all_tools() {
    this.tools = JSON.parse(fs.read('../photoshop-2021/ps_tools.json'))
    console.log(Object.keys(this.tools))
  }

  do_js(js_code) {
    this.app.doJavascript(js_code)
  }

  do_uxp(cmd) {
    const Ps = require('photoshop-2021')
    const p = new Ps()
    // save js
    let filepath =
      '/Users/luomingyang/Luo_MingYang/JS&JSA/project/auto_ps/uxp_plugin/src/modules/customer.js'
    fs.write(filepath, cmd)
    console.log('ps开始点击菜单')
    delay(1) //需要添加一点时间缓冲才能成功
    this.app.click_menu(['增效工具', 'auto_ps', 'run index.js'])
  }

  dev() {
    console.log('正在启动' + this.app.name())
    if (this.is_launched) {
      console.log(this.app.name() + '启动完成')
      // uxp.launch()
      const uxp = new App('Adobe UXP Developer Tool')
      console.log('正在启动' + uxp.name)
      uxp.launch()
      if (uxp.launch()) {
        console.log(uxp.name + '启动完成')
        delay(5)
        try {
          this.do_km('load_plugin')
          console.log('km已执行')
        } catch (e) {
          console.log(e)
        }
      }
    } else {
      console.log('ps 启动失败，请重试')
    }
  }

  get foreground_color() {
    console.log(`${this.name} 的前景色为:`)
    return this.app.foregroundColor.properties()
  }

  set foreground_color([r, g, b]) {
    this.app.foregroundColor.red = r
    this.app.foregroundColor.green = g
    this.app.foregroundColor.blue = b
  }

  get background_color() {
    console.log(`${this.name} 的背景色为:`)
    return this.app.backgroundColor.properties()
  }

  set background_color([r, g, b]) {
    this.app.foregroundColor.red = r
    this.app.foregroundColor.green = g
    this.app.foregroundColor.blue = b
  }

  get current_document() {
    return this.app.currentDocument
  }

  get frontmost() {
    return this.app.frontmost()
  }

  fill_color() {}

  save(file_path) {
    file_path
  }
}

var module = { exports: {} }
module.exports = Photoshop

// =================================

// let p = new Photoshop()
// p.properties()
// p.rgb2hex([10, 20, 30])
// // p.all_tools()
// p.set_current_tool('移动工具')
// p.foreground_color
