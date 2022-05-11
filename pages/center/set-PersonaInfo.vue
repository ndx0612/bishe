<template>
	<view class="form-info">

		<u-form class="form-info" :model="form" ref="uForm" :label-width='160' label-align='center'>
			<u-form-item label="登录账号">
				<u-input v-model="form.id" disabled />
			</u-form-item>
			<u-form-item label="用户名">
				<u-input v-model="form.name" />
			</u-form-item>
			<u-form-item label="分 数">
				<u-input v-model="form.score" disabled />
			</u-form-item>
			<u-form-item label="性 别">
				<u-radio-group v-model="form.value" @change="radioGroupChange">
					<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name"
						:disabled="item.disabled">
						{{item.name}}
					</u-radio>
				</u-radio-group>
			</u-form-item>
		</u-form>
		<view class="save-button">
			<u-button type="primary" @click="save">保存</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					id: '', // 登录账号
					name: '', // 用户名
					score: '', // 分数
					value: '男',
				},
				list: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					},
				],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
			};
		},
		onLoad() {
			uniCloud.callFunction({
				name: 'get_personInfo',
				data: {
					id: this.vuex_userId
				},
				success: (res) => {
					console.log(res)
					this.form.id = res.result.data[0].loginName;
					this.form.name = res.result.data[0].author_name;
					this.form.score = res.result.data[0].score;
					this.form.value = res.result.data[0].gender;
				}
			})
		},
		methods: {
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				this.form.value = e
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				this.form.value = e
			},
			save() {
				console.log(this.form)
				this.$u.vuex('vuex_userName', this.form.name); // 将成绩存入vuex中
				uniCloud.callFunction({
					name: 'change_PersonInfo',
					data: {
						form: this.form,
						id: this.vuex_userId
					},
					success: (res) => {
						console.log(res)
						this.$refs.uToast.show({
							title: '信息修改成功',
							type: 'success',
						})
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.form-info {
		padding: 20rpx;
	}

	.save-button {
		width: 500rpx;
		margin: 40rpx auto;
	}
</style>
