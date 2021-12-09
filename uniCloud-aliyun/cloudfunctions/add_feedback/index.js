'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('feedback');
	const {
		name,
		phone,
		feedback
	} = event
	collection.add({
		name: name,
		phone: phone,
		feedback: feedback
	});
	//返回数据给客户端
	return {
		code: 200,
		msg: '添加数据成功'
	}
};
