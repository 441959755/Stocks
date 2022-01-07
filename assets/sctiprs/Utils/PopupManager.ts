import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";
import GlobalEvent from "./GlobalEvent";
import EventCfg from "./EventCfg";
import GameCfgText from "../GameText";
import PopupList from "./PopupList";
import GlobalHandle from "../global/GlobalHandle";
import LLWConfig from "../common/config/LLWConfig";
import PlatDefine from "../common/config/PlatDefine";


export default class PopupManager {

    private static nodes: any = {};

    private static isLoading = false;

    public static arrPop: PopupList = null;

    public static init() {

        GlobalEvent.on(EventCfg.LOADINGSHOW, this.loadloading.bind(this), this);
        GlobalEvent.on(EventCfg.LOADINGHIDE, this.loadingHide.bind(this), this);

        GlobalEvent.on(EventCfg.TIPSTEXTSHOW, this.LoadTipsText.bind(this), this);
        GlobalEvent.on(EventCfg.TIPSTEXTHIDE, this.tipsTextHide.bind(this), this);

        GlobalEvent.on(EventCfg.OPENOTHERPLAYERINFO, this.openOtherPlayerInfoLayer.bind(this), this);

        GlobalEvent.on(EventCfg.OPENPROTOCOL, this.openProtocol.bind(this), this);

        // if (cc.sys.os === cc.sys.OS_ANDROID) {
        //     cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // }

        this.arrPop = new PopupList();
    }

    // public static onKeyDown(event) {
    //     switch (event.keyCode) {
    //         case cc.macro.KEY.back://而非cc.KEY.back:
    //             this.openNode(cc.find('Canvas'), this.exitBox, 'Prefabs/exitBox', 100, null);
    //             break;
    //     }
    // }

    private static loadingHide() {
        this.nodes['Prefabs/loading'] && (this.nodes['Prefabs/loading'].active = false)
    }

    private static tipsTextHide() {
        this.nodes['Prefabs/tipsText'] && (this.nodes['Prefabs/tipsText'].active = false)
    }

    //协议
    public static openProtocol(str, url) {
        let call = (node) => {
            node && (
                node.getComponent('Protocol').onShow(str, url)
            );
        }

        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/playeInfo/protocol'], 'Prefabs/playeInfo/protocol', 30, call);
    }

    //其他玩家信息
    public static openOtherPlayerInfoLayer(info) {

        let call = (node) => {
            if (node) {
                ActionUtils.openBox(node);
                node.getComponent('OtherPlayerInfoBox').onShow(info)
            }
        }
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/otherPlayerInfo'], 'Prefabs/otherPlayerInfo', 60, call);
    }

    /**
     * 加载中...
     */
    public static loadloading() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/loading'], 'Prefabs/loading', 99)
    }

    /**
     * 提示文本框
     */
    public static LoadTipsText(content) {

        let call = (node) => {
            node && (node.getComponent('TipsTextHandle').onShow(content));
        }

        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/tipsText'], 'Prefabs/tipsText', 99, call);
    }

    /**
     * 
     * @param name 
     * @param text 
     * @param call   提示框
     */
    public static LoadTipsBox(name, text, call?) {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/' + name], 'Prefabs/' + name, 99, (node) => {
            ActionUtils.openBox(node);
            node.emit('contentText', { text: text, call: call });
        })
    }

    //
    public static loadVipExplain() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/vipExplain'], 'Prefabs/vipExplain', 50, (node) => {
            ActionUtils.openBox(node);
        })
    }

    //闯关大赛海报
    public static openCgdsNotice() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/pop/cgdsNotice'], 'Prefabs/pop/cgdsNotice', 50, (node) => {
            ActionUtils.openBox(node);
        })
    }

    public static openCgsNotice() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/pop/cgsNotice'], 'Prefabs/pop/cgsNotice', 50, (node) => {
            ActionUtils.openBox(node);
        })
    }


    public static openNewPackage() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/pop/newcomerPackage'], 'Prefabs/pop/newcomerPackage', 50, (node) => {
            ActionUtils.openBox(node);
        })
    }

    public static open7DayVIP() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/pop/7DayVIP'], 'Prefabs/pop/7DayVIP', 50, (node) => {
            ActionUtils.openBox(node);
        })
    }

    public static openactiveTheme() {
        this.openNode(cc.find('Canvas'), this.nodes['Prefabs/pop/activityTheme'], 'Prefabs/pop/activityTheme', 50, (node) => {
            ActionUtils.openBox(node);
        })
    }

    public static delPopupNode() {

        for (let key in this.nodes) {
            this.nodes[key] = null;
            LoadUtils.releaseRes(key);
        }

        GlobalEvent.off(EventCfg.OPENPROTOCOL);
        GlobalEvent.off(EventCfg.LOADINGHIDE);
        GlobalEvent.off(EventCfg.LOADINGSHOW);
        GlobalEvent.off(EventCfg.TIPSTEXTSHOW);
        GlobalEvent.off(EventCfg.TIPSTEXTHIDE);
        GlobalEvent.off(EventCfg.OPENOTHERPLAYERINFO);

        this.arrPop.clear();
        this.arrPop = null;
    }


    public static openNode(prent, childen, url, zIndex?, call?) {

        //是否在下载
        if (!this.isLoading) {
            this.isLoading = true;
        }
        else {
            return;
        }

        if (this.nodes[url]) {
            childen = this.nodes[url];
        }

        if (!childen) {
            if (this.nodes['Prefabs/loading']) {
                GlobalEvent.emit(EventCfg.LOADINGSHOW);
            }

            LoadUtils.loadRes(url, pre => {

                if (this.nodes['Prefabs/loading']) {
                    GlobalEvent.emit(EventCfg.LOADINGHIDE);
                }

                childen = cc.instantiate(pre);
                prent.addChild(childen, zIndex);
                childen.active = true;
                this.nodes[url] = childen;
                this.isLoading = false;
                call && call(childen);
            })
        }
        else {
            childen.active = true;
            this.isLoading = false;
            call && call(childen);
        }
    }

    //首次登入弹窗
    public static FirstAutoPop() {

        if (LLWConfig.PLATTYPE == PlatDefine.PLAT_WECHAT) {
            return;
        }

        let t = new Date();
        //清前一天的
        let preDate = new Date(t.getTime() - 24 * 60 * 60 * 1000); //前一天
        cc.sys.localStorage.removeItem(preDate.toLocaleDateString() + 'FIRST');
        //获取当前的
        let flag = cc.sys.localStorage.getItem(t.toLocaleDateString() + 'FIRST');
        if (!flag) {
            cc.sys.localStorage.setItem(t.toLocaleDateString() + 'FIRST', true);
            //当前配置
            GameCfgText.appConf.pop.forEach(el => {

                if (!el.switch) {

                    if (el.id == 5 || el.id == 6) {
                        if (GlobalHandle.Activitys.indexOf(el.activity_id) < 0) {
                            this.arrPop.append(el.id);
                        }
                    }
                    else {
                        //  if (el.id != 7) {
                        this.arrPop.append(el.id);
                        // }

                    }
                }

                el.id = null;
            });


            //弹出的
            this.arrPop.autoPop(() => {
                this.arrPop.end();
                let id = this.arrPop.getElement();
                switch (id) {
                    case 1:
                        GlobalEvent.emit('OPENNOTICELAYER');
                        break;
                    case 2:
                        GlobalEvent.emit('OPENRANKINGLIST');
                        break;
                    case 3:
                        this.openCgdsNotice();
                        break
                    case 4:
                        this.openCgsNotice();
                        break;
                    case 5:
                        this.openNewPackage();
                        break;

                    case 6:
                        this.open7DayVIP();
                        break;

                    case 7:
                        this.openactiveTheme();
                        break;

                    default:
                        break;
                }
            });

        }

    }

}