/* 使用说明

1.实例化
km=new Keyboard_maestro() 

2.获取所有变量
km.app.variables()

3.设定变量的值
km.app.variables.byName('zero').value=''

4.运行脚本
km.execute('macro_name','parameter')

*/



class Keyboard_maestro {
  constructor() {
    this.app = Application('Keyboard Maestro Engine')
  }

  execute(macro_name = '', parameter = '') {
    // km.doScript('02-窗口全屏', { withParameter: 'string' }) //km中 %TriggerValue% 来接收变量,只能是字符串
    this.app.doScript(macro_name, { withParameter: parameter })
  }
}

module.exports = Keyboard_maestro
