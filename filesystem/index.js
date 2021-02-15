/* 使用说明

此模块用于文件的读写操作

使用方法：

read('/Users/luomingyang/Desktop/example.txt')

write('/Users/luomingyang/Desktop/example.txt','data')

list('/Users/luomingyang/Desktop')

*/
let app = Application.currentApplication()
app.includeStandardAdditions = true

function read(path, encoding) {
  !encoding && (encoding = $.NSUTF8StringEncoding)

  const fm = $.NSFileManager.defaultManager
  const data = fm.contentsAtPath(path)
  const str = $.NSString.alloc.initWithDataEncoding(data, encoding)
  return ObjC.unwrap(str)
}

function write(filepath, data) {
  let str = $.NSString.alloc.initWithUTF8String(data)
  str.writeToFileAtomicallyEncodingError(
    filepath,
    true,
    $.NSUTF8StringEncoding,
    null
  )
  console.log(filepath + ' write successful!')
}

function move(someFolder, someOtherFolder) {
  var Finder = Application('Finder')
  Finder.move(someFolder, {
    to: someOtherFolder,
    replacing: true,
  })
}

//可替换版本 overwriteExistingContent：false 追加，true：覆盖原有内容
function writeTextToFile(text, file, overwriteExistingContent) {
  try {
    // Convert the file to a string
    var fileString = file.toString()

    // Open the file for writing
    var openedFile = app.openForAccess(Path(fileString), {
      writePermission: true,
    })

    // Clear the file if content should be overwritten
    if (overwriteExistingContent) {
      app.setEof(openedFile, { to: 0 })
    }

    // Write the new content to the file
    app.write(text, { to: openedFile, startingAt: app.getEof(openedFile) })

    // Close the file
    app.closeAccess(openedFile)

    // Return a boolean indicating that writing was successful
    return true
  } catch (error) {
    try {
      // Close the file
      app.closeAccess(file)
    } catch (error) {
      // Report the error is closing failed
      console.log(`Couldn't close file: ${error}`)
    }

    // Return a boolean indicating that writing was successful
    return false
  }
}

function list(dir_path) {
  let fm = $.NSFileManager.defaultManager
  let file_list = ObjC.unwrap(
    fm.contentsOfDirectoryAtPathError(
      $(dir_path).stringByExpandingTildeInPath,
      null
    )
  ).map(ObjC.unwrap)

  return file_list //文件列表（arr）
}

function exist(filepath) {
  return $.NSFileManager.alloc.init.fileExistsAtPathIsDirectory(filepath, {})
}

function choose_file(title = '请选择文件', type = []) {
  return app.chooseFile({
    withPrompt: title,
    ofType: type,
  }) //返回选择的单个文件路径
}

function choose_folder(title = '请选择文件', type = []) {
  app.chooseFolder()
}

function save_file_to(title = '请选择文件', type = []) {
  app.chooseFileName()
}

function reveal(filepath) {
  let Finder = Application('Finder')
  Finder.reveal(Path(filepath))
  Finder.activate()
}

// let res = read('/Users/luomingyang/Desktop/test2.txt')
// let res = write('/Users/luomingyang/Desktop/test.txt','writ test')
// let res = list('/Users/luomingyang/Desktop')
// let res = exist('/Users/luomingyang/Desktop')
// let res = copy_path(/Users/luomingyang/Desktop/test.txt')
// let res = choose_file()
// reveal('/Users/luomingyang/Desktop/test.txt')
// save_file_to()

// console.log(res)

var module = { exports: {} }
module.exports = { read, write, list, save_file_to, reveal, choose_file, exist }
