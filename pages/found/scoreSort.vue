<template>
	<view class="content">
		<u-table>
			<u-tr>
				<u-th>名次</u-th>
				<u-th>用户名</u-th>
				<u-th>分数</u-th>
			</u-tr>
			<template v-for="(item,index) in showDate">
				<u-tr>
					<u-td>{{index+1}}</u-td>
					<u-td>{{item.author_name}}</u-td>
					<u-td>{{item.score}}</u-td>
				</u-tr>
			</template>
		</u-table>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showDate: []
			};
		},
		onLoad() {
			// 提交成绩
			let that = this;
			uniCloud.callFunction({
				name: 'get_ScoreSort',
				data: {},
				success: (res) => {
					this.showDate = that.sortObj(res.result.data,'score')
				}
			})
		},
		methods: {
			sortObj(object, option) {
				function compare(option) {
					return function(obj1, obj2) {
						var val1 = obj1[option];
						var val2 = obj2[option];
						if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
							val1 = Number(val1);
							val2 = Number(val2);
						}
						if (val1 > val2) {
							return -1;
						} else if (val1 < val2) {
							return 1;
						} else {
							return 0;
						}
					}
				}
				return object.sort(compare(option));
			}
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 30px;
	}
</style>
