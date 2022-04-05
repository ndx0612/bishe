'use strict';
// const response = require('response')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const res = await uniCloud.httpclient.request(
		`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${event.apiKey}&client_secret=${event.secretKey}&`, {
			method: 'POST',
			data: {},
			// contentType: 'application/x-www-form-urlencoded', // 指定以application/json发送data内的数据
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		})
	return res.data
};
