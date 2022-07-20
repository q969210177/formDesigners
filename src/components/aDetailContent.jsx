import "./style/aDetailContent.scss";
import aDetailContentItem from "./aDetailContentItem.jsx";
export default {
  name: "aDetailContent",
  components: {
    aDetailContentItem,
  },
  label: "客户名称",
  key: "a",
  col: 3,
  // showLable: true,
  props: {
    //详情展示规则
    /**
     * {
     *  label:String //
     *  labelWidth:String|| Number //label的长度
     *  key:String|| Number //在data里面的key
     *  col:Number //占据X轴的几格 默认是1
     *  showLable:Boolean //是否滑动到label上显示label
     *  row:Number //占据Y轴的几格 默认是1
     *  type:flex布局的枚举值 详见 aGridLayoutItem组件
     *  showType:Enmu //image  string components   默认是字符串
     * }
     */
    rule: {
      type: Array,
      default: () => {
        return [];
      },
    },
    //展示是数据线
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //没用数据的时候的展示内容
    DefaultCopy: {
      type: String,
      default: "暂无数据",
    },
    // 把X轴分成多少段
    colCount: {
      type: Number,
      default: 20,
    },
    // 把Y轴分成多少段
    rowCount: {
      type: Number,
      default: 20,
    },
  },
  methods: {
    //判断显示的内容
    setShowData(key) {
      if (this.data[key]) {
        return this.data[key];
      }
      return this.DefaultCopy;
    },

    //判断展示字符串还是图片还是组件
    isShow(i, h) {
      const aDetailContentItemProps = {
        showLable: i.showLable,
        label: i.label,
        labelWidth: i.labelWidth,
      };
      if (i.itemRule && i.itemRule.length) {
        return this.renderItemRule(i);
      } else {
        const showTypeArr = ["image", "components"];
        const returnObj = {
          image: this.renderImage,
          components: this.renderComponents,
        };
        if (showTypeArr.includes(i.showType)) {
          return h(
            "aDetailContentItem",
            { props: { ...aDetailContentItemProps } },
            [returnObj[i.showType](i)]
          );
        }
        return h(
          "aDetailContentItem",
          { props: { ...aDetailContentItemProps } },
          [this.renderString(h, i)]
        );
      }
    },
    //当是展示默认字符串的时候
    renderString(h, i) {
      const tagArr = ["p", "div", "a", "span"];
      if (tagArr.includes(i.showTag)) {
        return h(i.showTag, {}, [this.setShowData(i.key)]);
      }
      return this.setShowData(i.key);
    },
    //当需要展示图片的时候
    renderImage(i) {
      const props = {
        src: this.data[i.key],
      };
      return <a-Image src={this.data[i.key]} {...props}></a-Image>;
    },
    //当需要展示插槽组件的时候
    renderComponents(i) {
      return <div>{this.$scopedSlots[i.key](i)}</div>;
    },
    //递归调用组件
    renderItemRule(i) {
      let { colCount, rowCount } = i;
      colCount = colCount ? colCount : 1;
      rowCount = rowCount ? rowCount : 1;
      console.log(colCount, rowCount, ":::::colCount, rowCount");
      return (
        <aDetailContent
          colCount={colCount}
          rowCount={rowCount}
          rule={i.itemRule}
          data={i.data}
        >
         
        </aDetailContent>
      );
    },
  },
  render(h) {
    return (
      <div class="aDetailContent">
        <aGridLayout colCount={this.colCount} rowCount={this.rowCount}>
          {this.rule.map((i) => {
            return (
              <aGridLayoutItem
                type={i.type}
                props={{ layOut: { col: i.col, row: i.row } }}
              >
                {this.isShow(i, h)}
              </aGridLayoutItem>
            );
          })}
        </aGridLayout>
      </div>
    );
  },
};
