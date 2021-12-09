<template>
	<view>
		<u-modal v-model="show" :content="content" @confirm="confirm"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				content: '当前版本1.0.0'
			}
		},
		methods: {
			confirm() {
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">

</style>
