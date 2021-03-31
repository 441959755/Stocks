import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";



const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // UserID: cc.Label = null;

    @property(cc.Node)
    shuangmangLayer: cc.Node = null;


    @property(cc.Node)
    loading: cc.Node = null;



    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        GlobalEvent.on(EventCfg.LOADINGSHOW, () => {
            this.loading.active = true;
        }, this);

        GlobalEvent.on(EventCfg.LOADINGHIDE, () => {
            this.loading.active = false;
        }, this);

    }


    start() {
        // this.resetSize(this.node);


    }

    resetSize(cav) {
        let frameSize = cc.view.getFrameSize();
        let designSize = cc.view.getDesignResolutionSize();

        if (frameSize.width / frameSize.height > designSize.width / designSize.height) {
            cav.width = designSize.height * frameSize.width / frameSize.height;
            cav.height = designSize.height;
            cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
        } else {
            cav.width = designSize.width;
            cav.height = designSize.width * frameSize.height / frameSize.width;
            cav.getComponent(cc.Canvas).designResolution = cc.size(cav.width, cav.height);
        }
        this.fitScreen(cav, designSize);
    }
    /**
     * 背景适配
     * @param canvasnode
     * @param designSize
     */
    fitScreen(canvasnode, designSize) {
        let scaleW = canvasnode.width / designSize.width;
        let scaleH = canvasnode.height / designSize.height;

        let bgNode = canvasnode.getChildByName('bg');
        let bgScale = canvasnode.height / bgNode.height;
        bgNode.width *= bgScale;
        bgNode.height *= bgScale;
        if (scaleW > scaleH) {
            bgScale = canvasnode.width / bgNode.width;
            bgNode.width *= bgScale;
            bgNode.height *= bgScale;
        }
    }

    onclick(event, custData) {
        let name = event.target.name;



    }


    // update (dt) {}
}
