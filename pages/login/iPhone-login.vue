<template>
	<view>
		<view>
			<u-field v-model="mobile" label="手机号" placeholder="请填写手机号"></u-field>
			<u-field v-model="code" label="验证码" placeholder="请填写验证码">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<!-- 验证码倒计时 -->
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
		</view>
		<u-button class="btn">登录</u-button>
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

<style lang="scss" scoped>
	.btn {
		margin: 50rpx auto;
		width: 400rpx;
		background-color: #0faeff;
		color: #FFFFFF;
	}
</style>
