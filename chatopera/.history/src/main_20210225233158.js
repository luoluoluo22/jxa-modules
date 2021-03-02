const Chatbot = require('@chatopera/sdk').Chatbot

const clientId = '60174090cd431d0017cc8b41'
const secret = '719a822c4bb293d4c756c7c21672f315'

const chatbot = new Chatbot(clientId, secret)

// 获取问题相似度列表
async function similar() {
  res = await chatbot.command('POST', '/faq/query', {
    query: '不锈钢板现在是什么价格',
    fromUserId: 'sdktest1',
    faqBestReplyThreshold: 0.9,
    faqSuggReplyThreshold: 0.1,
  })

  console.log(res)
}

// 获取机器人画像
async function portrait() {
  res = await chatbot.command('get', '/')
  console.log(res)
}

// 更新机器人画像
async function push_portrait() {
  body = {
    fallback: '请联系客服。',
    description: '我的超级能力是对话',
    welcome: '你好，我是机器人小巴巴',
  }
  res = await chatbot.command('PUT', '/', body)
  console.log(res)
}

// 获取全局任务状态
async function status() {
  res = await chatbot.command('get', '/status')
  console.log(res)
}

// 知识库管理

// 创建知识库分类
async function creat_knowledge_base() {
  body = {
    label: 'new 知识库-test',
  }
  res = await chatbot.command('post', '/faq/categories', body)
  console.log(res)
}

// 删除分类
async function delete_knowledge_base() {
  res = await chatbot.command('DELETE', '/faq/categories/FHGECoIr_')
}

// 更新知识库分类
async function update_knowledge_base() {
  body = {
    value: 'DjAp3LPRW',
    label: '知识库已改名',
  }
  res = await chatbot.command('', '/faq/categories', body)
  console.log(res)
}

// 获取知识库分类信息
async function get_knowledge_base() {
  res = await chatbot.command('get', '/faq/categories/')
  console.log(res)
}

// 问答对

// 新建
async function creat_faq() {
  let body = {
    post: '如何查看快递单号',
    replies: [
      //多条回复
      {
        rtype: 'plain',
        content: 'foo',
        enabled: true,
      },
      {
        rtype: 'plain',
        content: 'bar',
        enabled: true,
      },
    ],
    enabled: true, // 是否启用
    categoryTexts: ['一级分类名', '二级分类名'],
  }
  res = await chatbot.command('post', '/faq/database', body)
  console.log(res)
}

// 删除
async function delete_faq() {
  res = await chatbot.command('DELETE', '/faq/database/{{docId}}')
  console.log(res)
}

// get ，不能使用关键字
async function get_faq() {
  res = await chatbot.command('get', '/faq/database?limit=10&page=1&q=')
  console.log(res)
}

// 改
async function get_faq() {
  let body = ''
  res = await chatbot.command('PUT', '/faq/database/{{docId}}', body)
  console.log(res)
}
// 回复问题
async function answer(msg) {
  if (msg) {
    let body = {
      fromUserId: 'test_user_id_01',
      textMessage: msg,
      faqBestReplyThreshold: 0.6,
      faqSuggReplyThreshold: 0.35,
    }
    res = await chatbot.command('POST', '/conversation/query', body)
    return res
  } else {
    console.log('请输入消息内容')
  }
}

// ======================

function get_msg() {
  return res
}

async function main() {
  let msg = get_msg()
  let res = await answer(msg)
  console.log(res)
}

main()
console.log(1)
