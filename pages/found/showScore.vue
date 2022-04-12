<template>
	<view class="content">
		<view class="score-title">
			获得<text class="text-red">{{this.vuex_score}}</text>分
		</view>
		<u-image src="../../static/jb.png" mode="" width="280rpx" height="280rpx"></u-image>
		<view class="answer-results">
			<text>共计：10题</text>
			<text>答对：{{this.vuex_score/10}}题</text>
			<text>错误：{{10-this.vuex_score/10}}题</text>
		</view>
		<!-- <button type="default" @click="toIndex">查看排行</button> -->
		<u-button type="error" @click="toScoresort">查看排行</u-button>
		<u-button type="success" @click="toIndex">返回首页</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			toScoresort() {
				// 提交成绩
				uniCloud.callFunction({
					name: 'upload_grades',
					data: {
						score: this.vuex_score,
						id: this.vuex_userId
					},
					success: (res) => {
						console.log(res.result)
					}
				})

				uni.navigateTo({
					url: "/pages/found/scoreSort",
				});

			},
			toIndex() {
				// 页面跳转
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	// 基础样式
	.content {
		margin: 0 auto;
		width: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 900rpx;
		justify-content: space-around;

		.score-title {
			font-size: 64rpx;
		}
	}

	.answer-results {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 40rpx;
		height: 200rpx;
		justify-content: space-around;
	}

	// 公共样式
	.text-red {
		color: #F00;
	}
</style>
