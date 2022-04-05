<template>
	<view class="content">
		<view class="">
			获得<text>90</text>分
		</view>
		<u-image src="../../static/jb.png" mode="" width="280rpx" height="280rpx"></u-image>
		<view class="">
			<text>共计：10题目</text>
			<text>答对：10题目</text>
			<text>错误：10题目</text>
		</view>
		<button type="default">返回首页</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.content {
		margin: 0 auto;
		width: 700rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 700rpx;
		justify-content: space-around;
	}
</style>
