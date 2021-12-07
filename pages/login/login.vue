<template>
	<view class="content">
		<!-- 登录表单 -->
		<view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="账号" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.name" placeholder="请输入账号"></u-input>
				</u-form-item>
				<u-form-item label="密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.password" placeholder="请输入密码" :type="pwd"></u-input>
				</u-form-item>
			</u-form>
			<u-button class="btn" @click="login">登录</u-button>
			<u-toast ref="uToast" />
		</view>
		<!-- 其他方式 -->
		<view class="other-way">
			<text @click="goReg">用户注册</text>
			<text @click="goiPhoneLogin">手机号登录</text>
		</view>
	</view>
</template>

<script>
	import md5Libs from "uview-ui/libs/function/md5";
	export default {
		data() {
			return {
				pwd: 'password', // 输入框类型
				labelWidth: '150rpx', // label宽度,可选auto
				labelAlign: 'center', // label对齐方式
				form: {
					name: '',
					password: ''
				},
			}
		},
		methods: {
			// 登录功能
			login() {
				let userInfo = this.$u.deepClone(this.form); // 深度拷贝
				userInfo.password = md5Libs.md5(userInfo.password) // 对密码进行md5加密
				uniCloud.callFunction({
					name: "user-login",
					data: {
						from: userInfo
					},
					success: (res) => {
						console.log(res.result);
						if (res.result.msg == "数据返回成功") {
							// 将用户_id存入vuex中
							this.$u.vuex('vuex_userId', res.result.data[0]._id);
							this.$refs.uToast.show({
								title: '登录成功',
								type: 'success',
								url: 'pages/home/index',
								isTab: true
							})
						} else {
							this.$refs.uToast.show({
								title: '账号或密码错误',
								type: 'warning',
							})
						}
					}
				})
			},
			// 跳转用户注册
			goReg() {
				uni.navigateTo({
					url: './reg'
				})
			},
			// 跳转手机号登录
			goiPhoneLogin() {
				uni.navigateTo({
					url: './iPhone-login'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eceff4;
	}

	.content {
		background-color: #FFFFFF;
		width: 700rpx;
		margin: 20rpx auto;
		padding: 15rpx;
		border-radius: 5px;

		.other-way {
			padding: 20rpx;
			color: #00aaff;
			display: flex;
			justify-content: space-between;
		}

		.btn {
			margin: 50rpx auto;
			width: 400rpx;
			background-color: #0faeff;
			color: #FFFFFF;
		}
	}
</style>
