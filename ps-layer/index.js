#!/usr/bin/env osascript -l JavaScript

/*

ps左侧面板工具

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

const Document = require('ps-document')

class Layer extends Document {
  constructor() {
    super()
    this.layer = this.currentLayer //当前选中的图层，多个图层选中最上方那个
    this.name = null
  }

  add(obj) {
    let cmd = `
    const Layer = require('./layer')
    let layer = new Layer()
    layer.add_layer(${JSON.stringify(obj)})
`
    this.do_uxp(cmd)
    this.layer = this.app.currentDocument.currentLayer
    this.name = this.layer.name()
    return this.app.currentDocument.currentLayer
  }

  add_text(obj) {
    let cmd = `
    const Layer = require('./layer')
    let layer = new Layer()
    layer.add_text(${JSON.stringify(obj)})
`
    this.do_uxp(cmd)
    this.layer = this.app.currentDocument.currentLayer
    // this.name = this.layer.name()
    this.name = this.layer.name()
    return this.app.currentDocument.currentLayer
  }

  copy() {
    this.app.currentDocument.currentLayer.duplicate()
  }

  get id() {
    return this.layer.id()
  }

  get index() {
    return this.layer.index()
  }
  get bounds() {
    return this.layer.bounds()
  }

  set _name(rename) {
    this.layer.name = rename
  }

  get _name() {
    return this.layer.name()
  }

  get opacity() {
    return this.layer.opacity()
  }

  set opacity(number) {
    this.layer.opacity = number
  }

  get visible() {
    return this.layer.visible()
  }

  set visible(is_visible) {
    this.layer.visible = is_visible
  }

  get all_locked() {
    return this.layer.allLocked()
  }

  set all_locked(is_all_locked) {
    this.layer.allLocked = is_all_locked
  }

  get blend_mode() {
    return this.layer.blendMode()
  }

  set blend_mode(mode) {
    // ("color blend"/‌"color burn"/‌"color dodge"/‌"darken"/‌"darker color"/‌"difference"/‌"dissolve"/‌"divide"/‌"exclusion"/‌"hard light"/‌"hard mix"/‌"hue blend"/‌"lighten"/‌"lighter color"/‌"linear burn"/‌"linear dodge"/‌"linear light"/‌"luminosity"/‌"multiply"/‌"normal"/‌"overlay"/‌"pass through"/‌"pin light"/‌"saturation blend"/‌"screen"/‌"soft light"/‌"subtract"/‌"vivid light")
    this.layer.blendMode = mode
  }

  // 图层顺序,最下方为1，往上递增，图层组占用两个索引
  get itemindex() {
    return this.layer.itemindex()
  }

  get children() {
    console.log(
      '普通图层：artLayers,图层组：layerSets,背景图层：backgroundLayer,当前图层：currentLayer'
    )
  }

  get father() {
    console.log(this.doc.name())
    return this.doc
  }

  search(obj) {
    // {kind:'=text'}
    return this.doc.layers.whose(obj)
    // ps.currentDocument.layers.whose({kind:'=text'})[0].convertToShape()
  }

  duplicate() {
    // {kind:'=text'}
    this.doc.layer.duplicate()
    // ps.currentDocument.layers.whose({kind:'=text'})[0].convertToShape()
  }

  fill(obj) {
    if (typeof obj === 'string') {
      obj = hex2rgb('#' + obj)
    }
    let cmd = `const Layer = require('./layer')
    let layer = new Layer()
    layer.fill(${JSON.stringify(obj)})
    `
    this.do_uxp(cmd)
  }
}

var module = { exports: {} }
module.exports = Layer

// =================================

// const doc = new Document({ name: 'test' })
// // doc.add()
// // doc.current_layer

// let l = new Layer({})
// l.layer.copy()
// // l.search({ name: '图层 1' }).length
// l.doc.artLayers.length
// l.doc.layerSets.name()

// l.id
// console.log(l.name)
// l.opacity = 99.5
// l._name = 99
// l.visible = false
// l.index

// l.current_tool = '套索工具'
// l.current_tool
// l.copy()
