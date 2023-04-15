<template>
	<view class="main">
		<view class="fixed-top">
			<u-status-bar />
			<view class="flex justify-between align-center main__header" :style="{height: $u.addUnit($u.getPx(44))}">
				<view class="ml-3" @click="back">
					<u-icon color="#ffffff" name="arrow-left"></u-icon>
				</view>
				<view class="text-white main__header-title">作品详情</view>
				<view class="mr-3"></view>
			</view>
		</view>
		<view class="main__content w-100 h-100">
			<image class="w-100 h-100" src="../../static/bg.png"></image>
		</view>
		<u-popup :show="show" :overlay="false" :round="20" mode="bottom">
			<view :style="{height: $u.addUnit($u.getPx(height))}">
				<view class="flex justify-center align-center" @click="open">
					<view class="popup__move"></view>
				</view>
				<view class="popup__content mx-4">
					<view class="popup__content__title">通州燃灯塔吉运门铃</view>
					<view class="popup__content__sub">文汇京津际（北京）文化产业发展有限公司</view>
					<template v-if="isUp">
						<view class="popup__content__pro">作品简介</view>
						<view class="popup__content__dec">燃灯佛舍利塔--萦绕千年的叮铃声
							燃灯佛舍利塔始建于北周时期，距今已有一千四百多年历史，它是通州最古老、最著名的古塔，也是运河岸边标志性建筑。燃灯塔每层每檐每角都悬有铜制风铃，全塔悬挂铜铃两千余枚,属燃灯塔七绝之一。铜铃都是各个朝代的善男信女所捐赠，声声悠扬，祈福平安吉祥。
							燃灯塔吉运门铃外形依照古塔门形设计，燃灯塔原比例微缩容纳于实木龛内，黄铜雕刻，精工细作，铜铃巧妙与木龛结合，铃碗朝上、铃珠悬于碗内代指供奉之意。每一次开门都仿佛得到佛塔的护佑，悦耳的叮铃声，满满的幸福感。
						</view>
					</template>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				height: 140,
				isUp: false
			}
		},
		onLoad() {
			setTimeout(() => {
				this.show = true
			}, 200)
		},
		methods: {
			open() {
				if (this.isUp) {
					this.isUp = false
					this.height = 140
				} else {
					this.isUp = true
					this.height = uni.$u.sys().screenHeight - uni.$u.sys().statusBarHeight - 44
				}
			},
			back() {
				this.show = false
				setTimeout(() => {
					uni.navigateBack()
				}, 200)
			}
		}
	}
</script>

<style scoped lang="scss">
	.main {
		width: 100%;
		height: 100%;
		overflow: hidden;

		&__header {
			background-color: transparent;

			&-title {
				font-size: 16px;
			}
		}
	}

	.popup__move {
		margin-top: 15px;
		margin-bottom: 40px;
		height: 5px;
		width: 50px;
		background-color: #bcbcbc;
		border-radius: 100rpx;

	}

	.popup__content {
		&__title {
			font-size: 40rpx;
			font-family: SourceHanSerifCN-Heavy, SourceHanSerifCN;
			font-weight: 800;
			color: #333333;
			line-height: 58rpx;
			margin-bottom: 30rpx;
		}

		&__sub {
			margin-bottom: 60rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #666666;
			line-height: 40rpx;
		}

		&__pro {
			margin-bottom: 40rpx;
			font-size: 40rpx;
			font-family: SourceHanSerifCN-Heavy, SourceHanSerifCN;
			font-weight: 800;
			color: #333333;
			line-height: 58rpx;
		}

		&__dec {
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 40rpx;
		}

	}
</style>