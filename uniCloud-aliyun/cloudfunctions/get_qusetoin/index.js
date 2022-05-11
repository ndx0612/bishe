'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collecton = db.collection('test-question');
	const res = await collecton.get();
	return {
		code: 0,
		data: res.data
	}
};
