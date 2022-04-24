'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('user');

	const {
		from
	} = event;

	const res = await collection.where({
		loginName: from.name,
	}).get()
	if (res.data.length != 0) {
		return {
			code: 200,
			msg: "用户已经存在"
		}
	}

	var mm = Math.floor(Math.random() * 10000);

	const def = {
		"article_likes_ids": [], // 文章收藏
		"author_name": "用户" + mm, // 默认用户名
		"avatar": "//img3.sycdn.imooc.com/54584e2c00010a2c02200220-160-160.jpg", // 默认头像
		"gender": "男",
		"phone": "",
		"score": 0
	}

	collection.add({
		loginName: from.name,
		password: from.password,
		...def
	});
	return {
		code: 200,
	}
};
