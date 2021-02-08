const current_file_dir = './jsa/modules'
const require = function (file_name, dir = current_file_dir) {
  let path = dir + '/' + file_name.replace('./', '') + '.js' // 拼接当前文件路径和文件名
  if (typeof app === 'undefined') {
    app = Application.currentApplication()
    app.includeStandardAdditions = true
  }

  let handle = app.openForAccess(path)
  let contents = app.read(handle)
  app.closeAccess(path)

  eval(contents)

  return module.exports
}
const KM = require('./Keyboard_Maestro')
const km = new KM()
const mouse = require('./Mouse')

class Adobe_photoshop {
  constructor() {
    this.app = Application('Adobe Photoshop 2021')
    this.uxp = Application('Adobe UXP Developer Tool')
  }

  activate() {
    this.app.activate()
  }

  open(file_path) {
    // let file_path = '/Users/luomingyang/Desktop/test.jsx'
    let shell_res = this.app.doShellScript(
      `open -a 'Adobe Photoshop 2021' ${file_path}`
    )
    return shell_res
  }

  design(file_path, params) {
    // km.execute('resize_window_to_full')
    // km.app.variables()
    uxp.activate()
    ps_save(file_path)
  }

  // gradient(foreground=this.app.foreground(),backgroundColor){
  //   let foreground=[1,2,3]
  //   let backgroundColor=[1,2,3]
  //   this.app.foregroundColor=''
  //   this.app.backgroundColor=''
  //   mouse.drag(42, 112, 521, 112)
  // }

  click_menu(menu_name) {
    const se = Application('System Events')
    // se.processes
    //   .byName(this.app.name())
    //   .menuBars[0].menuBarItems[2].menus[0].menuItems.name()
    //  => ["新建...", "打开...", "在 Bridge 中浏览...", "打开为智能对象...", "最近打开文件", null, "关闭", "关闭全部", "关闭其它", "关闭并转到 Bridge...", "存储", "存储为...", "恢复", null, "导出", "生成", "共享...", null, "置入嵌入对象...", "置入链接的智能对象...", "打包…", null, "自动", "脚本", "导入", "从iPhone导入", null, "文件简介...", null, "打印...", "打印一份"]

    // 点击菜单项目
    let menu = se.processes
      .byName('Adobe Photoshop 2021')
      .menuBars[0].menuBarItems[2].menus[0].menuItems.byName(menu_name)
    if ((menu.enabled = true)) {
      menu.click()
    } else {
      console.log(menu.name() + '不可点击')
    }
  }

  save(file_path) {
    file_path
  }
}

var module = { exports: {} }
module.exports = Adobe_photoshop
