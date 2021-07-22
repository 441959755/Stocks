import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";

export default class PopupManager {

    private static tipsBox = null;

    private static MRTBox = null;

    private static stageRankBox = null;

    private static flag = false;

    private static OtherPlayerHisBox = null;

    private static otherPlayerInfoBox = null;

    private static urls = [];

    //其他玩家信息框
    public static LoadOtherPlayerInfoBox(name, call?) {

        if (!this.otherPlayerInfoBox && !this.flag) {
            this.flag = true;

            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node);
                // 进场动画
                ActionUtils.openBox(node);
                this.otherPlayerInfoBox = node;
            })
            setTimeout(() => {
                this.flag = false;
            }, 1000);

        } else if (this.otherPlayerInfoBox) {
            this.otherPlayerInfoBox.active = true;
        }
    }

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
            this.urls.push('Prefabs/' + name);
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
            this.urls.push('Prefabs/' + name);
            setTimeout(() => {
                this.flag = false;
            }, 1000);
        }
        else if (this.MRTBox) {
            this.MRTBox.active = true;
        }

    }

    //加载闯关赛关卡排行
    public static loadStageRank(name, data, call?) {
        if (!this.stageRankBox && !this.flag) {
            this.flag = true;
            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node);
                this.stageRankBox = node;
                this.stageRankBox.active = true;
                let handle = this.stageRankBox.getComponent('CgsLvRank');
                handle.curData = data;
                handle.initShow();
            })
            this.urls.push('Prefabs/' + name);
            setTimeout(() => {
                this.flag = false;
            }, 1000);
        }
        else if (this.stageRankBox) {
            this.stageRankBox.active = true;
            let handle = this.stageRankBox.getComponent('CgsLvRank');
            handle.curData = data;
            handle.initShow();

        }
    }

    //打开其他玩家历史战绩
    public static loadOtherPlayerHisInfo(name, data, call?) {

        if (!this.OtherPlayerHisBox && !this.flag) {
            this.flag = true;

            LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node = cc.instantiate(pre);
                cc.find('Canvas').addChild(node);
                this.OtherPlayerHisBox = node;
                this.OtherPlayerHisBox.active = true;
                this.OtherPlayerHisBox.getComponent('OtherPlayerHisInfo').playeInfo = data;
                this.OtherPlayerHisBox.getComponent('OtherPlayerHisInfo').onShow();
            })
            this.urls.push('Prefabs/' + name);
            setTimeout(() => {
                this.flag = false;
            }, 1000);
        }
        else if (this.OtherPlayerHisBox) {
            this.OtherPlayerHisBox.active = true;
            this.OtherPlayerHisBox.getComponent('OtherPlayerHisInfo').playeInfo = data;
            this.OtherPlayerHisBox.getComponent('OtherPlayerHisInfo').onShow();
        }
    }

    public static delPopupNode() {
        this.urls.forEach(el => {
            LoadUtils.releaseRes(el);
        })

        this.urls = [];
        this.tipsBox && (this.tipsBox.destroy());
        this.tipsBox = null;
        this.flag = false;
        this.MRTBox && (this.MRTBox.destroy());
        this.MRTBox = null;
        this.stageRankBox && (this.stageRankBox.destroy());
        this.stageRankBox = null;
        this.OtherPlayerHisBox && (this.OtherPlayerHisBox.destroy());
        this.OtherPlayerHisBox = null;

        this.otherPlayerInfoBox && (this.otherPlayerInfoBox.destroy());
        this.otherPlayerInfoBox = null;
    }

}