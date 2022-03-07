import GlobalEvent from "../Utils/GlobalEvent";
import EventCfg from "../Utils/EventCfg";
import PopupManager from "../Utils/PopupManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    protected onLoad(): void {
        //通知界面
        GlobalEvent.on('OPENNOTICELAYER', this.openNoticelayer.bind(this), this);

        //打开排行榜
        GlobalEvent.on('OPENRANKINGLIST', this.openRankingList.bind(this), this);

        //打开商城
        GlobalEvent.on('OPENSHOPLAYER', this.openShopLayer.bind(this), this);
    }

    //打开公告
    openNoticelayer() {
        PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/noticeLayer', 10, null);
    }

    //打开排行榜
    openRankingList() {
        PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/rankingList', 10, null);
    }

    //打开商城
    openShopLayer(type) {
        PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/shop/shop', 88, (node) => {
            type && (node.getComponent('ShopControl').onShow(type));
        })
    }

    onClick(event, customData) {

        let name = event.target.name;

        //公告
        if (name == 'main_smbt_gg1') {
            this.openNoticelayer();
        }

        //好友
        else if (name == 'main_smbt_hy1') {
            PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/friendLayer', 10, null);
        }

        //反馈
        else if (name == 'main_smbt_fk1') {
            GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '敬请期待！');
        }

        //任务
        else if (name == 'main_smbt_rw1') {
            PopupManager.openNode(cc.find('Canvas'), null, 'Prefabs/taskLayer', 10, null);
        }

        //排行
        else if (name == 'main_smbt_ph1') {
            this.openRankingList();
        }

        //商城
        else if (name == 'main_smbt_sc1') {
            this.openShopLayer(1);
        }
    }

    protected onDestroy(): void {
        GlobalEvent.off('OPENNOTICELAYER');
        GlobalEvent.off('OPENRANKINGLIST');
        GlobalEvent.off('OPENSHOPLAYER');
    }

}
