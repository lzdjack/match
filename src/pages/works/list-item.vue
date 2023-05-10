<template>
  <view
    :class="[index % 2 == 0 ? 'mr-3' : '', 'content mt-4']"
    @click="handleClick"
  >
    <u--image
      :showLoading="true"
      :src="item.url"
      width="320rpx"
      height="290rpx"
      :lazy-load="true"
      mode="aspectFill"
    ></u--image>
    <view class="content__title">{{ item.title }}</view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleClick() {
      this.$emit("click", this.item);
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 320rpx;

  &__title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333333;
    line-height: 40rpx;
    margin-top: 16rpx;
  }
}
</style>
