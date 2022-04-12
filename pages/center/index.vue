<template>
	<view class="content">
		<view class="header" @click="goPersonaInfo">
			<u-avatar class="avatar" :src="src" :size="120"></u-avatar>
			<text>Hi, {{this.vuex_userName}}</text>
		</view>
		<view class="set-ul">
			<navigator class="set-li" url="./change-pwd">
				<view>
					<u-icon name="lock" color="#0faeff" size="28"></u-icon>
					<text>修改密码</text>
				</view>
				<u-icon name="arrow-right" color="#858585" size="28"></u-icon>
			</navigator>
			<navigator class="set-li" url="./bind-phone">
				<view>
					<u-icon name="phone" color="#0faeff" size="28"></u-icon>
					<text>绑定手机号</text>
				</view>
				<u-icon name="arrow-right" color="#858585" size="28"></u-icon>
			</navigator>
			<!-- <u-line color="#0faeff"></u-line> -->
			<u-line class="u-line"></u-line>
			<navigator class="set-li" url="./about">
				<view>
					<u-icon name="error-circle" color="#0faeff" size="28"></u-icon>
					<text>关于</text>
				</view>
				<u-icon name="arrow-right" color="#858585" size="28"></u-icon>
			</navigator>
			<navigator class="set-li" url="./feedback">
				<view>
					<u-icon name="zhuanfa" color="#0faeff" size="28"></u-icon>
					<text>提交反馈</text>
				</view>
				<u-icon name="arrow-right" color="#858585" size="28"></u-icon>
			</navigator>
			<navigator class="set-li" url="./check-update">
				<view>
					<u-icon name="question-circle" color="#0faeff" size="28"></u-icon>
					<text>检查更新</text>
				</view>
				<u-icon name="arrow-right" color="#858585" size="28"></u-icon>
			</navigator>
		</view>
		<u-button class="btn" @click="Logout">退出登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad() {
			this.src = this.vuex_Avatar;
		},
		methods: {
			// 退出登录
			Logout() {
				// 清空用户_id
				this.$u.vuex('vuex_userId', null);
				uni.showLoading({
					title: '正在退出登录'
				})
				setTimeout(() => {
					uni.hideLoading();
					uni.redirectTo({
						url: '/pages/login/login'
					})
				}, 1000);
			},

			// 设置个人信息
			goPersonaInfo() {
				uni.navigateTo({
					url: "/pages/center/set-PersonaInfo",
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		height: 260rpx;
		background-color: #0faeff;
		display: flex;
		align-items: center;

		.avatar {
			margin: 30rpx;
		}

		text {
			color: #FFFFFF;
		}
	}

	.set-ul {
		padding: 15rpx;

		.set-li {
			padding: 30rpx;
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;

			text {
				margin: 30rpx;
			}
		}
	}

	.btn {
		margin-top: 50rpx;
		background-color: #0faeff;
		width: 500rpx;
		color: #FFFFFF;
	}
</style>
