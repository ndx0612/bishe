<template>
	<view>
		<view class="showTable">
			<u-table>
				<u-tr>
					<u-th>名称</u-th>
					<u-th>分类</u-th>
				</u-tr>
				<u-tr v-for="(item,index) in showDate">
					<u-td>{{item.garbageName}}</u-td>
					<u-td>{{item.categroyName}}</u-td>
				</u-tr>
			</u-table>
		</view>
	</view>
</template>

<script>
	const searchGarbage = require('@/utils/garbage-search.js');
	export default {
		data() {
			return {
				showDate: [], // 垃圾分类数据
			};
		},
		onLoad(params) {
			let that = this;
			// 匹配JSON中的数据
			searchGarbage.search(params.keyword, function success(res) {
				that.showDate = res;
				// console.log(that.showDate)
			});
		}
	}
</script>

<style lang="scss">
	.showTable {
		padding: 50rpx;
	}
</style>
