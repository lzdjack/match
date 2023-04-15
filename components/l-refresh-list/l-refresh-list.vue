<template>
	<view class="wrap">
		<u-sticky :bgColor="tabBgColor" :customNavHeight="getSticky">
			<u-tabs  :activeStyle="{ color: activeColor }" :lineColor="activeColor" :list="tabs" :current="current" :scrollable="isTabScroll" @change="change"></u-tabs>
		</u-sticky>
		<swiper class="swiper-box" :style="[getSwiper]" :current="current" @change="changeSwiper" :disable-touch="!isTab">
			<swiper-item class="swiper-item" v-for="(item, index) in orderList" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
					<l-page-status :status="pageStatus[index]">
						<view class="page-box">
							<view v-for="order in item" :key="order.id"><slot :order="order" :column="columns[index]" :tab="tabs[index]" :current="index"></slot></view>
							<u-loadmore v-if="pageStatus[index] == 1 && loadStatus[index] != 'nomore'" :status="loadStatus[index]" ></u-loadmore>
						</view>
					</l-page-status>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import { isArray } from '@/utils/is.js';
export default {
	props: {
		tabs: {
			type: Array,
			default: () => []
		},
		defaultCurrent: {
			type: Number,
			default: 0
		},
		isTab: {
			type: Boolean,
			default: true
		},
		immediate: {
			type: Boolean,
			default: true
		},
		limit: {
			type: Number,
			default: 5
		},
		isTabScroll: {
			type: Boolean,
			default: true
		},
		activeColor: {
			type: String,
			default: '#1c8fba'
		},
		tabBgColor: {
			type: String,
			default: '#fff'
		},
		columns: {
			type: Array,
			default: () => []
		},
		barHeight: {
			type: Number,
			default: 44
		}
	},
	data() {
		return {
			orderList: [],
			pageStatus: [],
			loadStatus: [],
			loadPages: [],
			current: 0
		};
	},
	mounted() {
		this.pageStatus = Array.from({ length: this.getTabsLength }, () => 0);
		this.orderList = Array.from({ length: this.getTabsLength }, () => []);
		this.loadStatus = Array.from({ length: this.getTabsLength }, () => 'loadmore');
		this.loadPages = Array.from({ length: this.getTabsLength }, () => ({ page: 1, limit: this.limit }));
		this.current = this.defaultCurrent;

		if (this.immediate) {
			this.getOrderList(this.current, this.loadPages[this.current]);
		}
	},
	computed: {
		getSticky() {
			return this.$u.addUnit(this.$u.getPx(this.barHeight) + this.$u.sys().statusBarHeight);
		},
		getSwiper() {
			// #ifdef H5
			return { 'margin-top': this.$u.addUnit(this.$u.getPx(this.barHeight)) };
			// #endif
			// #ifndef H5
			const height = this.barHeight * 2;
			return {
				height: `calc(100vh - ${this.$u.addUnit(this.$u.getPx(height) + this.$u.sys().statusBarHeight)})`,
				marginTop: this.$u.addUnit(this.$u.getPx(height))
			};
			// #endif
		},
		getTabsLength() {
			return this.tabs && this.tabs.length > 0 ? this.tabs.length : 1;
		},
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	methods: {
		reachBottom() {
			//数据不满一页， 禁止再次上拉加载
			if (this.loadStatus[this.current] == 'nomore') {
				return;
			}
			this.loadPages[this.current].page++;
			this.getOrderList(this.current, this.loadPages[this.current]);
		},
		// 页面数据
		getOrderList(idx, pages, source) {
			//请求加载初始化给定正在加载loading
			this.loadStatus.splice(idx, 1, 'loading');

			//当数据列表为空时，给个正在加载页面显示
			//查询前的等待logo动画
			if (this.orderList[idx].length == 0) {
				this.pageStatus.splice(idx, 1, 5);
			}
			this.$emit('getOrderList', { current: idx, page: pages, tab: this.tabs[idx] }, (data, error) => {
				if (error == 2) {
					this.pageStatus.splice(idx, 1, 2);
					return;
				} else if (error == 3) {
					this.pageStatus.splice(idx, 1, 3);
					return;
				} else if (error == 4) {
					this.pageStatus.splice(idx, 1, 4);
					return;
				} else if (error) {
					this.pageStatus.splice(idx, 1, 6);
					return;
				}
				// 如果是刷新状态， 删除数组全部数据，重新追加
				if (source == 'reload') {
					this.orderList.splice(idx, 1, []);
				}

				if (data && isArray(data)) {
					//得到的数据没有大于给定的数量，说明数据不够，所以判定下一页数据为空，因此没有必要在查询下一页数据		
		 //这里依次修改下状态，“没有更多数据了”
					if (data.length < this.limit && this.loadPages[idx].page > 0) {
						this.loadPages[idx].page--;
						this.loadStatus.splice(idx, 1, 'nomore');
					}

					//把查询到的数据依次保存到列表，有可能不满一页
					data.forEach(item => {
						this.orderList[idx].push(item);
					});
				}

				//查询结束，数据整理后数据为空，那么显示为空页面
				if (this.orderList[idx].length == 0) {
					this.loadStatus.splice(idx, 1, 'nomore');
					this.pageStatus.splice(idx, 1, 0);
				} else {
					//以上都排除为显示正常页面
					this.loadStatus.splice(idx, 1, 'loadmore');
					this.pageStatus.splice(idx, 1, 1);
				}
			});
		},
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		// tab栏切换
		change({ index }) {
			this.current = index;
		},
		changeSwiper({ detail: { current } }) {
			this.current = current;
		}
	},
	watch: {
		current(newValue, oldValue) {
			console.log('变化了：：：', newValue);
			if (this.orderList[newValue] && this.orderList[newValue]?.length > 0) return;
			console.log('执行了：：：', newValue);
			const page = this.loadPages[newValue];
			this.getOrderList(newValue, page);
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	width: 750rpx;
	height: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>
