'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		id
	} = event;
	const res = await collection.doc(id).get() // id为需要查询的指定id
	return {
		code: 200,
		data: res.data
	}
};
