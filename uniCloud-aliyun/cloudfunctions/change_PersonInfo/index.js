'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		form,
		id
	} = event;

	// 修改表数据
	const res = await collection.doc(id).update({
		author_name: form.name,
		gender: form.value
	})
	return {
		code: 200,
		msg: "密码修改成功"
	}
};
