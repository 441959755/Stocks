import { pb } from "../../../protos/proto";
import LLWConfig from "../../../sctiprs/common/config/LLWConfig";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";

import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import PopupManager from "../../../sctiprs/Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onBtnClick(event, curdata) {
        let name = event.target.name;
        switch (name) {
            case 'sys_1ylbbt':
                this.shopVip(GameCfgText.appConf.pop[4].activity_id);
                break;

            case "btnClose":
                this.node.active = false;
                break;
            default:
                break;
        }
    }

    shopVip(id) {

        GlobalEvent.emit(EventCfg.LOADINGSHOW);
        let obj = {
            itemId: id,
            count: 1,
            // from: pb.AppFrom.Android_001
            from: LLWConfig.FROM,
        }

        let ItemOrder = pb.ItemOrder;
        let message = ItemOrder.create(obj);
        let buff = ItemOrder.encode(message).finish();
        socket.send(pb.MessageId.Req_Hall_ShopOrder, buff, (res) => {
            console.log('商城下购买应答' + JSON.stringify(res));

            if (!res.result.err) {
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
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }

    onDisable() {
        PopupManager.arrPop.remove(5);
    }

}
