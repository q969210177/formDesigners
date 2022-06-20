<template>
  <div class="componentsMenu">
    <div class="menu_body">
      <template>
        <div v-for="(v, k) in defaultMenuArr" :key="k">
          <h3>{{ v.name }}</h3>
          <div class="menu_box" :key="k + v.name">
            <div draggable @dragstart="($event) => handleDragStart($event, item)"
              @dragend="($event) => handleDragEnd($event, item)" class="menu_box_item"
              v-for="(item, index) in v.menuArr" :key="index + item.name">
              <div class="menu_box_item_square">
                <span :class="['iconfont', item.icon]"></span>
              </div>
              <div class="menu_box_item_name">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </template>
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
    //拖动的抓取事件 开始事件
    handleDragStart($event, defaultMenuArrItem) {
      // defaultMenuArrItem.data.fileId = setCompoentId()
      $event.dataTransfer.setData(
        'text/plain',
        JSON.stringify(defaultMenuArrItem.data)
      )
    },
    //拖拽抓取的释放事件
    handleDragEnd($event, defaultMenuArrItem) {
      const dom = document.getElementsByClassName("item_hover")
      const length = dom.length
      if (length) {
        for (let index = 0; index < length; index++) {
          const element = dom[index];
          element.classList.remove("item_hover")
        }
      }
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
