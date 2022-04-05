<template>
	<view>
		<!-- 轮播图 -->
		<view class="wrap">
			<u-swiper :list="list" :title="true"></u-swiper>
		</view>
		<!-- 搜索功能 -->
		<view class="search">
			<u-search class="search-text" placeholder="请输入垃圾名称" v-model="keyword" @search="gotoSeach()"
				@custom="gotoSeach()"></u-search>
			<view class="text u-font-40">或</view>
			<view>
				<u-image class="search-img" width="180rpx" height="180rpx" src="../../static/paizhao.png"
					@click="uploadFile"></u-image>
			</view>
			<view class="text">
				拍照识别
			</view>
		</view>
		<!-- 选择列表 -->
		<view>
			<u-select v-model="show" :list="searchRes" @confirm="confirm"></u-select>
			<!-- <u-button @click="show = true">打开</u-button> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '轮播图1'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '轮播图2'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '标题3'
					}
				],
				keyword: '',
				token: '',
				show: false,
				searchRes: [],
			}
		},
		onShow() {
			this.getToken();
		},
		methods: {
			// 点击搜索按钮
			gotoSeach() {
				this.$u.route('/pages/search/search-show', {
					keyword: this.keyword
				});
			},

			// 获取百度token
			getToken() {
				uniCloud.callFunction({
						name: 'getBaiduToken',
						data: {
							apiKey: 'padRERoch0xjSccLpsMlszM8',
							secretKey: 'cEuvvE7IsdnuaMZhdr2ZBoa92qyrR0ra'
						}
					})
					.then(res => {
						this.token = res.result.access_token;
					});
			},
			confirm(e) {
				console.log(e);
				console.log(e[0].label);
				this.$u.route('/pages/search/search-show', {
					keyword: e[0].label
				});
			},

			// 上传图片
			uploadFile() {
				let that = this;
				uni.chooseImage({
					success(res) {
						console.log(res.tempFilePaths[0]);

						// 上传图片到云端
						// uniCloud.uploadFile({
						// 	cloudPath: '01.png', // 图片名称
						// 	filePath: res.tempFilePaths[0] // 图片路径
						// })

						// 图片转base64
						var img = res.tempFilePaths[0]; //imgurl 就是你的图片路径  

						function getBase64Image(img) {
							var canvas = document.createElement("canvas");
							canvas.width = img.width;
							canvas.height = img.height;
							var ctx = canvas.getContext("2d");
							ctx.drawImage(img, 0, 0, img.width, img.height);
							var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
							var dataURL = canvas.toDataURL("image/" + ext);
							return dataURL;
						}

						var image = new Image();
						image.src = img;
						image.onload = function() {
							uniCloud.callFunction({
									name: 'imgScan',
									data: {
										token: that.token,
										image: getBase64Image(image)
									}
								})
								.then(res => {
									let objArr = res.result.data.result;
									const keyMap = {
										keyword: "label",
									};
									for (let i = 0; i < objArr.length; i++) {
										let obj = objArr[i];
										for (let key in obj) {
											let newKey = keyMap[key];
											if (newKey) {
												obj[newKey] = obj[key];
												delete obj[key];
											}
										}
									}
									that.searchRes = objArr;
									that.show = true;
								});
						}
					}
				})
			}
		}
	}
</script>

<style>
	.text {
		color: #0faeff;
		padding: 20rpx;
	}

	.wrap {
		height: 300rpx;
	}

	.search {
		width: 680rpx;
		margin: 0 auto;
		text-align: center;

	}

	.search-text {
		width: 100%;
	}

	.search-img {
		margin: auto;
	}
</style>
