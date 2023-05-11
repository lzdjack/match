<template>
  <view class="">
    <u--image
      :showLoading="true"
      :lazy-load="true"
      :src="content['image']"
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
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss"></style>
