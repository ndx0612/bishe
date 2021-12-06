'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		from
	} = event;
	const res = await collection.where({
		loginName: from.name,
		password: from.password
	}).get()
	if (res.data.length == 0) {
		return {
			code: 200,
			msg: "用户名或密码错误"
		}
	} else {
		return {
			code: 200,
			data: res.data,
			msg: "数据返回成功"
		}
	}

};
