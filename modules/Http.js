/* 使用说明

此模块用于网络请求

使用方法：

get(‘https://www.baidu.com’,headers)

post()

*/

let module = { exports: {} }

function get(pURL) {
  let nsURL = $.NSURL.URLWithString(pURL)
  let nsHTML = $.NSData.dataWithContentsOfURL(nsURL)
  let nsHTMLStr = $.NSString.alloc.initWithDataEncoding(
    nsHTML,
    $.NSUTF8StringEncoding
  )

  let htmlStr = ObjC.unwrap(nsHTMLStr)
  return htmlStr
}

function rgb_to_hex(rgbValues) {
  var r = parseInt(rgbValues[0], 10).toString(16).slice(-2)
  if (r.length == 1) r = '0' + r
  var g = parseInt(rgbValues[1], 10).toString(16).slice(-2)
  if (g.length == 1) g = '0' + g
  var b = parseInt(rgbValues[2], 10).toString(16).slice(-2)
  if (b.length == 1) b = '0' + b
  return '#' + r + g + b
}

function hex_to_rgb(hex) {
  var rgb = []

  hex = hex.substr(1) //去除前缀 # 号

  if (hex.length === 3) {
    // 处理 "#abc" 成 "#aabbcc"
    hex = hex.replace(/(.)/g, '$1$1')
  }

  hex.replace(/../g, function (color) {
    rgb.push(parseInt(color, 0x10)) //按16进制将字符串转换为数字
  })

  return 'rgb(' + rgb.join(',') + ')'
}

// let res = get('https://www.baidu.com/s?ie=UTF-8&wd=modules')
// console.log(res)

module.exports = { get, rgb_to_hex,hex_to_rgb }
