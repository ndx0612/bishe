<template>
	<view>
		<view>
			<u-field v-model="mobile" label="手机号" placeholder="请填写手机号" :disabled='isBinded'></u-field>
			<u-field v-model="code" label="验证码" placeholder="请填写验证码" v-if="!isBinded">
				<u-button size="mini" slot="right" type="success" @click="getCode">{{codeText}}</u-button>
			</u-field>
			<!-- 验证码倒计时 -->
			<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
			<u-button class="btn" @click="bind" v-if="!isBinded">绑定</u-button>
			<u-button class="btn" v-else>手机已绑定</u-button>
			<u-toast ref="uToast" />
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
				isBinded: false // 是否绑定过手机
			}
		},
		onLoad() {
			if (this.vuex_phone.length == 11) {
				this.mobile = this.vuex_phone;
				this.isBinded = true;
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
			// 绑定手机
			bind() {
				if (this.code == this.vuex_code) {
					uniCloud.callFunction({
						name: 'bind_phone',
						data: {
							id: this.vuex_userId,
							phone: this.mobile
						},
						success: (res) => {
							console.log(res)
							if (res.result.code == 201) {
								this.$refs.uToast.show({
									title: '手机已被绑定',
									type: 'warning',
								})
							} else {
								this.$u.vuex('vuex_phone', res.result.data[0].phone); // 将用户手机号存入
								this.$refs.uToast.show({
									title: '手机绑定成功',
									type: 'success',
									url: 'pages/center/index',
									isTab: true
								})
							}
						}
					})
				} else if (this.code == '') {
					this.$refs.uToast.show({
						title: '请获取验证码',
						type: 'warning',
					})
				} else {
					this.$refs.uToast.show({
						title: '验证码输入错误',
						type: 'warning',
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.btn {
		margin: 50rpx auto;
		width: 300rpx;
		background-color: #00aaff;
		color: #FFFFFF;
	}
</style>
