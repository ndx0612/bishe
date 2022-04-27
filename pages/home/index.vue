<template>
	<view class="content">
		<u-tabs class="tabs" :is-scroll="false" :list="list" :current="activeIndex" @change="change" :duration='0.3'
			active-color="#0faeff">
		</u-tabs>
		<view class="swiper">
			<swiper class="swiper-container" :current="activeIndex" @change="changeCurrentIndex">
				<swiper-item v-for="(item,index) in list" :key="index">
					<!-- 滚动区域 -->
					<scroll-view class="swiper-container-list" scroll-y="true">
						<!-- {{item.name}} -->
						<NewsCard :newsList="news" v-if="index==0"></NewsCard>
						<RecommendedNews :newsList="news" v-if="index==1"></RecommendedNews>
						<TianData :newsList="tianData" v-if="index==0"></TianData>
						<view v-if="index==2">
							<view class="card" v-for="(item,index) in cards" :key="index">
								<view class="card-title">
									{{item.name}}
								</view>
								<view class="card-line"></view>
								<view class="card-text">
									{{item.instructions}}
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '最新',
				}, {
					name: '推荐',
				}, {
					name: '环保百科',
				}],
				activeIndex: 0,
				news: [],
				tianData: [],
				page: 1,
				status: 'loadmore',
				cards: [{
						name: "可回收垃圾",
						instructions: "指再生利用价值较高，能进入废品回收渠道的垃圾，纸类(报纸、传单、杂志、旧书、纸板箱及其它未受污染的纸制品等)、金属(铁、铜、铝等制品)、玻璃(玻璃瓶罐、平板玻璃及其他玻璃制品)",
					},
					{
						name: "有害垃圾",
						instructions: "含有有毒有害化学物质的垃圾。主要包括：电池(蓄电池、钮扣电池等)、废旧电子产品、废旧灯管灯泡、过期药品、过期日用化妆品、染发剂、杀虫剂容器、除草剂容器。有害垃圾主要的处理途径：安全填埋、焚烧。",
					},
					{
						name: "厨余垃圾",
						instructions: "厨房产生的食物类垃圾以及果皮等。主要包括：剩菜剩饭与西餐糕点等食物残余、菜梗菜叶、动物骨骼内脏、茶叶渣、水果残余、果壳瓜皮、盆景等植物的残枝落叶、废弃食用油等。 厨余垃圾主要的处理途径：堆肥、制作饲料。",
					},
					{
						name: "其它垃圾",
						instructions: "主要包括：受污染与无法再生的纸张(纸杯、照片、相册、尿片等)。受污染或其他不可回收的玻璃、废旧衣物与其他纺织品、破旧陶瓷品、一次性餐具、贝壳、烟头、灰土等。其它垃圾主要的处理途径：可燃部分焚烧发电，不可燃部分卫生填埋",
					},
				],
				
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name: 'getNews',
				success: (res) => {
					// console.log(res.result.data)
					this.news = res.result.data;
				}
			});
			this.getTiandata()
		},
		methods: {
			change(index) {
				this.activeIndex = index;
			},
			changeCurrentIndex(e) {
				const {
					current
				} = e.detail;
				this.activeIndex = current;
			},
			getTiandata() {
				this.$u.get('http://api.tianapi.com/lajifenleinews/index', {
					// 发送参数可以不填写
					key: 'c498f8d96e8d9ad2368513957311caf3',
					num: 20,
					page: this.page
				}).then(res => {
					console.log(res);
					this.tianData = res.newslist;
				});
			},
			loadMoredata() {
				console.log('123')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		margin: 30rpx auto;
		width: 700rpx;
		height: 550rpx;
		background: #FFFFFF;
		box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
		border-radius: 4px;
		border: 1px solid #E4E7ED;
		display: flex;
		flex-direction: column;

		.card-title {
			text-align: center;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 40rpx;
		}

		.card-line {
			width: 100%;
			height: 2rpx;
			background: #E4E7ED;
		}

		.card-text {
			padding: 40rpx;
			color: $u-content-color;
			font-size: 32rpx;
			line-height: 1.8;
			text-indent: 2em;
		}
	}

	page {
		height: 100%;
		// display: flex;
	}

	.content {
		// background-color: #2979FF;
		overflow: hidden;
		flex: 1;
		height: 100%;
		display: flex;
		box-sizing: border-box;
		justify-content: flex-start;
		flex-direction: column;
	}

	.swiper {
		// background-color: #2979FF;
		display: flex;
		flex-direction: column;
		flex: 1;

		.swiper-container {
			// background-color: #2979FF;
			height: calc(100vh - (var(--status-bar-height)) - 90px);
			flex: 1;

			.swiper-container-list {
				height: 100%;
			}
		}
	}
</style>
