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
		<view class="main__content w-100 h-100" @click="handleGo">
			<image class="w-100 h-100" :src="dataInfo.url"></image>
		</view>
		<u-popup :show="show" :overlay="false" :round="20" mode="bottom">
			<view :style="{height: $u.addUnit($u.getPx(height))}" @touchmove="handleMove">
				<view class="flex justify-center align-center" @click="open">
					<view class="popup__move"></view>
				</view>
				<view class="popup__content mx-4">
					<view class="popup__content__title">{{ dataInfo.title }}</view>
					<view class="popup__content__sub">{{ dataInfo.subTitle}}</view>
					<template v-if="isUp">
						<view class="popup__content__pro">作品简介</view>
						<view class="popup__content__dec">{{ dataInfo.description }}
						</view>
					</template>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		findByIdWorksDetailApi
	} from '@/api/api.js'
	import {
		isEmpty
	} from 'lodash-es'
	import {
		showLoading,
		hideLoading,
		showToast
	} from '@/utils/loading.js';
	export default {
		data() {
			return {
				id: null,
				show: false,
				height: 140,
				isUp: false,
				custom: {},
				dataInfo: {
					id: '',
					title: '',
					subTitle: '',
					description: '',
					url: ''
				}
			}
		},
		onLoad(e) {
			if (e && !isEmpty(e) && e.id) {
				this.id = e.id
			} else {
				showToast('数据异常');
			}

			this.custom = wx.getMenuButtonBoundingClientRect()
			setTimeout(() => {
				this.show = true
			}, 50)
			this.init()
		},
		methods: {
			async init() {
				try {
					showLoading();
					const res = await findByIdWorksDetailApi(this.id);

					hideLoading();
					if (isEmpty(res)) {
						showToast('数据异常');
					} else {
						const data = res[0];
						this.dataInfo = {
							id: data.Id,
							title: data.Enrollname,
							subTitle: data.Schoolname,
							description: data.Createnote,
							url: data.filenames
						}
					}
				} catch (e) {
					hideLoading();
					showToast('发生异常');
				}
			},
			open() {
				if (this.isUp) {
					this.isUp = false
					this.height = 140
				} else {
					this.isUp = true
					const customHeight = this.custom.bottom + this.custom.top - uni.$u.sys().statusBarHeight
					this.height = uni.$u.sys().screenHeight - customHeight - uni.$u.sys().safeAreaInsets.bottom
				}
			},
			back() {
				this.show = false
				setTimeout(() => {
					uni.navigateBack()
				}, 50)
			},
			handleGo() {
				uni.navigateTo({
					url: `/pages/works-detail/works-image?url=${this.dataInfo.url}`
				})
			},
			handleMove(e) {
				console.log('----------', e);
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