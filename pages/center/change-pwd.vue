<template>
	<view>
		<view class="form">
			<u-form :model="form" ref="uForm">
				<u-form-item label="旧密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.oldPwd" placeholder="请输入旧密码" :type="pwd"></u-input>
				</u-form-item>
				<u-form-item label="新密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.newPwd" placeholder="请输入新密码" :type="pwd"></u-input>
				</u-form-item>
				<u-form-item label="确认密码" :label-width="labelWidth" :label-align="labelAlign">
					<u-input v-model="form.newPwdAgain" placeholder="再次输入新密码确认" :type="pwd"></u-input>
				</u-form-item>
			</u-form>
			<u-button class="btn" @click="save">保存</u-button>
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
					oldPwd: '',
					newPwd: '',
					newPwdAgain: ''
				},
			}
		},
		methods: {
			save() {
				let userInfo = this.$u.deepClone(this.form); // 深度拷贝
				userInfo.oldPwd = md5Libs.md5(userInfo.oldPwd)
				userInfo.newPwd = md5Libs.md5(userInfo.newPwd)
				if (this.form.newPwd != this.form.newPwdAgain) {
					this.$refs.uToast.show({
						title: '两次输入密码不一样',
						type: 'warning',
					})
				} else {
					uniCloud.callFunction({
						name: 'change_pwd',
						data: {
							form: userInfo,
							id: this.vuex_userId
						},
						success: (res) => {
							console.log(res.result)
							if (res.result.code == 200) {
								// 清空用户_id
								this.$u.vuex('vuex_userId', null);
								this.$refs.uToast.show({
									title: '密码修改成功',
									type: 'success',
								})
								setTimeout(() => {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}, 2000);
							} else {
								this.$refs.uToast.show({
									title: '旧密码输入错误',
									type: 'warning',
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.form {
		padding: 20rpx;

		.btn {
			margin: 50rpx auto;
			width: 300rpx;
			background-color: #00aaff;
			color: #FFFFFF;
		}
	}
</style>
