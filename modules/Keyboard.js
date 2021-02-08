#!/usr/bin/env osascript -l JavaScript
/*
模拟键盘的按键
[AppleScript关键代码的完整列表](https://eastmanreference.com/complete-list-of-applescript-key-codes)
*/
var se = Application('System Events')


function key_down(keystroke) {
  se.keyDown(keystroke)
}

function key_up(keystroke) {
  se.keyUp(keystroke)
}

function hotkey(key,modify_key='command down') {
  // { using: [ 'option down', 'command down' ] }多个按键
  se.keystroke(key, { using: modify_key })
}

function key_words(words = 'words') {
  se.keystroke(words)
}

// function 

// key_words('')

hotkey('a')

var module = { exports: {} }
module.exports = { hotkey }
