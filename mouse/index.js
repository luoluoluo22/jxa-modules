#!/usr/bin/env osascript -l JavaScript
/*
1.JXA （mac 自动化）调用object C模块实现控制鼠标的点击、移动和拖拽
控制鼠标的点击（左、右），鼠标拖拽、移动事件

2.使用方法：
click()
click(1068, 38，‘r’)//默认左键，r右键
drag(1068 + 122, 38,1068, 38)
move(652, 568)

3.运行文件：
`$osascript -l JavaScript ./mouse.js`

4.ps画布区域的左上、右上、左下、右下坐标
![ps画布坐标点示意截图](https://files.catbox.moe/acl4dd.png)
当窗口仅占左1/2时：
(42,112)(521,112)
(42,1031)(521,1031)


*/
ObjC.import('Cocoa')
ObjC.import('stdlib')
ObjC.import('CoreGraphics')

// 获取鼠标坐标=========================

function location(screenH = 1050) {
  const mouseLoc = $.NSEvent.mouseLocation //获取 鼠标当前的的坐标（浮点数）
  mouseLoc.x = parseInt(mouseLoc.x)
  mouseLoc.y = screenH - Math.trunc(mouseLoc.y) //坐标需要屏幕高度减获取的坐标
  return mouseLoc
}

// 鼠标的基本操作=========================

var { mx: x, my: y } = location()
var left_mouse_down = $.kCGEventLeftMouseDown //鼠标左键按下事件
var right_mouse_down = $.kCGEventRightMouseDown //鼠标左键按下事件
var left_mouse_up = $.kCGEventLeftMouseUp
var right_mouse_up = $.kCGEventRightMouseUp
var left_mouse_drag = $.kCGEventLeftMouseDragged
var mouse_move = $.kCGEventMouseMoved
var mouse_scroll = $.KCGEventScrollWheel

// 用于注册鼠标事件
function mouse_event(event_type, coords) {
  const nil = $()
  // const nil = 10
  // usleep(200000)

  var event = $.CGEventCreateMouseEvent(
    nil,
    event_type,
    coords,
    $.kCGMouseButtonLeft
  )
  $.CGEventPost($.kCGHIDEventTap, event)
  delay(0.01) //添加一点延迟，保证稳定
  // $.CFRelease(event)
}

function down(x = mx, y = my, r = null) {
  var coords = { x: x, y: y } //坐标对象
  var mouse_down = r ? right_mouse_down : left_mouse_down
  mouse_event(mouse_down, coords)
}

function up(x = mx, y = my, r = null) {
  var coords = { x: x, y: y } //坐标对象
  var mouse_up = r ? right_mouse_up : left_mouse_up
  mouse_event(mouse_up, coords)
}

function click(x = mx, y = my, r = null) {
  down(x, y, r)
  up(x, y, r)
}

// drag从特定位置按下，拖拽到指定位置
function drag(tx, ty, cx = location().mx, cy = location().my, r = null) {
  var t_coords = { x: tx, y: ty } //拖拽末尾坐标
  down(cx, cy)
  mouse_event(left_mouse_drag, t_coords)
  delay(0.5)
  up(tx, ty)
}

// move是在鼠标没有点击的状态下进行
function move_to(x, y, r = null) {
  var coords = { x: x, y: y }
  mouse_event(mouse_move, coords)
}

// 暂无方法
function scroll(x, y) {
  var coords = { vertical: 10 }
  mouse_event(mouse_scroll, coords)
}

scroll(10)

var module = { exports: {} }
module.exports = { click, drag, move_to, location }
