<template>
	<view>
		<view>
			用户id为：{{vuex_userId}}
		</view>
		<u-button @click="modifyVuex">修改变量</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		methods: {
			modifyVuex() {
				this.$refs.uToast.show({
					title: '密码修改成功',
					type: 'success',
				})
				// const currentNum = Math.random().toString().substr(2, 6);
				// console.log(this.vuex_userId)
				// console.log(currentNum)
			}
		}
	}
</script>
