import { pb } from "../../../protos/proto";
import GameCfg from "../../../sctiprs/game/GameCfg";
import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    content1: cc.Node = null;

    @property(cc.Node)
    content2: cc.Node = null;

    @property(cc.Node)
    tipsNode: cc.Node = null;

    @property(cc.Node)
    item1: cc.Node = null;

    @property(cc.Node)
    item2: cc.Node = null;

    @property(cc.Label)
    zzcLa: cc.Label = null;

    @property(cc.Label)
    kczcLa: cc.Label = null;

    @property(cc.Label)
    cczcLa: cc.Label = null;

    @property(cc.Label)
    wtzcLa: cc.Label = null;

    @property(cc.Node)
    scorllNode: cc.Node = null;

    @property(cc.Node)
    scorllNode1: cc.Node = null;

    @property(cc.Node)
    sNode: cc.Node = null;

    @property(cc.Node)
    lNode: cc.Node = null;

    @property(cc.Node)
    dhzc: cc.Node = null;

    @property(cc.Label)
    title: cc.Label = null;

    _flag = true;

    @property(cc.Node)
    sp_topbtn_phb: cc.Node = null;

    onEnable() {
        GlobalEvent.on(EventCfg.ADDZXGP, this.onAddZx.bind(this), this);

        //跟新资产数据
        GlobalEvent.on(EventCfg.CHANGEMNCGACCOUNT, this.onUpdateMycgData.bind(this), this);
    }

    onAddZx() {
        let arr = [];
        if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
            arr = GameData.selfStockList;
        }
        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            GameData.cgdsStockList.forEach(el => {
                if (el.id == GameData.SpStockData.id) {
                    arr = el.stockList;
                }
            })
        }
        if (arr.length > 0) {
            let UIScrollControl = this.scorllNode.getComponent('UIScrollControl');
            UIScrollControl.initControl(this.item1, arr.length, this.item1.getContentSize(), 0, (node, index) => {
                let handle = node.getComponent('MnxgItem');
                handle.onShow(arr[index]);
            })

            this.tipsNode.active = false;
        }
        else {
            this.tipsNode.active = true;
        }
    }

    onShow(data?) {

        if (data) {

            GameData.SpStockData = data;
            GameCfg.GameType = pb.GameType.ChaoGuDaSai;
            this.dhzc.active = false;
            this.title.string = data.title;
            this.sp_topbtn_phb.active = true;
        }
        else {
            GameCfg.GameType = pb.GameType.MoNiChaoGu;
            this.dhzc.active = true;
            this.title.string = '模拟炒股';
            this.sp_topbtn_phb.active = false;
        }

        let shen = 1399001;
        let lu = '1';
        this.onAddZx();



        //初始资产数据
        this.onUpdateMycgData();

        //进来获取的第一条行情
        GlobalEvent.on(EventCfg.CMDQUOTITEM, (info) => {
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
            if (!info.items || info.items.length <= 0) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '获取的行情为空');
                return;
            }
            if (info.items[0].code == shen) {
                this.onUpdateSLLabel(info.items[0], this.sNode);
            }
            else if (info.items[0].code == lu) {
                this.onUpdateSLLabel(info.items[0], this.lNode);
            }
        })


        //订阅时时行情
        GlobalEvent.on(EventCfg.SYNCQUOTEITEM, (data) => {
            if (data.code == shen) {
                this.onUpdateSLLabel(data, this.sNode);
            }
            else if (data.code == lu) {
                this.onUpdateSLLabel(data, this.lNode);
            }

        }, this);

        //订阅
        this.CmdQuoteSubscribe(true);

        //获取行情
        {
            let info1 = {
                ktype: pb.KType.Min,
                code: 1399001,
                to: parseInt((new Date().getTime()) / 1000 + ''),
                total: 1,
            }
            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1));
        }
        {
            let info1 = {
                ktype: pb.KType.Min,
                code: 1,
                to: parseInt((new Date().getTime()) / 1000 + ''),
                total: 1,
            }
            socket.send(pb.MessageId.Req_QuoteQuery, PB.onCmdQuoteQueryConvertToBuff(info1));
        }

    }

    onUpdateSLLabel(info, node) {
        let label1 = node.getChildByName('label1').getComponent(cc.Label);
        let label2 = node.getChildByName('label2').getComponent(cc.Label);

        label1.string = ComUtils.changeTwoDecimal(info.price);
        let zd = info.price - info.close;
        let zdf = zd / info.close * 100;

        if (zd > 0) {
            label1.node.color = cc.Color.RED;
            label2.node.color = cc.Color.RED;
        }
        else {
            label1.node.color = cc.Color.GREEN;
            label2.node.color = cc.Color.GREEN;
        }

        label2.string = ComUtils.changeTwoDecimal(zd) + '  ' + ComUtils.changeTwoDecimal(zdf) + '%';
    }


    CmdQuoteSubscribe(flag) {
        {
            let info = {
                items: [{ code: '1399001', flag: flag },
                { code: '1', flag: flag }],
            }

            console.log('订阅：' + JSON.stringify(info));
            let CmdQuoteSubscribe = pb.CmdQuoteSubscribe;
            let message = CmdQuoteSubscribe.create(info);
            let buff = CmdQuoteSubscribe.encode(message).finish();

            socket.send(pb.MessageId.Req_QuoteSubscribe, buff, info => {
                console.log('订阅：' + JSON.stringify(info));
            })
        }
    }

    onDisable() {
        GlobalEvent.off(EventCfg.ADDZXGP);
        GlobalEvent.off(EventCfg.SYNCQUOTEITEM);
        GlobalEvent.off(EventCfg.CMDQUOTITEM);
        //订阅
        this.CmdQuoteSubscribe(false);
        GameCfg.GameType = null;
        GlobalEvent.off(EventCfg.CHANGEMNCGACCOUNT);
        GameData.SpStockData = null;
        // this.content1.removeAllChildren();
        // this.content2.removeAllChildren();
    }


    //资产数据
    onUpdateMycgData() {
        let data = {
            account: 100000,
            orderList: null,
            positionList: null,
        };

        if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
            data = GameData.mncgDataList;
        }
        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            //  data = GameData.cgdsStateList;
            GameData.cgdsStateList.forEach(el => {
                if (el.id == GameData.SpStockData.id) {
                    data = el.state;
                }
            })
        }

        this.kczcLa.string = (data.account || 0) + '';
        let wt = 0, cc = 0;
        if (data.orderList && data.orderList.items) {
            data.orderList.items.forEach(el => {
                if (el.state == pb.OrderState.Init) {
                    wt += el.volume * el.price;
                }

            });
            this.wtzcLa.string = ComUtils.changeTwoDecimal(wt) + '';
        }
        else {
            this.wtzcLa.string = '0';
        }
        if (data.positionList && data.positionList.items) {
            data.positionList.items.forEach(el => {

                cc += (el.volume * el.priceCost);

            });
            this.cczcLa.string = ComUtils.changeTwoDecimal(cc) + '';
        }
        else {
            this.cczcLa.string = '0';
        }

        let zzc = (data.account || 0) + cc + wt;

        this.zzcLa.string = ComUtils.changeTwoDecimal(zzc) + '';
    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

        //记录
        else if (name == 'sp_topbtn_jyjl') {

            GlobalEvent.emit(EventCfg.OPENMNHISLAYER, GameData.userID);
        }

        //添加自选
        else if (name == 'sp_topbtn_tianjia') {
            GlobalEvent.emit(EventCfg.OPENADDZXGPBOX);
        }

        //帮组
        else if (name == 'sp_topbtn_help') {
            GlobalEvent.emit(EventCfg.OPENHELPLAYER);
        }

        else if (name == 'sp_mncg_arrqh') {
            this._flag = !this._flag;
            this.sNode.active = this._flag;
            this.lNode.active = !this._flag;
        }

        //越换资产
        else if (name == 'sp_mncg_dhzc') {
            GlobalEvent.emit(EventCfg.OPENDHZCLLAYER);
        }

        else if (name == 'sp_topbtn_mr') {
            GlobalEvent.emit(EventCfg.OPENBUYBOX);
        }

        else if (name == 'sp_topbtn_mc') {
            GlobalEvent.emit(EventCfg.OPENSELLBOX);
        }

        else if (name == 'sp_topbtn_cd') {
            GlobalEvent.emit(EventCfg.OPENMNCDLAYER);
        }

        else if (name == 'sp_topbtn_phb') {
            GlobalEvent.emit(EventCfg.OPENCGDSPH, GameData.SpStockData);
        }

    }


    onToggleClick(event, data) {
        let name = event.node.name;

        if (name == 'toggle1') {
            this.scorllNode.active = true;
            this.scorllNode1.active = false;
        }

        else if (name == 'toggle2') {
            this.scorllNode.active = false;
            this.scorllNode1.active = true;

            let arr = [];
            if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
                arr = GameData.mncgDataList.positionList.items;
            }
            else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
                GameData.cgdsStateList.forEach(el => {
                    if (el.id == GameData.SpStockData.id) {
                        if (el.state.positionList && el.state.positionList.items) {
                            arr = el.state.positionList.items;
                        }
                    }
                })
            }

            if (arr.length > 0) {
                let UIScrollControl = this.scorllNode1.getComponent('UIScrollControl');
                UIScrollControl.initControl(this.item2, arr.length, this.item2.getContentSize(), 0, (node, index) => {
                    let handle = node.getComponent('MnxgItem1');
                    handle.onShow(arr[index].code, arr[index]);
                })

                this.tipsNode.active = false;
            } else {
                this.tipsNode.active = true;
            }
        }
    }

}
