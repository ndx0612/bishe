<template>
	<view>
		<u-button class="btn" @click="printTest()">绑定</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onLoad() {
			this.printTest()
		},
		methods: {
			printTest() {
				this.$u.get('http://api.tianapi.com/wenda/index', {
					key: 'c498f8d96e8d9ad2368513957311caf3',
				}).then(res => {
					console.log(res);
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
