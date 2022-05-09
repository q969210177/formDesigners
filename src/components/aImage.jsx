import "./style/aImage.scss"
export default {
    name: 'aImage',
    props: {
        src: {
            type: [Array, String],
            default: ""
        },
        showType: {
            type: String,
            default: "list"
        }
    },
    computed: {},
    methods: {
        handleImgClick(v) {

            console.log(v);
            // const { target: { src } } = v
            // console.log(src, 'imgSrc');
        },
        //实际渲染的template
        renderTemplate() {
            if (this.src.map) {
                return this.renderImgTags(this.src)
            }
            return <img src={this.src} width="60px" onClick={(v) => {
                const { target: { src } } = v
                // console.log(src, 'imgSrc');
                this.handleImgClick(src)
            }} alt="" srcset="" />
        },
        //多行渲染的template
        renderImgTags(imgSrcArr) {
            // console.log(imgSrcArr);
            const vnode = imgSrcArr.map(i => {
                return <img src={i} width="60px" onClick={this.handleImgClick} alt="" srcset="" />
            })
            return <div class="image_list">
                {vnode}
            </div>
        }

    },
    render() {
        return <div class="aImage">
            {/* {this.showType} */}
            {this.renderTemplate()}
        </div>
    }
}