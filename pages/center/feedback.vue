<template>
	<view>
		<view class="box">
			<u-input v-model="value" type="textarea" placeholder="请输入文本" :clearable='false' />
		</view>
		<u-field v-model="mobile" label="联系方式" placeholder="请输入联系方式"></u-field>
		<u-button class="btn" @click="submit">提交反馈</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '', // 反馈意见
				mobile: '', // 手机号
			};
		},
		onLoad() {
			this.mobile = this.vuex_phone
		},
		methods: {
			submit() {
				uniCloud.callFunction({
					name: 'add_feedback',
					data: {
						name: this.vuex_userName,
						phone: this.mobile,
						feedback: this.value
					},
					success: (res) => {
						console.log(res)
						if (res.result.code == 200) {
							this.$refs.uToast.show({
								title: '意见反馈成功',
								type: 'success',
								url: 'pages/center/index',
								isTab: true
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #eceff4;
	}

	.box {
		background-color: #FFFFFF;
		height: 400rpx;
		width: 718rpx;
		padding: 15rpx;
		border-radius: 5px;
		margin: 20rpx auto;
	}

	.btn {
		width: 600rpx;
	}
</style>
