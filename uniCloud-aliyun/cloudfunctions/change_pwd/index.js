'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		form,
		id
	} = event;
	// 首先查询是否存在
	const res = await collection.where({
		_id: id,
		password: form.oldPwd
	}).get()
	if (res.data.length == 0) {
		return {
			code: 201,
			msg: "旧密码输入错误"
		}
	} else {
		const res = await collection.doc(id).update({
			password: form.newPwd
		})
		return {
			code: 200,
			msg: "密码修改成功"
		}
	}
};
