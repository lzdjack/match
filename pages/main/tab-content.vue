<template>
	<view class="">
		<image :src="content[0]['image']"></image>
	</view>

</template>

<script>
	export default {
		name: 'tab-content',
		props: {
			content: {
				type: Array,
				required: true
			},
		}
	}
</script>

<style scoped lang="scss">
	image {
		height: 456rpx;
		width: 100%;
	}
</style>