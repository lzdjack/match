<template>
  <view class="main">
    <view class="fixed-top" @click="isUp && open()">
      <u-status-bar />
      <view
        class="flex justify-between align-center main__header"
        :style="{ height: $u.addUnit($u.getPx(44)) }"
      >
        <view class="ml-3" @click="back">
          <u-icon color="#ffffff" name="arrow-left"></u-icon>
        </view>
        <view class="text-white main__header-title">作品详情</view>
        <view class="mr-3"></view>
      </view>
    </view>
    <view
      class="position-relative w-100"
      :style="{ height: $u.addUnit($u.getPx(getImageHeight)) }"
    >
      <swiper
        class="w-100"
        :style="{ height: $u.addUnit($u.getPx(getImageHeight)) }"
        @change="handleChange"
      >
        <swiper-item
          v-for="(item, index) in dataInfo.urls"
          :key="index"
          class="w-100 h-100"
        >
          <view class="main__content w-100 h-100" @click="handleGo">
            <u--image
              width="100%"
              :height="$u.addUnit($u.getPx(getImageHeight))"
              :showLoading="true"
              :lazy-load="true"
              :src="item"
              :fade="true"
              mode="scaleToFill"
            ></u--image>
          </view>
        </swiper-item>
      </swiper>
      <view
        class="text-white position-absolute bottom-0 m-auto bg-transparent-black rounded-xxl px-3 py-1"
        style="right: 50rpx; bottom: 100rpx"
        >{{ currentIndex + 1 }}/{{ dataInfo.urls.length }}</view
      >
    </view>

    <u-popup :show="show" :overlay="false" :round="20" mode="bottom">
      <view
        class="popup-works"
        :style="{ height: $u.addUnit($u.getPx(height)) }"
        @click="open"
        @touchmove="handleMove"
        @touchend="handleEnd"
        @touchstart="handleStart"
      >
        <view class="popup__header">
          <view class="popup__move"></view>
        </view>
        <scroll-view
          scroll-y="true"
          :style="{ height: $u.addUnit($u.getPx(height - 50)) }"
        >
          <view class="popup__content mx-4">
            <view class="popup__content__title">{{ dataInfo.title }}</view>
            <view class="popup__content__sub">{{ dataInfo.subTitle }}</view>
            <view class="popup__content__pro">作品简介</view>
            <view class="popup__content__dec">{{ dataInfo.description }} </view>
          </view>
        </scroll-view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import { findByIdWorksDetailApi } from "@/api/api.js";
import { isEmpty } from "lodash-es";
import { showLoading, hideLoading, showToast } from "@/utils/loading.js";
const DEFINE_MODEL_HEIGHT = 280;
export default {
  data() {
    return {
      currentIndex: 0,
      id: null,
      show: false,
      // popup 最后的高度
      height: DEFINE_MODEL_HEIGHT,
      isUp: false,
      custom: {},
      // 手势滑动的高度
      currentHeight: 0,
      // 去除appbar和状态栏剩余的高度
      fullHeight: 0,
      // 半屏高度
      bScreenHeight: 0,
      // 屏幕高度
      screenHeight: 0,
      // 状态栏的高度
      statusBarHeight: 0,
      //
      topPopup: 0,
      bottomPopup: 0,
      maxPopupHeight: 0,
      // 默认的popup高度
      mixPopupHeight: DEFINE_MODEL_HEIGHT,
      aHeight: DEFINE_MODEL_HEIGHT,

      dataInfo: {
        id: "",
        title: "",
        subTitle: "",
        description: "",
        urls: [],
      },
    };
  },
  computed: {
    getImageHeight() {
      return (
        this.screenHeight -
        DEFINE_MODEL_HEIGHT -
        uni.$u.sys().safeAreaInsets.bottom +
        25
      );
    },
  },
  onLoad(e) {
    if (e && !isEmpty(e) && e.id) {
      this.id = e.id;
    } else {
      showToast("数据异常");
    }

    this.custom = wx.getMenuButtonBoundingClientRect();
    this.show = true;
    this.handleDefaultData();
    this.init();
  },
  methods: {
    async init() {
      try {
        showLoading();
        const res = await findByIdWorksDetailApi(this.id);

        hideLoading();
        if (isEmpty(res)) {
          showToast("数据异常");
        } else {
          const data = res[0];
          this.dataInfo = {
            id: data.Id,
            title: data.Enrollname,
            subTitle: data.Schoolname,
            description: data.Createnote,
            urls: data.imgfiles,
          };
        }
      } catch (e) {
        hideLoading();
        showToast("发生异常");
      }
    },
    handleDefaultData() {
      this.screenHeight = uni.$u.sys().screenHeight;
      this.statusBarHeight = uni.$u.sys().statusBarHeight;
      this.bScreenHeight = this.screenHeight / 2;
      this.maxPopupHeight =
        this.screenHeight -
        this.statusBarHeight -
        44 -
        uni.$u.sys().safeAreaInsets.top;
    },
    open() {
      if (this.isUp) {
        this.isUp = false;
        this.height = DEFINE_MODEL_HEIGHT;
      } else {
        this.isUp = true;
        this.height = this.fullHeight;
      }
    },
    back() {
      this.show = false;
      setTimeout(() => {
        uni.navigateBack();
      }, 50);
    },
    handleGo() {
      const urls = JSON.stringify(this.dataInfo.urls);
      uni.navigateTo({
        url: `/pages/works-detail/works-image?urls=${urls}`,
      });
    },
    handleStart(e) {
      this.currentHeight = e.touches[0].clientY;
      this.aHeight = this.height;
    },
    handleMove(e) {
      this.move(e);
    },
    move(e) {
      console.log(e);
      const height = e.changedTouches[0].clientY;
      // const moveHeight = this.screenHeight - height;
      this.isUp = height - this.currentHeight > 5 ? false : true;
      const moveHeight = Math.abs(height - this.currentHeight);

      if (this.isUp) {
        if (this.height < this.maxPopupHeight) {
          this.height = this.aHeight + moveHeight;
        }
      } else {
        if (this.height > this.mixPopupHeight) {
          this.height = this.aHeight - moveHeight;
        }
      }

      // if (!this.isUp && moveHeight < this.bScreenHeight) {
      //   this.height = DEFINE_MODEL_HEIGHT;
      // } else if (moveHeight > this.bScreenHeight && this.isUp) {
      //   this.height = this.fullHeight;
      // } else {
      //   this.height = moveHeight;
      // }
    },
    handleEnd(e) {
      const height = e.changedTouches[0].clientY;
      const moveHeight = this.screenHeight - height;
      if (!this.isUp && moveHeight < this.bScreenHeight) {
        this.height = DEFINE_MODEL_HEIGHT;
        this.recordHeight = this.height;
      } else if (moveHeight > this.bScreenHeight && this.isUp) {
        this.height = this.fullHeight;
        this.recordHeight = this.height;
      } else {
        this.height = this.recordHeight;
      }
    },
    handleChange(e) {
      this.currentIndex = e.detail.current;
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #000000;

  &__header {
    background-color: transparent;

    &-title {
      font-size: 16px;
    }
  }
}

.popup__header {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__move {
  height: 5px;
  width: 50px;
  background-color: #bcbcbc;
  border-radius: 100rpx;
}

.popup__content {
  &__title {
    font-size: 40rpx;
    font-family: SourceHanSerifCN-Heavy, SourceHanSerifCN;
    font-weight: 800;
    color: #333333;
    line-height: 58rpx;
    margin-bottom: 30rpx;
  }

  &__sub {
    margin-bottom: 60rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40rpx;
  }

  &__pro {
    margin-bottom: 40rpx;
    font-size: 40rpx;
    font-family: SourceHanSerifCN-Heavy, SourceHanSerifCN;
    font-weight: 800;
    color: #333333;
    line-height: 58rpx;
  }

  &__dec {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40rpx;
  }
}
</style>
