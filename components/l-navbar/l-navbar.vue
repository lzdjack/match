<template>
	<u-navbar 
		:bgColor="bgColor" 
		:title="title" 
		:leftText="leftText" 
		:leftIcon="leftIcon" 
		:rightText="rightText" 
		:rightIcon="rightIcon" 
		:autoBack="autoBack" 
		:placeholder="placeholder"
	>
		<template  #left>
			<slot v-if="isLeft" name="left">123 </slot>
		</template>
		
		<template #center >
			<slot name="center "></slot>
		</template>
		<template  #right>
		  <slot v-if="isRight" name="right">
		      <view v-if="isRefreshIcon" class="pr-4" @tap="reload">
		        <u-icon name="reload" :color="rightIconColor" size="38"></u-icon>
		      </view>
		  </slot>
		</template>
	</u-navbar>
</template>

<script>
export default {
  name: "l-navbar",
  props: {
    isRefreshIcon: {
      type: Boolean,
      default: false,
    },
	isRight: {
	  type: Boolean,
	  default: false,
	},
    isLeft: {
      type: Boolean,
      default: false,
    },
    rightIconColor: {
      type: String,
      default: "#ffffff",
    },
    autoBack: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "#ffffff",
    },
	leftText: {
		type: String,
	},
	leftIcon: {
		type: String,
		default: 'arrow-left'
	},
	rightText: {
		type: String,
	},
	rightIcon: {
		type: String
	},
	placeholder: {
		type: Boolean,
		default: true
	}
  },
  methods: {
    reload() {
      this.$emit("reload");
    },
  },
};
</script>

<style></style>
