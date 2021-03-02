#!/usr/bin/env osascript -l JavaScript

/*
google-chrome
*/

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

class Chrome extends App {
  constructor() {
    super('google chrome')
    this.input_count = 0
    this.current_tab = this.app.windows[0].tabs[0]
  }

  open(url, is_background = true) {
    this.current_window = this.app.Window().make()
    this.current_tab = this.current_window.tabs[0]
    this.current_tab.url = url
    this.current_url = this.current_tab.url
    this.wait_load_finish()
  }

  close_window(i = 0) {
    this.app.windows[i].close()
  }

  close_tab(i = 0) {
    this.app.windows[0].tabs[i].close()
  }

  input(element, value) {
    let init = ''
    if (this.input_count === 0) {
      //第一次运行需要进行变量复制
      init = `var element ; var event`
    }
    delay(0.1)
    let input_code = `
      ${init}
      element=${element}
      element.value = '${value}'
      event = document.createEvent('HTMLEvents')
      event.initEvent('input', true, true)
      event.eventType = 'message'
      element.dispatchEvent(event)`

    this.input_count += 1
    console.log(input_code)
    this.do_js(input_code)
  }

  click(element) {
    delay(0.1)
    let click_code = `${element}.click()`
    this.do_js(click_code)
  }

  do_js(code, result = false) {
    try {
      this.current_tab.execute({ javascript: code })
    } catch (e) {
      console.log(e)
    }
    if (result) {
      delay(1)
      let res = this.current_tab.name()
      return res
    }
  }

  wait_load_finish() {
    delay(1)
    while (this.current_tab.loading()) {
      delay(0.3)
    }
  }

  action(arr) {
    const that = this

    function execute(key, value) {
      switch (key) {
        case 'click':
          that.click(value)
          break
        case 'input':
          that.input(value[0], value[1])
          break
        case 'open':
          that.open(value)
          break
        case 'do_js':
          that.do_js(value)
          break
        case 'active':
          that.app.activate()
          break
        case 'delay':
          delay(value)
          break
        case 'max_window':
          that.max_window(that.current_window)
          break
        case 'close':
          that.close()
          break
      }
    }

    for (let i = 0; i < arr.length; i++) {
      let key = Object.keys(arr[i])[0]
      let value = arr[i][key]
      execute(key, value)
    }
  }
}

var module = { exports: {} }
module.exports = Chrome
