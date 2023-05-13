<template>
  <view class="main">
    <view class="fixed-top" @click="isUp && open()">
      <u-status-bar />
      <view
        class="flex justify-between align-center main__header"
        :style="{ height: $u.addUnit($u.getPx(navHeight)) }"
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
              mode="aspectFit"
            ></u--image>
          </view>
        </swiper-item>
      </swiper>
      <view
        class="text-white position-absolute bottom-0 m-auto bg-transparent-black rounded-xxl px-3 py-1"
        style="right: 30rpx; bottom: 80rpx"
        >{{ currentIndex + 1 }}/{{ dataInfo.urls.length }}</view
      >
    </view>
    <u-popup
      :show="true"
      :overlay="false"
      :round="20"
      mode="bottom"
      customStyle="background-color: #fffcf8;"
    >
      <view
        class="popup__works"
        :style="{ height: $u.addUnit($u.getPx(height)) }"
        @click="open"
        @touchmove="handleMove"
        @touchend="handleEnd"
        @touchstart="handleStart"
      >
        <view class="flex justify-center align-center popup__header">
          <view class="popup__move"></view>
        </view>
        <scroll-view
          scroll-y="true"
          :style="{ height: $u.addUnit($u.getPx(contentHeight)) }"
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
    <!-- <view
      class="w-100 fixed-bottom popup__works rounded-top-4"
      :style="{ height: $u.addUnit($u.getPx(mixPopupHeight)) }"
      :animation="animationData"
      @click="open"
      @touchmove="handleMove"
      @touchend="handleEnd"
      @touchstart="handleStart"
    >
      <view class="popup__header">
        <view class="popup__move"></view>
      </view>

      <scroll-view
        class="h-100"
        scroll-y="true"
        :style="{ height: $u.addUnit($u.getPx(contentHeight)) }"
      >
        <view class="popup__content mx-4">
          <view class="popup__content__title">{{ dataInfo.title }}</view>
          <view class="popup__content__sub">作者：{{ dataInfo.subTitle }}</view>
          <view class="popup__content__pro">作品简介</view>
          <view class="popup__content__dec">{{ dataInfo.description }} </view>
        </view>
      </scroll-view>
      <u-safe-bottom></u-safe-bottom>
    </view> -->
  </view>
</template>

<script>
import { findByIdWorksDetailApi } from "@/api/api.js";
import { isEmpty } from "lodash-es";
import { showLoading, hideLoading, showToast } from "@/utils/loading.js";
const DEFINE_MODEL_HEIGHT = 300;
export default {
  data() {
    return {
      animation: null,
      animationData: {},
      currentIndex: 0,
      id: null,
      // 判断当前手势滑动的方向
      isUp: false,
      // popup 最后的高度
      height: DEFINE_MODEL_HEIGHT,
      // 手势开始滑动滑动的高度
      currentHeight: 0,
      // 屏幕高度
      screenHeight: 0,
      // 状态栏的高度
      statusBarHeight: 0,
      // 最大的popup高度
      maxPopupHeight: 0,
      // 默认的popup高度
      mixPopupHeight: DEFINE_MODEL_HEIGHT,
      // 手势滑动之前popup的高度
      beforePopupHeight: DEFINE_MODEL_HEIGHT,
      // nav 高度
      navHeight: 44,
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
    // 内容高度
    contentHeight() {
      return this.height - 50;
    },
  },
  onLoad(e) {
    this.animation = uni.createAnimation({
      duration: 50,
    });

    if (e && !isEmpty(e) && e.id) {
      this.id = e.id;
    } else {
      showToast("数据异常");
    }

    this.show = true;
    this.handleDefaultData();
    this.init();
  },
  methods: {
    start() {
      this.animation.height(this.height).step();
      this.animationData = this.animation.export();
    },
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
      this.maxPopupHeight =
        this.screenHeight -
        this.statusBarHeight -
        this.navHeight -
        uni.$u.sys().safeAreaInsets.top;
    },
    open() {
      if (this.isUp) {
        this.isUp = false;
        this.height = DEFINE_MODEL_HEIGHT;
        // this.start();
      } else {
        this.isUp = true;
        this.height = this.maxPopupHeight;
        // this.start();
      }
    },
    back() {
      this.show = false;
      uni.navigateBack();
    },
    handleGo() {
      uni.previewImage({
        current: this.currentIndex,
        urls: this.dataInfo.urls,
      });
    },
    handleStart(e) {
      this.currentHeight = e.touches[0].clientY;
      this.beforePopupHeight = this.height;
    },
    handleMove(e) {
      const height = e.changedTouches[0].clientY;
      const moveHeight =
        height - this.currentHeight > 0
          ? height - this.currentHeight
          : -(height - this.currentHeight);
      this.isUp = height - this.currentHeight > 1 ? false : true;

      if (this.isUp) {
        if (this.height < this.maxPopupHeight) {
          this.height = this.beforePopupHeight + moveHeight;
        }
      } else {
        if (this.height > this.mixPopupHeight) {
          this.height = this.beforePopupHeight - moveHeight;
        }
      }

      // this.start();
    },
    handleEnd(e) {
      const height = e.changedTouches[0].clientY;
      const moveHeight = Math.abs(height - this.currentHeight);

      if (moveHeight > 100) {
        if (this.isUp) {
          this.height = this.maxPopupHeight;
        } else {
          this.height = this.mixPopupHeight;
        }
      } else {
        if (this.isUp) {
          this.height = this.mixPopupHeight;
        } else {
          this.height = this.maxPopupHeight;
        }
      }

      // this.start();
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
.popup__works {
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
