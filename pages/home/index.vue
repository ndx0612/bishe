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
						<!-- <u-loadmore :status="status" @click="loadMoredata" /> -->
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
