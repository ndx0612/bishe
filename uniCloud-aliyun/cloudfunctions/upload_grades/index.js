'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		id,
		score
	} = event;
	const res = await collection.doc(id).update({
		score: score
	})
	return {
		code: 200,
		msg: "成绩更新成功"
	}
};
