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
							<u-parse :content="worksContent" @load="load"></u-parse>
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
				content: `1.参赛机构或个人于大赛官网www.tgcid.org注册参赛，经组委会审核通过后进入大赛流程。大赛全程将为参赛机构和人员提供人工咨询和技术支持（也可关注官方微信服务号：大运河文化遗产文创发展联盟）。</br> 
						2.报名参赛在提交作品前请确保已经阅读并且愿意遵守相关活动规则，任何违反活动规则的作品，主办方有权取消其活动资格。 </br>
						3.如多人合作，需征得所有合作者同意并标明所有合作者姓名。`,
				worksContent: `
				1.作品需契合大赛主题，设计元素必须与运河及运河沿线文化有关，并满足设计需求单位的作品要求。</br> 
				2. 作品上传需包含设计图、 效果图、 设计源文件， 及设计说明（ 包括不少于200字的创作说明、 量产说明、 成本与终端售价设定、 客户分析及其他说明等）。 图片格式报送JPG /
				PNG格式文件； 分辨率300dpi； 设计图尺寸210mm（ 宽）× 297 mm（ 高）。</br>
				3. 产品效果图要求多角度， 能体现作品原貌， 并标注作品尺寸（ 长× 宽× 高cm）。</br>
				4. 数字文创设计组中数字装置艺术、 虚拟人、 元宇宙3D虚拟场景、 景区AR / VR导览等作品如有视频文件， 视频格式报送MP4 / MOV格式文件； 横版； 分辨率不低于1920 *
				1080； 时长在3分钟以内。</br>
				5． 参赛作品需契合大赛主题， 定制设计需符合设计需求方的设计需求， 能够展示设计需求方的品牌或文化内涵以及市场价值等。</br>
				6． 参赛作品可量产， 可被工业化设备制造。</br>
				7． 参赛者应保证设计作品内容中不含有：</br>
				（1） 违反国家法律法规、 危害国家安全统一、 破坏社会稳定、 违反公序良俗以及侮辱、 诽谤、 淫秽或含有任何性或性暗示的、 暴力的内容；</br>
				（2） 侵害他人名誉权、 肖像权、 知识产权、 商业秘密等合法权利的内容；</br>
				（3） 涉及他人隐私、 个人信息或资料的内容；</br>
				（4） 骚扰、 广告信息及垃圾信息；</br>
				（5） 境外电视台， 境外制作公司的台标等logo；</br>
				（6） 恶意虚构事实、 隐瞒真相以误导、 欺骗他人的内容；</br>
				（7） 其他违反法律法规、 政策及公序良俗、 社会公德或侵犯其他用户或第三方合法权益内容的信息。</br>
				一旦发现参赛作品中含有前述内容， 主办方有权不经通知随时删除上述内容， 取缔参赛资格。 如因设计内容违反相关要求， 导致相关国家机关或机构提起诉讼、 罚款或采取其他行政制裁措施或者导致任何第三方受到损害的， 参赛者应当承担全部责任； 主办方或第三方因此遭受损失的， 参赛者也应一并赔偿。</br>
				8． 参赛作品必须是原创作品， 曾经参加过国家级、 省级同类活动并获奖的作品不予评奖。</br>
				9． 参赛选手参赛作品经大赛评审获奖并领取奖金的， 该作品著作权由需求方和参赛选手共同享有， 参赛选手享有该作品的署名权， 需求方享有除署名权之外的其他著作权权利。</br>
				10．参赛选手参赛作品未获奖的， 该作品著作权归参赛选手所有， 大赛主办方对所有参赛和获奖作品享有展览展示的权利。 `,
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