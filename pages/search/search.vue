<template>
	<view>
		<!-- 轮播图 -->
		<view class="wrap">
			<u-swiper :list="list" :title="true"></u-swiper>
		</view>
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
		<!-- <button type="default" @click="uploadFile">上传图片</button> -->
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
				keyword: ''
			}
		},
		methods: {
			// 点击搜索按钮
			gotoSeach() {
				console.log(this.keyword)
			},

			// 上传图片
			uploadFile() {
				uni.chooseImage({
					success(res) {
						console.log(res.tempFilePaths[0])
						uniCloud.uploadFile({
							cloudPath: '01.png', // 图片名称
							filePath: res.tempFilePaths[0] // 图片路径
						})
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
