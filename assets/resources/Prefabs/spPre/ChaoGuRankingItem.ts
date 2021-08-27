import GameData from "../../../sctiprs/GameData";
import ComUtils from "../../../sctiprs/Utils/ComUtils";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nc: cc.Node = null;

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Label)
    namela: cc.Label = null;

    @property(cc.Label)
    level: cc.Label = null;

    @property([cc.Node])
    gender: cc.Node[] = [];

    @property(cc.Label)
    account: cc.Label = null;

    @property(cc.Label)
    rate: cc.Label = null;

    @property(cc.Label)
    reward: cc.Label = null;

    _curData = null;

    texture = null;

    onShow(info, index, data?) {
        if (!GameData.SpStockData && data) {
            GameData.SpStockData = data;
        }
        this._curData = info;
        this.nc.children.forEach(el => {
            el.active = false;
        })
        if (index == 1) {
            this.nc.children[0].active = true;
        }
        else if (index == 2) {
            this.nc.children[1].active = true;
        }
        else if (index == 3) {
            this.nc.children[2].active = true;
        }
        else {
            this.nc.children[3].active = true;
            let la = this.nc.children[3].getComponent(cc.Label);
            la.string = index;
        }
        //{"uid":722703,"nickname":"方新侠","icon":"default_icon","cgdsAccount":100000}
        if (!info.icon || info.icon == 'default_icon' || info.icon == 'default.jpg') {

        }
        else {
            if (!this.texture) {
                ComUtils.onLoadHead(info.icon, (res) => {
                    let texture = new cc.SpriteFrame(res);
                    this.headImg.spriteFrame = texture;
                    this.texture = texture;
                })
            }
            else {
                this.headImg.spriteFrame = this.texture;
            }
        }
        this.namela.string = info.nickname;

        this.level.string = 'lv:' + info.level;

        this.gender[0].active = false;
        this.gender[1].active = false;

        if (!info.gender) {
            this.gender[0].active = true;
        }
        else {
            this.gender[1].active = true;
        }


        this.account.string = info.cgdsAccount;

        let capital = JSON.parse(data.conf).capital;
        this.rate.string = ComUtils.changeTwoDecimal((info.cgdsAccount - capital) / capital * 100) + '%';

        let aw = 0;
        let t = JSON.parse(data.award)[0][index - 1];
        if (t && t.v) {
            aw = t.v;
        }

        this.reward.string = aw + '';

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'ckzjBtn') {
            GlobalEvent.emit(EventCfg.OPENMNHISLAYER, this._curData.uid);
        }

    }


}
