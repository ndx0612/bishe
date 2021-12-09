'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		id,
		phone
	} = event;
	const res = await collection.where({
		phone: phone
	}).get()
	if (res.data.length != 0) {
		return {
			code: 201,
			msg: "用户已经存在"
		}
	} else {
		const res = await collection.doc(id).update({
			phone: phone
		})
		return {
			code: 200,
			msg: "绑定成功"
		}
	}

};
