<template>
	<view class="lisiItem">
		<view class="u-border-bottom" v-for="(news,i) in newsList" :key="i">
			<!-- 三图标签 -->
			<view class="three-img" v-if="news.imgs.length>=3"
				@click="goOtherPage('/pages/article/fullText',{url:news.url})">
				<text class="img-title" v-html="news.title"></text>
				<view class="three-image">
					<u-image width="228rpx" height="177rpx" :src="news.imgs[0]"></u-image>
					<u-image width="228rpx" height="177rpx" :src="news.imgs[1]"></u-image>
					<u-image width="228rpx" height="177rpx" :src="news.imgs[2]"></u-image>
				</view>
				<text class="img-media">来源：{{news.source}}</text>
				<text class="img-media">浏览量：{{news.viewNums}}</text>
			</view>

			<!-- 单图模式 -->
			<view class="three-img" v-if="news.imgs.length<3"
				@click="goOtherPage('/pages/article/fullText',{url:news.url})">
				<text class="img-title" v-html="news.title"></text>
				<view class="three-image">
					<u-image width="228rpx" height="177rpx" :src="news.imgs[0]"></u-image>
					<view class="u-line-5 text-width">
						{{news.synopsis}}
					</view>
				</view>
				<text class="img-media">来源：{{news.source}}</text>
				<text class="img-media">浏览量：{{news.viewNums}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "NewsCard",
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
</style>
