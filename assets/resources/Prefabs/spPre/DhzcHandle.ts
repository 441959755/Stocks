// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([cc.Node])
    bg: cc.Node[] = [];

    @property(cc.Label)
    zc_kyLa: cc.Label = null;

    @property(cc.Label)
    zc_syLa: cc.Label = null;

    curGold = null;

    @property(cc.Label)
    zc_sdLa: cc.Label = null;

    @property(cc.EditBox)
    zc_editBox: cc.EditBox = null;

    dhzc = null;

    @property(cc.Label)
    jb_kyLa: cc.Label = null;

    @property(cc.Label)
    jb_sdLa: cc.Label = null;

    @property(cc.EditBox)
    jb_editBox: cc.EditBox = null;

    dhjb = null;

    onLoad() {
        let day = new Date().toLocaleDateString();
        let data = cc.sys.localStorage.getItem('DHZJ' + day);
        console.log(data);
        if (data === "" || data == null) {
            this.curGold = 10000;
        }
        else {
            this.curGold = parseInt(data);
        }
        this.zc_editBox.node.on(
            'editing-did-ended',
            edit => {

                let str = edit.string;
                if (str == '') {
                    return;
                } else {
                    if (parseInt(str) > this.curGold) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换金币不能超今日上限！');
                        return;
                    }

                    if (parseInt(str) > GameData.properties[pb.GamePropertyId.Gold]) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换金币不能超可用金币数量！');
                        return;
                    }

                    this.zc_sdLa.string = parseInt(str) * 10 + '';

                    this.dhzc = parseInt(str);
                }

            },
            this
        );

        this.jb_editBox.node.on(
            'editing-did-ended',
            edit => {

                let str = edit.string;
                if (str == '') {
                    return;
                } else {


                    if (parseInt(str) > GameData.mncgDataList.account) {
                        GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换资产不能超可用资产数量！');
                        return;
                    }

                    this.jb_sdLa.string = parseInt(str) / 20 + '';

                    this.dhjb = parseInt(str);
                }

            },
            this
        );

        GlobalEvent.on(EventCfg.GOLDCHANGE, () => {
            this.zc_kyLa.string = GameData.properties[pb.GamePropertyId.Gold];
        }, this);
    }

    start() {

    }

    onEnable() {
        this.zc_kyLa.string = GameData.properties[pb.GamePropertyId.Gold];

        this.zc_syLa.string = this.curGold;

        this.jb_kyLa.string = GameData.mncgDataList.account;

    }

    onToggleClick(event, data) {
        let name = event.node.name;
        if (name == 'toggle1') {
            this.bg[0].active = true;
            this.bg[1].active = false;
        }

        else if (name == 'toggle2') {
            this.bg[0].active = false;
            this.bg[1].active = true;
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;
        }

        else if (name == 'sp_mncg_qrdh') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let info = {
                direction: 1,
                amount: this.dhzc,
            }

            let CmdMncgExchange = pb.CmdMncgExchange;
            let message = CmdMncgExchange.create(info);
            let buff = CmdMncgExchange.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_MncgExchange, buff, (res) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                if (res.account) {
                    console.log('兑换应答' + JSON.stringify(res));
                    this.curGold -= this.dhzc;
                    this.zc_syLa.string = this.curGold;
                    GameData.mncgDataList.account = res.account;

                    let day = new Date().toLocaleDateString();
                    cc.sys.localStorage.setItem('DHZJ' + day, this.curGold);
                    this.zc_sdLa.string = '';
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换成功！');

                    // GameData.mncgDataList.account += (this.dhzc * 10);
                    this.jb_kyLa.string = GameData.mncgDataList.account;
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result);
                }

            })

        }

        else if (name == 'sp_mncg_qrdh1') {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            let info = {
                direction: 2,
                amount: this.dhjb,
            }

            let CmdMncgExchange = pb.CmdMncgExchange;
            let message = CmdMncgExchange.create(info);
            let buff = CmdMncgExchange.encode(message).finish();

            socket.send(pb.MessageId.Req_Game_MncgExchange, buff, (res) => {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
                if (res.account) {
                    console.log('兑换应答' + JSON.stringify(res));
                    GameData.mncgDataList.account = res.account;;
                    this.jb_kyLa.string = GameData.mncgDataList.account;
                    this.jb_sdLa.string = '';
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '兑换成功！');
                }
                else {
                    GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, res.result);
                }
            })

        }

    }
}
