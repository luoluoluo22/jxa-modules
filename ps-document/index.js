#!/usr/bin/env osascript -l JavaScript

/*
document
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

const Photoshop = require('photoshop-2021')

class Document extends Photoshop {
  constructor(new_doc_config) {
    super()
    this.new_doc_config = new_doc_config
    this.doc = {}
    // if(ths.app.currentDocument){
    //   this.doc = this.current_document
    // }

    // this.new_doc_config = new_doc_config
    // this.doc = this.current_document
    // this.name = this.doc.name() ? this.doc.name() : this.doc.name
  }

  // get name() {
  //   this.name = this.doc.name() ? this.doc.name() : this.doc.name
  //   // this.name = '1'
  //   return this.name
  // }

  add() {
    let obj = this.new_doc_config
    // obj:{ name: 'doc', width: 700, height: 280,initialFill:'use background color',mode:'RGB', resolution:72,pixelAspectRatio:1}
    // initialFill:("transparent"/‌"use background color"/‌"white")
    this.doc = new this.app.Document(obj).make()
    this.name = this.doc.name()
    return this.doc
  }

  // to_front() {}

  get info() {
    this.print(this.doc.properties())
    return this.doc.info()
  }

  // 设置文档的作者，版权等信息
  set info(obj) {
    // ![界面如图所示](https://files.catbox.moe/azxuqy.png)
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      this.doc.info.kes[i] = obj.key
    }
  }

  get background_layer() {
    this.print(this.doc.backgroundLayer.properties())
  }

  get current_layer() {
    return this.doc.currentLayer()
  }

  get linked_layers() {
    return this.doc.layers.linkedLayers()
  }

  get file_path() {
    return this.doc.filePath()
  }

  get height() {
    return this.doc.height()
  }

  get width() {
    return this.doc.width()
  }

  get id() {
    return this.doc.id()
  }

  get index() {
    //按照名称来检索
    return this.doc.index()
  }

  get selection() {
    console.log('当前选区信息（只读）')
    console.log(this.doc.selection().properties())
    return this.doc.selection()
  }

  get mode() {
    return this.doc.mode()
  }

  // 是否进行了修改
  get is_modified() {
    return this.doc.modified()
  }

  close() {
    this.doc.close({ saving: 'no' }) //ask"/‌"no"/‌"yes,default ask
  }

  duplicate(name = this.name + '副本') {
    this.doc.duplicate(name, true) //文档名称和是否复制合并的图层
  }

  flatten() {} //合并所有图层
}

var module = { exports: {} }
module.exports = Document

// =================================

// let d = new Document({})
// d.selection.properties()
//   name: 'doc104',
//   width: 700,
//   height: 280,
//   initialFill: 'use background color',
// })

// const doc = new Document({ name: 'test', width: 750, height: 200 })
// doc.add()

// d.name

// d.duplicate()
// d.current_tool
// d.add()
