<template>
	<view class="lisiItem">
		<view class="u-border-bottom ul-item" v-for="(news,i) in newsList" :key="i">
			<view class="three-img" @click="goOtherPage('/pages/article/fullText',{url:news.url})">
				<text class="img-title" v-html="news.title"></text>
				<view class="three-image">
					<u-image width="228rpx" height="177rpx" :src="news.picUrl"></u-image>
					<view class="text-width">
						{{news.description}}...
					</view>
				</view>
				<span class="img-media">新浪网</span>
				<span class="img-media">{{timediffer(new Date(news.ctime))}}</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "TianData",
		data() {
			return {

			};
		},
		props: {
			newsList: {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			print() {
				console.log(this.newsList)
			},
			isSave() {
				console.log('e')
			},
						// 时差计算(传入时间戳)
						timediffer(last, now) {
							const options = {
								year: '年前',
								month: '个月前',
								day: '天前',
								hour: '小时前',
								minute: '分钟前',
								second: '秒前',
								just: '刚刚',
							}
							if (!now) {
								var now = new Date();
							}
							const timer = (now - last) / 1000; // 获取秒数
							let tip = '';
							if (timer <= 0 || Math.floor(timer / 60) <= 0) { // 小于60s,刚刚
								tip = options.just;
							} else if (timer < 60 * 60) {
								tip = Math.floor(timer / 60) + `${options.minute}`;
							} else if (timer < 60 * 60 * 24) {
								tip = Math.floor(timer / 3600) + `${options.hour}`;
							} else if (timer < 60 * 60 * 24 * 30) {
								tip = Math.ceil(timer / 86400) + `${options.day}`;
							} else {
								tip = Math.floor(timer / (86400 * 24)) + `${options.month}`;
							}
							return tip;
						}
		}
	}
</script>

<style lang="scss" scoped>
	.text-width {
		width: 460rpx;
		margin: 0 20rpx;
		line-height: 1.5;
	}

	.set-width {
		width: 400rpx;
	}

	.one-img {
		display: flex;
		justify-content: space-around;
		height: 240rpx;
		padding: 15rpx;

		.one-img-text {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			text-indent: 2em;
		}
	}

	.big-img {
		width: 94%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		// align-items: center;
	}

	.three-img {
		width: 94%;
		margin: 20rpx auto;

		.three-image {
			margin: 20rpx 0;
			display: flex;
		}
	}

	.img-title {
		font-weight: bold;
		font-size: 34rpx;
		margin: 10rpx;
	}

	.img-media {
		color: #999999;
		margin: 20rpx;
	}

	.ul-item {
		padding: 10rpx;
	}
</style>
