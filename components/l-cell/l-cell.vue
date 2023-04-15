<template>
	<view class="flex align-center justify-center mx-3">
		<view class="mr-3" v-if="leftIcon" >
			<u--image width="35rpx" height="40rpx" :src="getIcons" mode="widthFix"></u--image>
		</view>
		<view class="flex flex-column flex-1">
			<view class="flex flex-1 justify-between align-center py-3">
				<view class="font text-block">{{ title }}</view>
				<u--image width="20rpx" height="30rpx" :src="backIcons" mode="widthFix"></u--image>
			</view>
			<view v-if="isLine" class="line flex"></view>
		</view>
	</view>
</template>

<script>
	import { urlToBase64 } from '@/utils/base64Conver.js'
	export default {
		name:"l-cell",
		props: {
			leftIcon: {
				type: String,
			},
			title: {
				type: String,
				required: true
			},
			rightIcon: {
				type: String,
			},
			uuid: {
				type: [String, Number],
			},
			isLine: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			backIcons(){
				return urlToBase64(this.rightIcon)
			},
			getIcons() {
				return urlToBase64(this.leftIcon)
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
