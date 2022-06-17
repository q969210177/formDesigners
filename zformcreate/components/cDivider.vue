<template>
    <div class="cDivider" :style="{ height: height + 'px' }">
        <a-divider v-bind="$attrs"> {{ text }}</a-divider>
    </div>
</template>
<script>
export default {
    name: 'cDivider',
    props: {
        text: {
            type: [String, Number],
            default: ""
        },
        height: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/layout.scss';

.cDivider {
    width: 100%;
    height: 100%;
    @include flex-col-c-c;
}
</style>