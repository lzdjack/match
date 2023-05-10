<template>
  <view class="">
    <u--image
      :showLoading="true"
      :lazy-load="true"
      :src="content[0]['image']"
      width="100%"
      height="456rpx"
      :fade="true"
    ></u--image>
  </view>
</template>

<script>
export default {
  name: "tab-content",
  props: {
    content: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>
