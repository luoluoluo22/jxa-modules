#!/usr/bin/env osascript -l JavaScript

/*
init 用于扩充全局的属性和方法
*/

require = function (file_name) {
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

// tool

var rgb2hex = function (rgbValues) {
  var r = parseInt(rgbValues[0], 10).toString(16).slice(-2)
  if (r.length == 1) r = '0' + r
  var g = parseInt(rgbValues[1], 10).toString(16).slice(-2)
  if (g.length == 1) g = '0' + g
  var b = parseInt(rgbValues[2], 10).toString(16).slice(-2)
  if (b.length == 1) b = '0' + b
  return '#' + r + g + b
}

var hex2rgb = function (hex) {
  return [
    parseInt('0x' + hex.slice(1, 3)),
    parseInt('0x' + hex.slice(3, 5)),
    parseInt('0x' + hex.slice(5, 7)),
  ]
}

// app
app = Application.currentApplication()
app.includeStandardAdditions = true

Application.prototype.click_menu = function (arr) {
  const se = Application('System Events')
  let menu

  // 判断菜单的层级
  if (arr.length === 2) {
    try {
      menu = se.processes
        .byName(this.name())
        .menuBars[0].menuBarItems.whose({
          name: arr[0],
        })[0]
        .menus[0].menuItems.whose({
          name: arr[1],
        })[0]
    } catch (e) {
      console.log(e, `未找到${arr}的菜单`)
    }
  } else {
    try {
      menu = se.processes
        .byName(this.name())
        .menuBars[0].menuBarItems.whose({
          name: arr[0],
        })[0]
        .menus[0].menuItems.whose({
          name: arr[1],
        })[0]
        .menus[0].menuItems.whose({
          name: arr[2],
        })[0]
    } catch (e) {
      console.log(e, `未找到${arr}的菜单`)
    }
  }
  // 判断菜单的点击状态
  try {
    menu.click()
  } catch (e) {
    console.log(e)
  }
}

//Photoshop

//ps-document

//ps-document-layer
