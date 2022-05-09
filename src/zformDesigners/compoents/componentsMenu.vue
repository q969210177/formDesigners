<template>
  <div class="componentsMenu">
    <div class="menu_body">
      <h3>表单组件</h3>
      <div class="menu_box">
        <div
          draggable
          @dragstart="($event)=>handleDragStart($event,v)"
          class="menu_box_item"
          v-for="(v,k) in defaultMenuArr"
          :key="k"
        >
          <div class="menu_box_item_square">
            <a-icon :type="v.icon" />
          </div>
          <div class="menu_box_item_name">{{v.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defaultMenuArr } from '../data/defaultData'
export default {
  name: 'componentsMenu',
  data() {
    return {
      defaultMenuArr
    }
  },
  methods: {
    //拖动的抓取事件
    handleDragStart($event, defaultMenuArrItem) {
      // defaultMenuArrItem.data.fileId = setCompoentId()
      $event.dataTransfer.setData(
        'text/plain',
        JSON.stringify(defaultMenuArrItem.data)
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';
.componentsMenu {
  width: 100%;
  height: 100%;
  .menu_body {
    width: 100%;
    padding: 4px 8px;

    .menu_box {
      width: 100%;
      padding: 4px 8px;
      @include flex-row-s-s;
      flex-wrap: wrap;
      .menu_box_item {
        width: 70px;
        height: 70px;
        margin: 4px;
        @include flex-row-c-c;
        flex-wrap: wrap;
        &:hover {
          background: #409eff;
          color: #fff;
        }
        .menu_box_item_square {
          width: 100%;
          height: 40px;
          @include flex-row-c-c;
        }
        .menu_box_item_name {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
