// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' })=> {
    ctx.body = {
      status: 'ok',
      data: res,
    }
    ctx.status = 200
}


exports.failure = ({ ctx, code = 404, msg = '请求对象不存在' })=> {
  ctx.body = {
    status: 'failure',
    error: 'error',
    message: msg.toString(),
  }
  ctx.status = code
}
