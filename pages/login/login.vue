<template>
	<view>
		<view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="账号" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.name" placeholder="请输入账号"></u-input>
				</u-form-item>
				<u-form-item label="确认密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.password" placeholder="请输入密码" :type="pwd"></u-input>
				</u-form-item>
			</u-form>
			<u-button class="btn" type="error">登录</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				codeText: '', // 验证码倒计时
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
			// 倒计时
			codeChange(text) {
				this.codeText = text;
			},
			// 倒计时
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 1000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		margin: 50rpx auto;
		width: 300rpx;
	}
</style>
