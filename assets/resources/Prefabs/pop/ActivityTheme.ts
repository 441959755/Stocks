import { pb } from "../../../protos/proto";
import LLWConfig from "../../../sctiprs/common/config/LLWConfig";
import GameData from "../../../sctiprs/GameData";
import GameCfgText from "../../../sctiprs/GameText";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";
import LoadUtils from "../../../sctiprs/Utils/LoadUtils";
import PopupManager from "../../../sctiprs/Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bg: cc.Sprite = null;

    @property(cc.Sprite)
    btn: cc.Sprite = null;

    @property(cc.Label)
    tips: cc.Label = null;

    bgSp: cc.SpriteFrame = null;

    btnSp: cc.SpriteFrame = null;

    itemData = null;


    protected start(): void {

        let arrstr = ['炒股大赛', '闯关赛', '首充', '7天VIP活动', '7天VIP'];

        GameData.ActivityConf.forEach(el => {
            if (arrstr.indexOf(el.title) < 0) {
                this.itemData = el;
            }
        });

        if (!this.itemData) {
            this.node.active = false;
            return;
        }
        else {
            let bgurl = 'http://www.cgdr168.com/img/activity/' + this.itemData.id + '_bg.png';
            let btnUrl = 'http://www.cgdr168.com/img/activity/' + this.itemData.id + '_btn.png';

            GlobalEvent.emit(EventCfg.LOADINGSHOW);

            LoadUtils.load(bgurl, (sp) => {
                this.bgSp = new cc.SpriteFrame(sp);
                if (this.bgSp && this.btnSp) {
                    this.onShow();
                }

            })

            LoadUtils.load(btnUrl, (sp) => {
                this.btnSp = new cc.SpriteFrame(sp);
                if (this.bgSp && this.btnSp) {
                    this.onShow();
                }
            })
        }
    }

    onShow() {
        this.bg.spriteFrame = this.bgSp;
        this.btn.spriteFrame = this.btnSp;
        //this.tips.string = GameCfgText.appConf.pop[2].text;
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
    }


    onBtnClick(event, curdata) {
        let name = event.target.name;
        switch (name) {
            case 'bg':
                this.node.active = false;
                break;
            case 'btnActive':
                //this.node.active = false;
                //  GlobalEvent.emit(EventCfg.OPENCGDS);
                this.shopVip(this.itemData.id);
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
        PopupManager.arrPop.remove(7);
    }


}