<template>
	<view class="content">
		<view>
			<u-form :model="form" ref="uForm">
				<u-form-item label="账号" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.name" placeholder="请输入账号"></u-input>
				</u-form-item>
				<u-form-item label="密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.password" placeholder="请输入密码" :type="pwd"></u-input>
				</u-form-item>
				<u-form-item label="确认密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.password2" placeholder="再次请输入密码" :type="pwd"></u-input>
				</u-form-item>
			</u-form>
			<u-button class="btn" @click="registered">注册</u-button>
			<u-toast ref="uToast" />
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
					password: '',
					password2: ''
				},
			}
		},
		methods: {
			// 注册
			registered() {
				if (!this.form.password || !this.form.password2 || !this.form.name) {
					this.$refs.uToast.show({
						title: '请检查输入',
						type: 'info',
					})
				} else if (this.form.password != this.form.password2) {
					this.$refs.uToast.show({
						title: '两次输入密码不一样',
						type: 'warning',
					})
				} else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(this.form.password)) {
					this.$refs.uToast.show({
						title: '密码必须大于6位，且包含数字和字母',
						type: 'warning',
					})
				} else {
					// 输入没有问题
					let userInfo = this.$u.deepClone(this.form);
					userInfo.password = md5Libs.md5(userInfo.password)
					console.log(userInfo)
					uniCloud.callFunction({
						name: "user-reg",
						data: {
							from: userInfo
						},
						success: (res) => {
							if (res.result.msg == "用户已经存在") {
								this.$refs.uToast.show({
									title: '用户已经存在',
									type: 'warning',
								})
							} else {
								this.$refs.uToast.show({
									title: '注册成功',
									type: 'success',
									url: '/pages/login/login'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 700rpx;
		margin: auto;
	}

	.btn {
		margin: 50rpx auto;
		width: 300rpx;
		background-color: #0faeff;
		color: #FFFFFF;
	}
</style>
