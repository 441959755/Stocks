import { pb } from "../../protos/proto";
import GameData from "../../sctiprs/GameData";
import GameCfgText from "../../sctiprs/GameText";
import ComUtils from "../../sctiprs/Utils/ComUtils";
import EventCfg from "../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    vipTimeLabel: cc.Label = null;

    @property(cc.Node)
    vip30Btn: cc.Node = null;

    @property(cc.Node)
    vip90Btn: cc.Node = null;

    @property(cc.Label)
    tips30: cc.Label = null;

    @property(cc.Label)
    tips90: cc.Label = null;

    start() {
        this.init();
    }

    init() {
        if (GameData.properties[pb.GamePropertyId.VipExpiration] - new Date().getTime() / 1000 > 0) {
            ComUtils.getVIPDisTime(this.getVIPDisTime.bind(this));
        }
        else {
            this.vipTimeLabel.node.active = false;
            this.vip30Btn.active = true;
            this.vip90Btn.active = true;
            this.tips30.node.active = true;
            this.tips90.node.active = true;
        }
    }

    getVIPDisTime(obj) {
        this.vipTimeLabel.node.active = true;
        this.vip30Btn.active = false;
        this.vip90Btn.active = false;
        this.tips30.node.active = false;
        this.tips90.node.active = false;
        this.vipTimeLabel.string = '您是尊贵的VIP用户，您的VIP剩余时间：' + obj.day + '天' + obj.hours + '时' + obj.minute + '分';
    }


    onBtnClick(event, curData) {

        let name = event.target.name;
        if (name == 'sys_close') {
            this.node.active = false;
        }

        else if (name == 'sys_vip_vipjk90') {
            let item = GameCfgText.gameConf.item_vip[3];
            this.shopVip(item);

        }

        else if (name == 'sys_vip_vipyk30') {
            let item = GameCfgText.gameConf.item_vip[1];
            this.shopVip(item);
        }
    }

    shopVip(item) {
        let obj = {
            itemId: item.id,
            count: 1,
            from: pb.AppFrom.Android_001
        }

        let ItemOrder = pb.ItemOrder;
        let message = ItemOrder.create(obj);
        let buff = ItemOrder.encode(message).finish();
        socket.send(pb.MessageId.Req_Hall_ShopOrder, buff, (res) => {
            console.log('商城下购买应答' + JSON.stringify(res));
            if (!res.err) {
                let wxXml = res.wxXml, xmlDoc;
                let orderId = res.orderId;

                if (window.DOMParser) {
                    let parser = new DOMParser();
                    xmlDoc = parser.parseFromString(wxXml, "text/xml");
                }
                else // Internet Explorer
                {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(wxXml);
                }

                let appid, nonce_str, partnerid, prepayid, timestamp, sign
                appid = xmlDoc.getElementsByTagName("appid")[0].childNodes[0].nodeValue + '';
                nonce_str = xmlDoc.getElementsByTagName("nonce_str")[0].childNodes[0].nodeValue + '';
                partnerid = xmlDoc.getElementsByTagName("partnerid")[0].childNodes[0].nodeValue + '';
                prepayid = xmlDoc.getElementsByTagName("prepayid")[0].childNodes[0].nodeValue + '';
                timestamp = xmlDoc.getElementsByTagName("timestamp")[0].childNodes[0].nodeValue + '';
                sign = xmlDoc.getElementsByTagName("sign")[0].childNodes[0].nodeValue + '';

                if (llwSDK) {
                    llwSDK.callWXPayToJava(appid, partnerid, prepayid, nonce_str, timestamp, sign);
                }
            }
            else {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.err);
            }

        })
    }
}