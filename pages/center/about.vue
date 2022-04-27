<template>
	<view>
		<!-- <u-button class="btn" @click="printTest()">绑定</u-button> -->
		<view class="text">
			本程序是以本人在实习公司中设计项目开发所用到的工具和开发流程为基础，在结合当下社会环境下说发现的问题相互结合。构成的本产品的设计理念。并且将一些开发方法带入到毕设程序中。从开始到完成一共经过4个月的时间。大大小小功能和页面的实现共计22个页面。尤其在登录模块做了严格评定以及用户交互体验。在过程中遇到不少困难，对于前端工作者来说，后端接口以及数据的维护相对花费了较多的时间。但是在不断的花费时间学习下，克服了困难，同时也掌握了一项新技术——unicloud云端数据库开发。
		</view>
		<view class="text">
			程序目的解决与近些年国家重视和社会普遍关注的环保问题中的垃圾分类难等若干问题。对于环境的保护以及垃圾分类的管理，本系统有着较高的实用价值。居民垃圾分，如何将垃圾进行正确的投放分类，一直是一个难题。本程序通过图像识别获取垃圾名称，极大的简化了用户的操作。
		</view>
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
	.text {
		padding: 10rpx 40rpx;
		color: $u-content-color;
		font-size: 32rpx;
		line-height: 1.8;
		text-indent: 2em;
	}
</style>
