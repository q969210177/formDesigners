export default {
    name: 'test',
    render() {
        // const slot = {
        //     default:()
        // }
        return <div class="test">
           {this.$slots.default}
        </div>
    }
}