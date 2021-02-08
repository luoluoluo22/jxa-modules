/* 使用说明

此模块用于剪贴板的设置

使用方法：



*/
let app = Application.currentApplication()
app.includeStandardAdditions = true

function set_text_to(text) {
  app.setTheClipboardTo(text)
}

function set_path_to(path) {
  ObjC.import('AppKit')
  const pasteboard = $.NSPasteboard.generalPasteboard
  pasteboard.clearContents
  pasteboard.setPropertyListForType($([path]), $.NSFilenamesPboardType)
}

function get_content() {
  return app.theClipboard()
}

// 获得剪切板的信息
let res = app.clipboardInfo()
//=>,82550,,4724,,8174,ctxt,117,,8172

//遍厉剪切板的类型
// --- Example Usage of getClipboardTypes() Function ---

function getClipboardTypes() {
  // Get array of Pasteboard Types for JS
  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  /*
    PURPOSE:
        • Return an array of Clipboard (AKA Pasteboard) types
            available on current Clipboard

    Based directly on code from Rob Trew (@ComplexPoint)
    JXA-Cookbook:   https://github.com/dtinth/JXA-Cookbook/issues/12#issuecomment-162172909

    FOR MORE DISCUSSION, SEE:

        • [Stackoverflow:  What clipboard type class strings does OS X JavaScript for Applications recognise?]
            (http://stackoverflow.com/questions/31833291/what-clipboard-type-class-strings-does-os-x-javascript-for-applications-recognis)

        • [JXA-Cookbook:  Clipboard typeClasses]
            (https://github.com/dtinth/JXA-Cookbook/issues/12)
    */

  'use strict'
  ObjC.import('AppKit')
  return ObjC.deepUnwrap(
    $.NSPasteboard.generalPasteboard.pasteboardItems.js[0].types
  )
} 

function log(psVarName) {
  // Log variable info & contents to Console for debug
  //–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
  /*  Parameters:
            • psVarName       string  Name of the Variable to log

        Purpose:
            • Provide one function to make it easy to log all types of variables, name and
                value, to the Console in a readable format.
            • Array elements are logged in a list

        Ver: 2.0        Fri, Dec 4, 2015

        Author:
            • JMichaelTX (in GitHub, and MacScripters and Keyboard Maestro forums)
            • PM me in either if you find issues or have suggestions for improvement

        Programmer's Note:
            • Normally I avoid using the eval() function
            • But this is a simple exception, where there is no other way to
                call the function with one parameter, and log both the name and
                the value of the variable.
            • IMO, the risk of using eval() in this case is very low.
--------------------------------------------------------------------------------
*/
  // --- GET THE VARIABLE TYPE ---

  var strType = eval('typeof(' + psVarName + ')')

  // --- CHECK FOR UNDEFINED VARIABLE ---

  if (strType === 'undefined') {
    console.log('*** ERROR ***    Variable is UNDEFINED: ' + psVarName)

    //-------------
    return 'ERROR'
    //-------------
  } // *** END if undefined ***

  if (strType === 'object') {
    if (eval('Array.isArray(' + psVarName + ')')) {
      strType = 'array'
    } else {
      strType = 'other'
    }
  }

  strType = strType.toUpperCase()

  // --- SET OUPUT BASED ON VARIABLE TYPE ---

  switch (strType) {
    case 'ARRAY':
      var strLog =
        "console.log('ARRAY: " +
        psVarName +
        "   Len: ' + " +
        psVarName +
        '.length)'
      break

    case 'STRING':
      var strLog =
        "console.log('" +
        strType +
        ': ' +
        psVarName +
        "  Len: ' + " +
        psVarName +
        ".length + '  Value: \"' + " +
        psVarName +
        " + '\"')"
      break

    default:
      // All other types, including "number"
      var strLog =
        "console.log('" +
        strType +
        ': ' +
        psVarName +
        "  Value: ' + " +
        psVarName +
        ')'
      break
  } // *** END switch (strType) ***

  //--- OUTPUT TO CONSOLE ---
  eval(strLog)

  // --- IF ARRAY, OUTPUT ARRAY ELEMENTS ---

  if (strType === 'ARRAY') {
    var lenArr = eval(psVarName + '.length')
    for (i = 0; i < lenArr; i++) {
      strLog = "console.log('[' + i + ']:  ' + " + psVarName + '[i])'
      eval(strLog)
    }
  } // *** END if ARRAY ***

  return 'DONE'
}
// var arrCBTypes = getClipboardTypes()
// log('arrCBTypes')

// console.log(res)
// console.log(get_content())

var module = { exports: {} }
module.exports = { set_text_to, set_path_to, get_content }
