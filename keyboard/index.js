#!/usr/bin/env osascript -l JavaScript
/*
模拟键盘的按键
[AppleScript关键代码的完整列表](https://eastmanreference.com/complete-list-of-applescript-key-codes)
*/
var se = Application('System Events')

default_delay = 0.1

function code(keycode, key_delay = default_delay) {
  se.keyCode(keycode)
  delay(key_delay)
}

function key_down(keystroke, key_delay = default_delay) {
  se.keyDown(keystroke)
  delay(key_delay)
}

function key_up(keystroke, key_delay = default_delay) {
  se.keyUp(keystroke)
  delay(key_delay)
}

function hot(key, modify_key = 'command down', key_delay = default_delay) {
  // { using: [ 'option down', 'command down' ] }多个按键
  se.keystroke(key, { using: modify_key })
  delay(key_delay)
}

function word(words = 'words', key_delay = default_delay) {
  se.keystroke(words)
  delay(key_delay)
}

// function

// key_words('')

// hotkey('a')

var module = { exports: {} }
module.exports = { hot, code, word, default_delay }
