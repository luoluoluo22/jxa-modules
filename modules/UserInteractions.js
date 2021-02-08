/* 使用说明

此模块用于用户交互显示界面
词典路径：
/System/Library/ScriptingAdditions/StandardAdditions.osax

使用方法：

todo

*/
let app = Application.currentApplication()
app.includeStandardAdditions = true

function alert(title = 'alert', message = '') {
  try {
    app.displayAlert(title, { message: message })
    return true
  } catch (e) {
    return false
  }
}

function dialog(question, default_answer = '', time_out = 3) {
  // 返回值是对象{"buttonReturned":"好", "textReturned":"answer"}
  try {
    return app.displayDialog(question, {
      defaultAnswer: default_answer,
      givingUpAfter: time_out,
    })
  } catch (e) {
    console.log(e)
    return null
  }
}

function choose(title, choose_list, allow_multiple_selections = true) {
  return app.chooseFromList(choose_list, {
    withPrompt: title,
    multipleSelectionsAllowed: allow_multiple_selections, //是否多选
  })
}

function notice(
  message = '这是一条JXA发出的通知，点击打开脚本编辑器',
  title = 'Success',
  subtitle = ''
) {
  app.displayNotification(message, {
    withTitle: title,
    subtitle: subtitle,
  })
}

// alert('alert')
let res = dialog('question')
// let res = choose('choose', ['yes', 'no'])
// let res = notice()

console.log(res)

var module = { exports: {} }
module.exports = { alert, dialog, choose, notice }
