/* eslint-disable no-dupe-keys */
import "./style/aGridLayout.scss";
export default {
  name: "aGridLayout",
  props: {
    //平分x轴
    colCount: {
      type: Number,
      default: 20,
    },
    //平分y轴
    rowCount: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(window.h);
  },
  methods: {
    //计算元素的宽高
    setGridStyle(col, row) {
      const colCount = 100 / this.colCount;
      const rowCount = 100 / this.rowCount;
      //判断一下边界 是否有出格的情况
      const colNumber = col * colCount >= 100 ? 100 : col * colCount;
      const rowNumber = row * rowCount >= 100 ? 100 : row * rowCount;
      // colNumber >= 100 ? 100 : colNumber
      // rowNumber >= 100 ? 100 : rowNumber
      return {
        width: colNumber + "%",
        height: rowNumber + "%",
      };
    },
    //循环默认的插槽
    renderDefaultSlots() {
      const renderArr = [];
      if (this.$slots.default) {
        const length = this.$slots.default.length;
        for (let index = 0; index < length; index++) {
          const i = this.$slots.default[index];
          console.log(i.tag.includes("aGridLayoutItem"), "i.tag");
          if (i.tag.includes("aGridLayoutItem")) {
            let {
              componentOptions: {
                propsData: { layOut },
                tag,
              },
            } = i;
            //不知道怎么拿子组件的值 所以从这个地方 做一下初始化赋值
            if (!layOut) {
              layOut = {
                col: 1,
                row: 1,
              };
            } else {
              if (!layOut.row) {
                layOut.row = 1;
              }
              if (!layOut.col) {
                layOut.col = 1;
              }
            }
            const style = this.setGridStyle(layOut.col, layOut.row);
            renderArr.push(this.renderTemplate(tag, i, style));
          }
        }
      }

      return renderArr;
    },
    //判断有没有传layout 然后设置样式 渲染实例
    // eslint-disable-next-line no-unused-vars
    renderTemplate(tagName, i, style) {
      if (tagName === "aGridLayoutItem") {
        return <div style={style}>{i}</div>;
      }
    },
  },
  render() {
    // eslint-disable-next-line no-unused-vars
    return <div class="aGridLayout">{this.renderDefaultSlots()}</div>;
  },
};
