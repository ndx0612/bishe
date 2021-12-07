<template>
	<view>
		<view>
			<view>
				<u-notice-bar mode="horizontal" :list="list"></u-notice-bar>
			</view>
			<u-field v-model="mobile" label="手机号" placeholder="请填写手机号"></u-field>
			<u-field v-model="code" label="验证码" placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<!-- 验证码倒计时 -->
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<u-button class="btn" @click="login">登录</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText: '', // 验证码倒计时
				labelWidth: '150rpx', // label宽度,可选auto
				labelAlign: 'center', // label对齐方式
				code_verify: '', // 获取到的验证码
				list: [
					"如果手机号不存在，系统会为您自动创建新用户，默认账号为手机号，密码123456，请及时修改密码"
				]
			}
		},
		methods: {
			// 倒计时
			codeChange(text) {
				this.codeText = text;
			},
			// 发送验证码后提示信息
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 手机号码验证
					if (this.$u.test.mobile(this.mobile)) {
						// 模拟向后端请求验证码
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 1000);
						// 获取验证码
						uniCloud.callFunction({
							name: 'get_code',
							data: {
								phone: this.mobile
							},
							success: (res) => {
								this.code_verify = res.result.data.code;
								console.log(this.code_verify)
							}
						})
					} else {
						this.$u.toast('请输入正确手机号');
					}
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			// 手机号登录
			login() {
				uniCloud.callFunction({
					name: "user-phoneLogin",
					data: {
						phone: this.mobile
					},
					success: (res) => {
						// 如果手机号不存在，则新建用户，用户名为手机号，密码123456
						console.log(res)
					}
				})
				// // 登录成功
				// if (this.code == this.code_verify) {
				// 	uniCloud.callFunction({
				// 		name: "user-phoneLogin",
				// 		data: {
				// 			phone: this.mobile
				// 		},
				// 		success: (res) => {
				// 			console.log(res)
				// 		}
				// 	})
				// } else {
				// 	this.$u.toast('验证码输入错误');
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		margin: 50rpx auto;
		width: 400rpx;
		background-color: #0faeff;
		color: #FFFFFF;
	}
</style>
