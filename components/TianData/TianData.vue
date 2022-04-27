<template>
	<view class="lisiItem">
		<view class="u-border-bottom ul-item" v-for="(news,i) in newsList" :key="i">
			<view class="three-img" @click="goOtherPage('/pages/article/fullText',{url:news.url})">
				<text class="img-title" v-html="news.title"></text>
				<view class="three-image">
					<u-image width="228rpx" height="177rpx" :src="news.picUrl"></u-image>
					<view class=" text-width">
						{{news.description}}
					</view>
				</view>
				<text class="img-media">时间：{{news.ctime}}</text>
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text-width {
		width: 460rpx;
		margin: 20rpx;
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
			justify-content: space-between;
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
