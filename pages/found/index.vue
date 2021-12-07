<template>
	<view>
		<view>
			版本号为：{{vuex_userId}}
		</view>
		<view>
			<<琵琶行>>的作者为{{vuex_user.name}}
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