<template>
	<view class="bg-white rounded-lg" :class="customClass">
		<view v-for="(item,index) in list" :key="index"  @tap="handleClick(item, index)">
			<l-cell
				:isLine="hasLine(index)"
				:leftIcon="item.leftIcon"
				:title="item.title"
				:rightIcon="item.rightIcon"
				:uuid="item.uuid"
				></l-cell>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"l-list",
		props: {
			list: {
				type: Array,
				default: []
			},
			customClass: {
				type: [Array, String],
			}
		},
		
		data() {
			return {
				
			};
		},
		methods:{
			hasLine(index) {
				if(this.list && ((this.list.length -1) != index)){
					return true
				}else {
					return false
				}
			},
			handleClick(item, index) {
				this.$emit('click', {
					...item,
					index
				})
			}
		}
		
	}
</script>
