/* eslint-disable no-unused-vars */
// import "./style/componentsMenu.scss";
import { setCompoentId } from "@/formDesigners/utils/utils";
export default {
  name: "componentsMenu",
  props: {
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    //设置组件的item
    setCompoentsItem() {
      const menuArr = [];

      return menuArr.map((i) => {
        const itemClass = {
          componentsMenuItem: true,
          // active_Item: i.activeValue === this.value,
        };
        return (
          <div
            class={itemClass}
            draggable
            onDragstart={($event) => {
              i.data.fileId = setCompoentId();
              $event.dataTransfer.setData("text/plain", JSON.stringify(i.data));
            }}
            onClick={() => {
              this.$emit("input", i.activeValue);
            }}
          >
            {i.activeValue}
            {i.name}
          </div>
        );
      });
    },
  },
  render() {
    // const cardStyle = {
    //   width: "100%",
    // };
    return (
      <div class="componentsMenu">
        <div class="card_body">{this.setCompoentsItem()}</div>
      </div>
    );
  },
};
