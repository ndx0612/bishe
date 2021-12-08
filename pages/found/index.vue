<template>
	<view>
		<view>
			用户id为：{{vuex_userId}}
		</view>
		<u-button @click="modifyVuex">修改变量</u-button>
	</view>
</template>

<script>
	export default {
		methods: {
			modifyVuex() {
				const currentNum = Math.random().toString().substr(2, 6);
				console.log(this.vuex_userId)
				console.log(currentNum)
			}
		}
	}
</script>