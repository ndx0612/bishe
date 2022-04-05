<template>
	<!-- 该页面渲染文章内容 -->
	<view class="full-text">
		<view class="custorm" v-if="false">
			<view class="article-head">
				<view class="title">{{info.title}}</view>
				<view class="head-info">
					<text>{{info.sourceTime || info.time}}</text>
				</view>
			</view>
			<view class="full-style">
				<u-parse :html="info.content"></u-parse>
			</view>
		</view>
		<web-view v-else :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				isCustorm: Boolean,
				url: ''
			}
		},
		// params接收传入参数
		onLoad(params) {
			console.log(params)
			this.url = params.url;
		},
	}
</script>

<style lang="scss" scoped>
	.full-text {
		width: 100%;
		height: 100%;

		.full-style {
			margin-top: 100rpx;
			color: $u-content-color;
			font-size: 32rpx;
			line-height: 2.0;
			padding: 30rpx;
		}

		.custorm {
			width: 100%;
			height: 100%;
			padding: 14rpx;

			.article-head {
				width: 100%;
				min-height: 200rpx;
				display: flex;
				justify-content: space-around;
				align-items: flex-start;
				flex-direction: column;
				border-bottom: 1px solid #F5F5F5;

				.title {
					width: 100%;
					font-size: 36rpx;
					font-weight: bold;
				}

				.head-info {
					width: 100%;
					color: $u-light-color;

					.shy-flex-b {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}
	}
</style>
