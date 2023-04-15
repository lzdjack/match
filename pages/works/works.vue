<template>
	<view class="flex flex-1 h-100 w-100">
		<z-paging ref="paging" v-model="dataList" @query="queryList">
			<template #top>
				<u-navbar leftIcon=" " placeholder title="往期作品"></u-navbar>
				<u-tabs :list="tabs" :itemStyle="{backgroundColor : '#ffffff',height: '44px'  }" :scrollable="false"
					@click="handleClick"></u-tabs>
			</template>
			<view class="flex flex-wrap mx-4">
				<view v-for="(item, index) in dataList" :key="index">
					<list-item :item="item" :index="index" @click="goTo"></list-item>
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import ListItem from './list-item.vue'
	export default {
		components: {
			ListItem
		},
		data() {
			return {
				dataList: [{
						title: '大运河拼图剪纸系列',
						url: 'https://cdn.uviewui.com/uview/album/1.jpg'
					},
					{
						title: '大运河拼图剪纸系列',
						url: 'https://cdn.uviewui.com/uview/album/1.jpg'
					},
					{
						title: '大运河拼图剪纸系列',
						url: 'https://cdn.uviewui.com/uview/album/1.jpg'
					},
					{
						title: '大运河拼图剪纸系列',
						url: 'https://cdn.uviewui.com/uview/album/1.jpg'
					},
				],
				tabs: [{
					name: '文创作品'
				}, {
					name: '大学生作品'
				}],
				tabIndex: '文创作品'
			}
		},
		onLoad() {

		},
		methods: {
			goTo() {
				uni.navigateTo({
					url: '/pages/works-detail/works-detail'
				})
			},
			handleClick(arg) {
				this.tabIndex = arg.name
			},
			async queryList(pageNo, pageSize) {
				try {
					// const res = await getAllOrderApi(this.getOpenId);

					this.$refs.paging.complete(this.dataList);
				} catch (e) {
					this.$refs.paging.complete(false);
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>