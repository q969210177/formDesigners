<template>
    <div class="activeIcon">
        <a-spin size="small" :spinning="loading">
            <div>
                <span :class="['label', 'iconfont', value]"></span>
                <a-button size="small" type="link" @click="formModelConfig.show = true">打开</a-button>
            </div>
            <a-modal :z-index="2000" :getContainer="() => this.$el" :destroyOnClose="true" title="选择icon" :width="600"
                cancelText="取消" v-model="formModelConfig.show">
                <div class="serachSelect_body">
                    <!-- <a-input-search @keyup="handleKeyUpVoid" v-model="activeInputValue" placeholder="请输入搜索关键字" enter-button
                    @click.stop="handleInputClick" @search="handleSerach" @blur="handleBlur" /> -->
                    <div class="panl_body">
                        <ul class="panl">
                            <li :title="v.name" :key="k + v.class" @click.stop="handlePanlItemClick(v, k)"
                                :class="['panl_item', { active: v.class === value }]" v-for="(v, k) in copyOption">
                                <span :class="['iconfont', v.class]"></span>
                                <span class="panl_item_text">
                                    {{ v.name }}
                                </span>
                            </li>
                            <li class="panl_page">
                                <a-pagination v-model="page" :pageSize="20" simple showQuickJumper :default-current="1"
                                    @change="setCopyOption" :total="iconData.length" />
                            </li>
                        </ul>
                    </div>
                </div>
            </a-modal>
        </a-spin>
    </div>
</template>
<script>
import iconData from '../utils/iconData'
export default {
    name: 'activeIcon',
    props: {
        value: {}
    },
    components: {
    },
    data() {
        return {
            formModelConfig: {
                show: false
            },
            copyOption: [],
            panlShow: false,
            activeInputValue: '',
            loading: false,
            disabled: false,
            isFristChangeValue: false,
            iconData,
            page: 1

        }
    },
    mounted() {
        this.setCopyOption(1)
    },
    methods: {
        //返回选择的那一条class
        returnIconDataName(iconClass) {
            const length = iconData.length
            for (let index = 0; index < length; index++) {
                const element = iconData[index];
                if (element.class === iconClass) {
                    console.log(element, "::::", index);
                    return
                }

            }
            return ""
        },
        // returnIconDataName(class){ },
        //根据option设置赋值 根据当前的页码来设置
        setCopyOption(page) {
            this.copyOption = []
            const startCount = iconData.length > 20 ? 20 : iconData.length
            for (
                let index = startCount * (page - 1);
                index < startCount * page;
                index++
            ) {
                const item = iconData[index]
                this.copyOption.push(item)
            }
        },
        //弹窗里面的确定按钮
        handlePanlItemClick(v, k) {
            this.formModelConfig.show = false
            this.$emit("handlePanlItemClick", v, k)
            this.$emit('input', v.class)
        },
        //搜索功能
        handleSerach(value) {
            if (value) {
                const options = JSON.parse(this.options)
                const optionsLength = options.length
                const newOption = []
                if (options.length === 0) return
                for (let index = 0; index < optionsLength; index++) {
                    const item = options[index]
                    // const item = this.copyOption[index]
                    if (item[this.labelKey].includes(value)) {
                        newOption.push(item)
                    }
                }
                this.copyOption = newOption
            }
        },

    },
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';

.activeIcon {
    width: 100%;
    height: 100%;

    .serachSelect_body {
        width: 100%;

        .panl_body {
            width: 100%;
            border-radius: 4px;
            // min-height: 400px;
            position: absolute;
            top: 40px;
            left: 0;
            border: 1px solid #f7f7f7;
            background: #fff;
            z-index: 888;

            .panl {
                width: 100%;
                padding: 2px 4px;
                height: calc(100% - 100px);
                overflow-y: auto;
                list-style: none;
                @include flex-row-s-s;
                flex-wrap: wrap;

                .panl_item {
                    cursor: pointer;
                    width: 80px;
                    height: 80px;
                    @include flex-col-c-c;
                    border-radius: 4px;

                    .panl_item_text {
                        width: 100%;
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        padding: 0 4px;
                    }

                    &:hover {
                        background: #1890ff;
                        color: #fff;
                    }
                }

                .active {
                    background: #1890ff;
                    color: #fff;
                }
            }

            .panl_page {
                height: 40px;
                width: 100%;
                margin-top: 4px;
                border-top: 1px solid #f7f7f7;
                @include flex-row-c-e;
            }
        }
    }

    // background: red;
}
</style>