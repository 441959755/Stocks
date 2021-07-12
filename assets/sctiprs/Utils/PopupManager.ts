import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";

export default class PopupManager {

    public static tipsBox = null;

    public static MRTBox = null;

    public static stageRankBox = null;

    private static flag = false;

    //选择加载的Prefa
    public static LoadTipsBox(name, text, call?) {
        if (!this.tipsBox && !this.flag) {
            this.flag = true;

            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node, 99);
                // 进场动画
                ActionUtils.openBox(node);

                this.tipsBox = node;
                this.tipsBox.emit('contentText', { text: text, call: call });
            })

            setTimeout(() => {
                this.flag = false;
            }, 1000);

        } else if (this.tipsBox) {
            this.tipsBox.active = true;
            this.tipsBox.emit('contentText', { text: text, call: call });
        }
    }

    //加载名人堂
    public static LoadMRTBox(name, data, call?) {
        if (!this.MRTBox && !this.flag) {
            this.flag = true;
            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node);
                this.MRTBox = node;
                let handle = this.MRTBox.getComponent('MRTHandle');
                handle.MRTData = data;
                handle.initShow();
            })
            setTimeout(() => {
                this.flag = false;
            }, 1000);
        }
        else if (this.MRTBox) {
            this.MRTBox.active = true;
        }

    }

    //加载闯关赛关卡排行
    // public static loadStageRank(name, data, call?) {
    //     if (!this.stageRankBox && !this.flag) {
    //         this.flag = true;
    //         LoadUtils.loadRes('Prefabs/' + name, (pre) => {
    //             let node = cc.instantiate(pre);
    //             cc.find('Canvas').addChild(node);
    //             this.stageRankBox = node;
    //             let handle = this.stageRankBox.getComponent('CgsLv');
    //             handle.curData = data;
    //             handle.initShow();
    //         })
    //         setTimeout(() => {
    //             this.flag = false;
    //         }, 1000);
    //     }
    //     else if (this.stageRankBox) {
    //         this.stageRankBox.active = true;
    //     }
    // }



    public static delPopupNode() {
        this.tipsBox && (this.tipsBox.destroy());
        this.tipsBox = null;
        this.flag = false;
        this.MRTBox && (this.MRTBox.destroy());
        this.MRTBox = null;
        this.stageRankBox && (this.stageRankBox.destroy());
        this.stageRankBox = null;

    }

}