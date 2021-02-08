#!/usr/bin/env osascript -l JavaScript
/*



*/

ObjC.import('AppKit')

function launch(app_path) {
  $.NSWorkspace.sharedWorkspace.launchApplication(app_path)
}

function launch_in_bg(app_name) {
  // 如果没有启动，则后台启动，否则显示窗口
  $.NSWorkspace.sharedWorkspace.launchAppWithBundleIdentifierOptionsAdditionalEventParamDescriptorLaunchIdentifier(
    Application(app_name).id(),
    $.NSWorkspaceLaunchAsync | $.NSWorkspaceLaunchAndHide,
    $.NSAppleEventDescriptor.nullDescriptor,
    null
  )
}

launch_in_bg('Adobe Photoshop 2021.app')

var module = { exports: {} }
module.exports = { launch_in_bg, launch }
