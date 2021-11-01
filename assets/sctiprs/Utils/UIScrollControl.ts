

const { ccclass, property } = cc._decorator;
/**
 * 滑动方向枚举
 */
export enum ScrollDirEnum {
    Vertical,
    Horizon
}

@ccclass
export default class NewClass extends cc.Component {

    /** 滑动框体 - UI组件 */
    private scroll_rect: cc.ScrollView

    /** 可见区域大小 */
    private _show_area_size: cc.Size

    /** 滑动方向 */
    private dir: ScrollDirEnum

    /** 总共数量 */
    private total_count: number

    /**实际创建的item数量 */
    private total_show_item_count: number;

    /** 滑动子对象 - 列表 */
    private all_child_list: Array<cc.Node> = new Array<cc.Node>()

    /** item之间的间距 */
    private distance: number = 0

    /** content初始大小 */
    private start_content_size: cc.Size;

    /**标识 */
    private is_start: boolean = false

    private maxIdx: number = 0;

    /** 刷新回调 */
    private refreshCallBack: Function

    /**
    * 初始化控制
    * @param _temp_node 克隆对象
    * @param _total_count 成员总数
    * @param _size Item水平或竖直方向的距离
    * @param _dir 滑动方向
    * @param callBack 刷新回调
    */
    initControl(_temp_node: cc.Node, _total_count: number, _size: cc.Size, _dir: ScrollDirEnum, callBack: Function): void {

        if (callBack) {
            this.refreshCallBack = callBack
        }

        if (this.is_start == false) {
            this.scroll_rect = this.node.getComponent(cc.ScrollView);
            if (this.scroll_rect == null || this.scroll_rect.content == null) {
                cc.log("ScrollRect组件错误");
                return;
            }

            this.scroll_rect.content.parent.setAnchorPoint(cc.v2(0.5, 0.5))
            let _mask_widget: cc.Widget = this.scroll_rect.content.parent.getComponent(cc.Widget)

            if (_mask_widget == null) {
                _mask_widget = this.scroll_rect.content.parent.addComponent(cc.Widget)
            }

            //上下左右对齐边界
            _mask_widget.isAlignLeft = true
            _mask_widget.left = 0

            _mask_widget.isAlignRight = true
            _mask_widget.right = 0

            _mask_widget.isAlignTop = true
            _mask_widget.top = 0

            _mask_widget.isAlignBottom = true
            _mask_widget.bottom = 0

            this._show_area_size = new cc.Size(this.scroll_rect.node.getContentSize())
            this.scroll_rect.content.setContentSize(this._show_area_size)
            this.start_content_size = this.scroll_rect.content.getContentSize();
        }

        if (_temp_node == null) {
            cc.log("_temp_node == null")
            return
        }

        this.scroll_rect.content.setContentSize(this.start_content_size)
        // this.clear()

        this.total_count = _total_count
        this.dir = _dir as ScrollDirEnum

        if (_dir == ScrollDirEnum.Vertical) {
            this.scroll_rect.content.setAnchorPoint(cc.v2(0.5, 1))

            this.scroll_rect.content.setContentSize(cc.size(this.start_content_size.width, (this.total_count) * (_size.height + 10)))

            //  this.scroll_rect.content.setPosition(cc.v2(0, -this.total_count * (_size.height + 10) / 2))

            let _tempCount: number = Math.floor(this.start_content_size.height / (_size.height + 10))

            this.total_show_item_count = _tempCount + 2

            if (this.total_count <= this.total_show_item_count) {
                this.total_show_item_count = this.total_count
            }

            this.distance = (_size.height + 10)
        }
        else if (_dir == ScrollDirEnum.Horizon) {
            this.scroll_rect.content.setAnchorPoint(cc.v2(0, 0.5))
            this.scroll_rect.content.setContentSize(cc.size(this.total_count * _size.width, this.start_content_size.height))

            this.scroll_rect.content.setPosition(cc.v2(this.total_count * _size.width / 2, 0))
            let _tempCount: number = Math.floor(this.start_content_size.width / _size.width)

            this.total_show_item_count = _tempCount + 2

            if (this.total_count <= this.total_show_item_count) {
                this.total_show_item_count = this.total_count
            }

            this.distance = _size.width
        }

        this.scroll_rect.node.on('scrolling', this.OnScroll.bind(this), this);

        this.is_start == true
        this.maxIdx = 0

        this.initShowAreaItems(_temp_node)

    }

    clear() {
        this.scroll_rect = this.node.getComponent(cc.ScrollView);
        this.scroll_rect.content.removeAllChildren()
        this.all_child_list = []
    }

    /**初始化可见的item */
    private initShowAreaItems(_temp_node: cc.Node) {

        for (let i = 0; i < this.total_show_item_count; i++) {

            let curPos: cc.Vec2 = cc.v2(0, 0)
            let node: cc.Node = this.scroll_rect.content.children[i];

            if (!node) {
                node = cc.instantiate(_temp_node)
                this.scroll_rect.content.addChild(node)
                node.active = true
                node.opacity = 255
            }

            if (this.dir == ScrollDirEnum.Vertical) {
                curPos.y = -this.distance / 2 - this.distance * i
            }
            else if (this.dir == ScrollDirEnum.Horizon) {
                curPos.x = this.distance / 2 + this.distance * i
            }

            // node.name = `cell_${i}`
            node.setAnchorPoint(cc.v2(0.5, 0.5))
            node.setPosition(curPos)

            this.onRefresh(node, i, i)

            this.all_child_list.push(node)
        }
        this.scroll_rect.scrollToTop()
    }

    /**滑动事件 */
    private OnScroll() {
        //获取滚动视图相对于左上角原点的当前滚动偏移
        let scrollOffset: cc.Vec2 = this.scroll_rect.getScrollOffset();
        let offset: number = 0;

        if (this.dir == ScrollDirEnum.Vertical) {
            offset = scrollOffset.y
        }
        else if (this.dir == ScrollDirEnum.Horizon) {
            //水平的offset是负数，为什么会有这么sb的设计，将它取反和垂直方向的统一一下
            offset = -scrollOffset.x
        }

        this.refreshLayout(offset)
    }

    /** 强行刷新布局 */
    private refreshLayout(_curOffset: number) {
        let offset: number = _curOffset

        //最大高度，超过该高度，不刷新
        let _max_rect_size: number = this.total_count * this.distance

        // if (offset < 0 || offset + this._show_area_size.height >= _max_rect_size) {
        //     return
        // }

        let _index: number = 0 //从0开始
        let _min_index: number = Math.floor(offset / this.distance);
        //  console.log(_min_index);
        //miniIdx到maxIdx都会刷新
        for (let i = 0; i < this.total_show_item_count; i++) {
            let node: cc.Node = this.all_child_list[i];
            _index = _min_index + i;
            this.refreshItem(_index, i, node);
        }
        this.maxIdx = _min_index + this.total_show_item_count
    }

    /**
     * 
     * @param _index UI该刷新的第几个元素
     * @param _node_index 
     * @param node 
     */
    refreshItem(_index: number, _node_index: number, node: cc.Node) {
        if (_index < 0 || _index >= this.total_count) {
            // cc.log("索引越界, _index = " + _index + ", this.total_count = " + this.total_count)
            return;
        }

        if (node == null) {
            cc.log("node == null");
            return;
        }

        let curPosition: cc.Vec2 = cc.Vec2.ZERO

        if (this.dir == ScrollDirEnum.Horizon) {
            curPosition.x = this.distance / 2 + this.distance * _index;
        }
        else if (this.dir == ScrollDirEnum.Vertical) {
            curPosition.y = - this.distance / 2 - this.distance * _index;
        }

        node.setPosition(curPosition)
        this.onRefresh(node, _index, _node_index);
    }

    /**
     * 
     * @param node 
     * @param _index 
     * @param nodeIndex 
     */
    private onRefresh(node: cc.Node, _index: number, nodeIndex: number) {
        //cc.log("--------------- _index = " + _index)
        if (this.refreshCallBack != null) {
            this.refreshCallBack(node, _index, nodeIndex)
        }
    }
}
