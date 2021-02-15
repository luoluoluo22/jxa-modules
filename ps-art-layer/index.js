#!/usr/bin/env osascript -l JavaScript

/*

art layer

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

const Layer = require('ps-layer')

class ArtLayer extends Layer {
  constructor(new_doc_config) {
    super({}) //继承当前文档
    this.new_doc_config = new_doc_config
    this.art_layer = this.doc.currentLayer //当前选中的图层，多个图层选中最上方那个
    this.name = this.layer.name() ? this.layer.name() : this.layer.name
  }

  get is_background_layer() {
    return this.art_layer.backgroundLayer()
  }

  set is_background_layer(is_bg_layer = true) {
    this.art_layer.backgroundLayer = is_bg_layer
  }

  get fill_opacity() {
    return this.art_layer.fillOpacity()
  }

  set fill_opacity(number) {
    this.art_layer.fillOpacity = number
  }

  get grouped() {
    return this.art_layer.grouped()
  }

  set grouped(number) {
    this.art_layer.grouped = number
  }

  get kind() {
    return this.art_layer.kind()
  }

  set kind(number) {
    this.art_layer.kind = number
  }

  search(obj) {
    // {kind:'=text'}
    return this.art_layer.whose(obj)
    // ps.currentDocument.layers.whose({kind:'=text'})[0].convertToShape()
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
}

var module = { exports: {} }
module.exports = ArtLayer

// =================================

// const doc = new Document({ name: 'test' })
// doc.add()
// doc.current_layer

// let l = new ArtLayer()
// l.blend_mode
// l._name = 'bg'
// l.name
// l.search({ name: '图层 1' }).length
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
// l.add()
