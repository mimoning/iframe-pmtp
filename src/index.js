import UUID from 'uuid/v1'

// 需要请求的目标
let TARGET

// 保存发送请求之后的回调函数
const handlers = {}

// 保存收到请求之后的回调函数
const listeners = {}

// 指定目标
function setTarget (target) {
  if (!target) {
    throw new Error('The target should be a window object')
  }
  TARGET = target
}

// 发送 postmessage，type 决定了收到 postmessage 后是否需要返回
function postmessage ({ uuid, target, type, origin, key, data }) {
  target.postMessage({
    uuid,
    type,
    key,
    data
  }, origin)
}

// 发送请求
function request (key, data = {}, callback, target = TARGET, origin = '*') {
  // 如果没有设置 target 的话，抛出错误
  if (!target) {
    throw new Error('You must set a target by "setTarget" method Or the fourth parameter')
  }
  // 生成唯一标识符 uuid
  const uuid = UUID()
  // 发送 postmessage
  postmessage({ uuid, target, type: 'request', key, data, origin })
  // 注册相应回调函数
  if (callback && typeof callback === 'function') {
    handlers[uuid] = (data) => {
      callback(data)
      delete handlers[uuid]
    }
  }
}

// 单纯请求数据，不发送数据
function get (key, callback, target = TARGET, origin = '*') {
  request(key, {}, callback, target, origin)
}

// 添加收到请求的回调函数
function addListener (key, callback, once = false) {
  if (typeof callback !== 'function') {
    throw new Error('The second argument of function "addListener" should be a "Function"')
  }
  let cb = callback
  listeners[key] = listeners[key] || []
  // 如果是一次性回调
  if (once) {
    cb = (data, res) => {
      callback(data, res)
      const index = listeners[key].indexOf(cb)
      listeners[key].splice(index, 1)
    }
  }
  listeners[key].push(cb)
}

// 返回响应
function response (uuid, target, data, origin) {
  postmessage({ uuid, target, type: 'response', data, origin })
}

// 启动监听
function activate () {
  window.addEventListener('message', e => {
    const { type, key, uuid, data } = e.data
    // 如果是请求
    if (type === 'request' && listeners[key]) {
      // 顺序执行所有已注册的回调
      listeners[key].forEach(cb => {
        if (typeof cb === 'function') {
          // 如果可以取到请求的源，则直接返回给源
          // 不行的话就直接给个通配符
          let origin = e.origin && e.origin === 'null' ? '*' : e.origin
          cb(data, res => response(uuid, e.source, res, origin))
        }
      })
    }
    // 如果是返回
    if (type === 'response' && typeof handlers[uuid] === 'function') {
      // 执行相应的回调
      handlers[uuid](data)
    }
  })
}

// 执行监听
activate()

export default {
  request,
  get,
  addListener,
  setTarget
}
