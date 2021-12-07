'use strict';
exports.main = async (event, context) => {
	const {
		phone
	} = event;
	// 创建一个随机数，返回给前端
	const currentNumber = Math.random().toString().substr(2, 6)
	return {
		code: 200,
		data: {
			code: currentNumber,
			msg: "短信验证码发送成功",
		}
	}
	// try {
	// 	const res = await uniCloud.sendSms({
	// 		appid: '__UNI__C43C870', // mainfest.json中进行获取
	// 		smsKey: 'a8198d9fc8d5cfb680cfd26deacb7c5d',
	// 		smsSecret: 'a2968e7f7b287f19ad1a213faac0352f',
	// 		phone,
	// 		templateId: '13437', // 获取的短信模版
	// 		data: {
	// 			code: currentNumber,
	// 			expMinute: '5',
	// 		}
	// 	})
	// 	// 调用成功，请注意这时不代表发送成功
	// 	return {
	// 		code: 200,
	// 		data: {
	// 			mobileCode: currentNumber,
	// 			msg: "短信验证码发送成功",
	// 		}
	// 	}
	// } catch (err) {
	// 	return {
	// 		code: 200,
	// 		msg: '短信验证码发送失败'
	// 	}
	// }
};
