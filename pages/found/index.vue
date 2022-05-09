<template>
	<view>
		<view class="question-box">
			<view class="text">
				<text>{{goodsIndex+1}}.{{goods[goodsIndex]}}属于什么类型垃圾？</text>
			</view>
			<view>
				<u-radio-group class="question-options" v-model="value" @change="radioGroupChange">
					<u-radio class="question-li" @change="radioChange" v-for="(item, index) in list" :key="index"
						:name="item.name" :disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</view>
			<view class="next-li">
				<u-button type="success" @click="nextProblem">{{nextQuestion}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '可回收物',
						disabled: false
					},
					{
						name: '有害垃圾',
						disabled: false
					},
					{
						name: '厨余垃圾',
						disabled: false
					},
					{
						name: '其他垃圾',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				value: '',
				goods: ['书本', '报纸', '铝', '啤酒瓶', '纸巾', '塑料瓶', '易拉罐', '玻璃', '废铁', 'A4纸'],
				goodsIndex: 0,
				score: 0,
				nextQuestion: '下一题',
			};
		},
		methods: {
			modifyVuex() {
				this.$refs.uToast.show({
					title: '密码修改成功',
					type: 'success',
				})
				// const currentNum = Math.random().toString().substr(2, 6);
				// console.log(this.vuex_userId)
				// console.log(currentNum)
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			},
			nextProblem() {
				// 第九题的时候变成提交
				if (this.goodsIndex >= 8) {
					this.nextQuestion = '提交'
					// 提交分数跳转页面
					if (this.goodsIndex >= 9) {
						this.$u.vuex('vuex_score', this.score); // 将成绩存入vuex中
						this.goodsIndex = 0;
						this.score = 0;
						this.value = '';
						uni.navigateTo({
							url: "/pages/found/showScore",
						});
						return;
					}
				}
				if (this.value == '可回收物') {
					this.goodsIndex++;
					this.value = '';
					this.score += 10;
				} else {
					this.goodsIndex++;
					this.value = '';
				}
				console.log(this.score)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text {
		font-size: 32rpx;
		text-align: center;
	}


	.question-box {
		width: 600rpx;
		height: 800rpx;
		border: solid 2rpx #0FAEFF;
		margin: 100rpx auto;
		border-radius: 5rpx;
		padding: 30rpx;

		.question-options {
			display: flex;
			flex-direction: column;
			width: 300rpx;
			height: 300rpx;
			justify-content: space-around;
		}

		.next-li {
			margin: 30rpx auto;
			width: 500rpx;
		}
	}
</style>
