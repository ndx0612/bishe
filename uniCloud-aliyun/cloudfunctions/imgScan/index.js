'use strict';
// const response = require('response')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	let token = event.token
	const res = await uniCloud.httpclient.request(
		`https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=${token}`, {
			method: 'POST',
			header: {
				"content-type": "application/x-www-form-urlencoded",
			},
			data: {
				image: event.image
			},
			// contentType: 'application/x-www-form-urlencoded', // 指定以application/json发送data内的数据
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		})
	return res
};
