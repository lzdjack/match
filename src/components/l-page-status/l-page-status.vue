<template>
	<view class="h-100 w-100">
		<slot v-if="status == 1"></slot>
		<view v-else class="w-100 h-100 flex justify-center align-center">
			<view v-if="getMode == 'loading'" class="flex flex-column align-center justify-center">
				<u-loading-page  :loading="true"></u-loading-page>
			</view>
			<view v-else-if="getMode == 'error'" class="flex flex-column align-center justify-center">
				<view class="mt-2" style="letter-spacing: 1.5rpx">{{ getText }}</view>
			</view>
			<u-empty v-else :text="getText" :mode="getMode"></u-empty>
		</view>
	</view>
</template>

<script>
import { urlToBase64 } from '@/utils/base64Conver.js';
export default {
	name: 'l-page-status',
	props: {
		status: {
			type: Number,
			default: 0
		}
	},
	computed: {
		getText() {
			switch (this.status) {
				case 0:
					return '数据为空';
				case 2:
					return '没有WiFi';
				case 3:
					return '无权限';
				case 4:
					return '列表为空';
				case 5:
					return '正在加载';
				case 6:
					return '加载错误';
				default:
					return '数据为空';
			}
		},
		getMode() {
			switch (this.status) {
				case 0:
					return 'data';
				case 2:
					return 'wifi';
				case 3:
					return 'permission';
				case 4:
					return 'list';
				case 5:
					return 'loading';
				case 6:
					return 'error';
				default:
					return 'data';
			}
		}
	},
	methods: {
		getIcons(url) {
			return urlToBase64(url);
		}
	}
};
</script>

<style></style>
