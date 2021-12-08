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
		<u-toast ref="uToast" />
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
				list: [
					"如果手机号未绑定，系统会为您自动创建新用户，默认账号为手机号，密码123456，请及时修改密码"
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
								// 获取前端收到的验证码保存到vuex中
								this.$u.vuex('vuex_code', res.result.data.mobileCode);
								console.log(this.vuex_code) 
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
				// 判断vuex的验证码是否和前端收到的系统
				if (this.code == this.vuex_code) {
					uniCloud.callFunction({
						name: "user-phoneLogin",
						data: {
							phone: this.mobile
						},
						success: (res) => {
							console.log(res)
							// 如果手机号不存在，则新建用户，并且提示
							if (res.result.code == 201) {
								this.$u.vuex('vuex_userId', res.result.data[0]._id);
								this.$u.vuex('vuex_userName', res.result.data[0].author_name); // 将用户昵称存入
								this.$u.vuex('vuex_Avatar', res.result.data[0].Avatar); // 将用户头像存入
								this.$refs.uToast.show({
									title: '为您自动创建新用户',
									type: 'success',
									url: 'pages/home/index',
									isTab: true
								})
							} else {
								this.$u.vuex('vuex_userId', res.result.data[0]._id);
								this.$u.vuex('vuex_userName', res.result.data[0].author_name); // 将用户昵称存入
								this.$u.vuex('vuex_Avatar', res.result.data[0].Avatar); // 将用户头像存入
								this.$refs.uToast.show({
									title: '登录成功',
									type: 'success',
									url: 'pages/home/index',
									isTab: true
								})
							}
						}
					})
					// 测试：上传手机号并且打印结果
					// uniCloud.callFunction({
					// 	name: "user-phoneLogin",
					// 	data: {
					// 		phone: this.mobile
					// 	},
					// 	success: (res) => {
					// 		console.log(res)
					// 	}
					// })
				} else {
					this.$u.toast('验证码输入错误');
				}
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
