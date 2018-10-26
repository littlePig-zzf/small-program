<template>
    <div v-if="showAlert" class='modal'>
        <div class='modal-mask'></div>
        <div class='modal-layer'>
            <div class="extract-detail">
                <span class="close-btn" @click="hideModal">×</span>
                <p class="extract-info">{{tips}}</p>
                <button class="share" open-type="share">邀请好友</button>
            </div>
        </div>
    </div>
</template>

<script>
import showSetting from '@/mixins'
export default {
  mixins: [showSetting],
  props: ['tips'],
  data () {
    return {
      showAlert: false
    }
  },
  methods: {
    hideModal () {
      this.showAlert = false
    }
  }
}
</script>
<style lang="less" scoped>
.extract-detail {
    position: relative;
    width: 70%;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 20px;
    z-index: 0;
    animation: scaleAnit .3s ease-in;
    overflow: hidden;
    box-sizing: border-box;
    .extract-info {
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 14px;
    }
    .close-btn {
        position: absolute;
        top: -5px;
        right: 10px;
        font-size: 28px;
        color: #dfdfdf;
    }
}
</style>


