<template>
	<view class="main">
		<view class="main__background"></view>
		<view class="main__content" :style="customBarStyle">
			<view class="main__content__card">
				<image class="main__content__card__image" src="../../static/top.png"></image>
			</view>
			<view class="main__content__time">
				<image class="main__content__time__image" src="../../static/time.png"></image>
			</view>
			<view class="main__content__intro">
				<view class="font-lg font-weight-bold main__content__intro-line main__content__intro__title">大赛介绍</view>
				<view class="flex-column justify-center align-center font main__content__intro-block">
					<view class="text-center main__content__intro-line font font-weight-normal">悠悠运河，流淌千年， </view>
					<view class="text-center main__content__intro-line font font-weight-normal">孕育了博大精深的大运河文化</view>
					<view class="text-center main__content__intro-line font font-weight-normal"> 第三届大运河文化创新创意设计大赛</view>
					<view class="text-center main__content__intro-line font font-weight-normal">以“创意，应‘运’而生”为主题</view>
					<view class="text-center main__content__intro-line font font-weight-normal">开设六大赛道，广泛邀请设计爱好者和设计单位
					</view>
					<view class="text-center main__content__intro-line font font-weight-normal">围绕运河文化进行创意设计</view>
					<view class="text-center main__content__intro-line font font-weight-normal">以文创精神激荡历史长河</view>
					<view class="text-center main__content__intro-line font font-weight-normal">让悠久的运河文化融入当代美好生活！</view>
					<view class="text-center main__content__intro-line font font-weight-normal">奖金总额120万元人民币</view>
				</view>
			</view>
			<view class="main__content__org">
				<view class="font-lg font-weight-bold main__content__org__title">组织机构</view>

				<image class="main__content__org__image" src="../../static/org.png"></image>
			</view>
			<view class="main__content__match">
				<view class="font-lg font-weight-bold main__content__match__title">比赛时间</view>

				<image class="main__content__match__image" src="../../static/match.png"></image>
			</view>
			<view class="main__content__track">
				<view class="font-lg font-weight-bold main__content__track__title">六大赛道</view>

				<u-tabs :list="tablist" @click="handleClick"></u-tabs>
				<TabItem :content="tabItem" />
			</view>
			<view class="main__content__design">
				<view class="font-lg font-weight-bold main__content__design__title">设计内容</view>
				<view class="flex justify-between align-center">
					<view class="flex-column align-center justify-center">
						<image class="main__content__design-image" src="../../static/design1.png"></image>
						<view class="text-center mt-2">产品设计类</view>
					</view>
					<view class="flex-column align-center justify-center">
						<image class="main__content__design-image" src="../../static/design2.png"></image>
						<view class="text-center mt-2">平面设计类</view>
					</view>
					<view class="flex-column align-center justify-center">
						<image class="main__content__design-image" src="../../static/design3.png"></image>
						<view class="text-center mt-2">数字文创设计类</view>
					</view>
				</view>
			</view>
			<view class="main__content__review">
				<view class="font-lg font-weight-bold main__content__review__title">评审标准</view>
				<scroll-view class="main__content__review__scroll" scroll-x="true" scroll-left="120">
					<view class="main__content__review-image mr-2">
						<image class="w-100 h-100" src="../../static/review1.png"></image>
					</view>
					<view class="main__content__review-image mr-2">
						<image class="w-100 h-100" src="../../static/review2.png"></image>
					</view>
					<view class="main__content__review-image mr-2">
						<image class="w-100 h-100" src="../../static/review3.png"></image>
					</view>
					<view class="main__content__review-image mr-2">
						<image class="w-100 h-100" src="../../static/review4.png"></image>
					</view>
					<view class="main__content__review-image">
						<image class="w-100 h-100" src="../../static/review5.png"></image>
					</view>
				</scroll-view>
			</view>

			<view class="main__content__notice">
				<view class="font-lg font-weight-bold main__content__notice__title">参赛须知</view>
				<view class="p-4 main__content__notice-block">
					<view class="text-center mb-2 main__content__notice-title">报名要求</view>
					<u-read-more ref="uReadMore" :toggle="true" :showHeight="80" closeText=" " :font-size="12"
						open-text=" " color="#BBBBBB" :shadowStyle="shadowStyle">
						<view class="main__content__notice-content">
							<u-parse :content="content" @load="load"></u-parse>
						</view>
					</u-read-more>
				</view>
				<view class="p-4 mt-2 main__content__notice-block">
					<view class="text-center mb-2 main__content__notice-title">作品要求</view>
					<u-read-more ref="uReadMore" :toggle="true" :showHeight="80" closeText=" " :font-size="12"
						open-text=" " color="#BBBBBB" :shadowStyle="shadowStyle">
						<view class="main__content__notice-content">
							<u-parse :content="content" @load="load"></u-parse>
						</view>
					</u-read-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import TabItem from './tab-content.vue'
	export default {
		components: {
			TabItem
		},
		data() {
			return {
				customBar: 0,
				tablist: [{
						name: '大运河文化旅游景区',
						content: [{
							title: '这是一个标题',
							image: '../../static/match.png'
						}]
					}, {
						name: '数字文创',
						content: [{
							title: '这是一个标题',
							image: '../../static/org.png'
						}]
					},
					{
						name: '副中心公共文化',
						content: [{
							title: '这是一个标题',
							image: '../../static/match.png'
						}]
					}
				],
				tabItem: [{
					title: '这是一个标题',
					image: '../../static/match.png'
				}],
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
								苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
								无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
								苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
								无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
				shadowStyle: {
					backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgb(245 250 255 / 1) 80%)",
					paddingTop: "100px",
					marginTop: "-100px",
				}
			}
		},
		computed: {
			customBarStyle() {
				return `margin-top: ${this.customBar}px`
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: (e) => {
					const statusBar = e.statusBarHeight;
					const custom = wx.getMenuButtonBoundingClientRect()
					this.customBar = custom.bottom + custom.top - e.statusBarHeight
				}
			})
		},
		methods: {
			handleClick({
				content
			}) {
				this.tabItem = content
			},
			load() {
				this.$refs.uReadMore.init();
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		&__background {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background: linear-gradient(180deg, #0546D6 0%, rgba(5, 70, 214, 0) 100%);
			width: 750rpx;
			height: 700rpx;
		}

		&__content {
			margin: 34rpx;

			&__card {
				&__image {
					height: 638rpx;
					width: 100%;
				}
			}

			&__time {
				margin-top: 20rpx;

				&__image {
					height: 902rpx;
					width: 100%;
				}
			}

			&__intro {

				&__title {
					margin-top: 80rpx;
					margin-bottom: 40rpx;
				}

				&-block {
					padding: 40rpx 0;
					background: #F5FAFF;
					border-radius: 16rpx;
				}

				&-line {
					line-height: 54rpx;
				}
			}

			&__org {

				&__image {
					height: 380rpx;
					width: 100%;
				}

				&__title {
					margin-top: 100rpx;
					margin-bottom: 40rpx;
					line-height: 56rpx;
				}
			}

			&__match {

				&__title {
					margin-top: 80rpx;
					margin-bottom: 40rpx;
					line-height: 56rpx;
				}

				&__image {
					height: 236rpx;
					width: 100%;
				}
			}

			&__track {

				&__title {
					margin-top: 80rpx;
					margin-bottom: 40rpx;
					line-height: 56rpx;
				}

				&__image {
					height: 236rpx;
					width: 100%;
				}
			}

			&__design {

				&__title {
					margin-top: 80rpx;
					margin-bottom: 40rpx;
					line-height: 56rpx;
				}

				&-image {
					width: 210rpx;
					height: 210rpx;
				}
			}

			&__review {

				&__title {
					margin-top: 80rpx;
					margin-bottom: 40rpx;
					line-height: 56rpx;
				}

				&__scroll {
					white-space: nowrap;
					width: 100%;
				}

				&-image {
					width: 504rpx;
					height: 252rpx;
					display: inline-block;
				}
			}

			&__notice {

				&-block {
					background: #F5FAFF;
					border-radius: 16rpx;
				}

				&__title {
					margin-top: 80rpx;
					margin-bottom: 40rpx;
					line-height: 56rpx;
				}

				&-title {
					color: #0B164F;
					font-size: 32rpx;
					font-weight: 900;
					line-height: 44rpx;
				}

				&-content {
					font-size: 28rpx;
					color: #0B164F;
					line-height: 40rpx;
					font-weight: 400;
				}
			}
		}
	}
</style>