<template>
  <view class="works-swiper">
    <view class="fixed-top">
      <u-status-bar />
      <view
        class="flex justify-between align-center works-swiper__header"
        :style="{ height: $u.addUnit($u.getPx(44)) }"
      >
        <view class="ml-3" @click="back">
          <u-icon color="#ffffff" name="arrow-left"></u-icon>
        </view>
        <view class="text-white works-swiper__header-title"
          >{{ currentIndex + 1 }}/{{ list.length }}</view
        >
        <view class="mr-3"></view>
      </view>
    </view>
    <movable-area
      scale-area
      class="works-swiper__wrapper__item__area h-100 w-100"
    >
      <movable-view
        class="w-100 h-100"
        :scale="true"
        direction="all"
        :scale-min="1"
        :scale-max="10"
      >
        <view
          class="works-swiper__wrapper__item__area__wrapper flex justify-center align-center h-100 w-100"
        >
          <u--image
            @touchend="dbclick"
            customClass="works-swiper__wrapper__item__area__wrapper__image"
            :showLoading="true"
            :lazy-load="true"
            :src="path"
            :fade="true"
            mode="aspectFill"
          ></u--image>
        </view>
      </movable-view>
    </movable-area>
    <!-- <swiper
      class="works-swiper__wrapper"
      @change="handleChange"
      :style="{
        height: $u.addUnit(height),
      }"
    >
      <swiper-item
        v-for="(item, index) in list"
        :key="index"
        class="works-swiper__wrapper__item"
      >
        <movable-area scale-area class="works-swiper__wrapper__item__area">
          <movable-view
            class="w-100 h-100"
            :scale="true"
            direction="all"
            :scale-min="1"
            :scale-max="10"
          >
            <view
              class="works-swiper__wrapper__item__area__wrapper flex justify-center align-center h-100 w-100"
            >
              <u--image
                customClass="works-swiper__wrapper__item__area__wrapper__image"
                :showLoading="true"
                :lazy-load="true"
                :src="path"
                :fade="true"
                mode="aspectFill"
              ></u--image>
            </view>
          </movable-view>
        </movable-area>
      </swiper-item>
    </swiper> -->
    <view class="works-swiper__indicator">
      <u-swiper-indicator
        :indicatorActiveColor="indicatorActiveColor"
        :indicatorInactiveColor="indicatorInactiveColor"
        :length="list.length"
        :current="currentIndex"
        :indicatorMode="indicatorMode"
      ></u-swiper-indicator>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      indicatorActiveColor: "#FFFFFF",
      indicatorInactiveColor: "rgba(255, 255, 255, 0.35)",
      currentIndex: 0,
      list: [1],
      indicatorMode: "line",
      height: 0,
      path: "",
      touchNum: 0,
    };
  },
  onLoad(e) {
    this.path = e.url ?? "";
    this.height = uni.$u.sys().screenHeight;
  },
  methods: {
    dbclick() {
      this.touchNum++;
      setTimeout(() => {
        if (this.touchNum >= 2) {
        }
        this.touchNum = 0;
      }, 250);
    },
    back() {
      uni.navigateBack();
    },
    handleChange(e) {
      this.currentIndex = e.detail.current;
    },
  },
};
</script>

<style lang="scss" scoped>
.works-swiper {
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 100%;

  &__header {
    background-color: transparent;

    &-title {
      font-size: 16px;
    }
  }

  &__wrapper {
    flex: 1;

    &__item {
      flex: 1;

      &__area {
        height: 100%;
        width: 100%;
        flex: 1;

        &__wrapper {
          display: flex;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
          flex: 1;

          &__image {
            flex: 1;
            width: 100%;
          }
        }
      }
    }
  }

  &__indicator {
    position: absolute;
    bottom: 10px;
  }
}
</style>
