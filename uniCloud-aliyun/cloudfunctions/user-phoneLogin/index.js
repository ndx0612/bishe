'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const collection = db.collection('user');
	const {
		phone
	} = event

	const res = await collection.where({
		phone
	}).get()
	// 如果用户不存在，创建一个新用户
	if (res.data.length == 0) {
		var mm = Math.floor(Math.random() * 10000);
		const def = {
			"loginName": phone,
			"password": "e10adc3949ba59abbe56e057f20f883e",
			"article_likes_ids": [], // 文章收藏
			"author_name": "用户" + mm, // 默认用户名
			"avatar": "//img3.sycdn.imooc.com/54584e2c00010a2c02200220-160-160.jpg", // 默认头像
			"gender": "男",
			"phone": phone
		}
		collection.add({
			...def
		});
		return {
			code: 200,
			msg: "用户不存在,创建新用户"
		}
	} else {
		return {
			code: 200,
			data: res
		}
	}
};
