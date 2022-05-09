import "./style/aDetailContentItem.scss";
export default {
  name: "aDetailContentItem",
  props: {
    //
    label: {
      type: [String, Number],
      default: "",
    },
    //label的长度
    labelWidth: {
      type: [String, Number],
      default: "100px",
    },
    //是否展示label
    showLable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      labelClass: "",
    };
  },
  computed: {
    //判断labelWidth的类型 是number就加上px 是string就直接赋值
    returnLabelWidth() {
      if (typeof this.labelWidth === "number") {
        return this.labelWidth + "px";
      }
      if (typeof this.labelWidth === "string" && this.labelWidth) {
        return this.labelWidth;
      }
      return "60px";
    },
    //设置一个动态id
    setCompoentId() {
      const randomLength = Math.ceil(Math.random() * 36);
      return Number(
        Math.random().toString().substr(2, randomLength) + Date.now()
      ).toString(36);
    },
    //判断是否需要展示被隐藏的详情
    isShowTitle() {
      if (this.showLable) {
        return true;
      }
      if (this.labelClass) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.computeLength();
  },
  methods: {
    //计算长度
    computeLength() {
      const dom = document.getElementById(this.setCompoentId);
      const { width } = dom.getBoundingClientRect();
      const labelWidth = this.getWordsWidth(this.label) + 20;
      if (width > labelWidth) {
        this.labelClass = false;
        return;
      }
      this.labelClass = true;
    },
    //计算label的实际长度
    getWordsWidth(words, wordStyle = { font: "12px sans-serif" }) {
      // console.log(words);
      const canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      ctx.font = wordStyle.font;
      return ctx.measureText(words).width;
    },
  },
  render() {
    const labelStyle = {
      width: this.returnLabelWidth,
    };
    //white_space
    const valueStyle = {
      width: `calc(100% - ${this.returnLabelWidth})`,
    };
    // /this.labelClass
    return (
      <div class="aDetailContentItem">
        <div
          id={this.setCompoentId}
          class={{ item_label: true, white_space: this.labelClass }}
          style={labelStyle}
        >
          <slot name="label">
            <span title={this.isShowTitle ? this.label : ""}>{this.label}</span>
          </slot>
        </div>
        <div class="item_value" style={valueStyle}>
          {this.$slots.default}
        </div>
      </div>
    );
  },
};
