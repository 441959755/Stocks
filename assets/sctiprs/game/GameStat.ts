import GameData from '../GameData';

import GameCfgText from '../GameText';
import GameCfg from './GameCfg';
import DrawData from './DrawData';
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    userExp: cc.Label = null;

    @property(cc.Label)
    userLe: cc.Label = null;

    @property(cc.Sprite)
    userHead: cc.Sprite = null;

    @property([cc.Label])
    dealLas: cc.Label[] = [];

    @property([cc.Label])
    profitLas: cc.Label[] = [];

    @property([cc.Label])
    lossLas: cc.Label[] = [];

    onEnable() {
        this.userHead.spriteFrame = GameData.headImg;

        this.userLe.string = 'LV:' + GameData.properties[2];

        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[2]].max_exp;

        this.userExp.string = 'EXP:' + GameData.properties[1] + '/' + max_exp;

        this.userName.string = GameData.userName;

        let data = DrawData.getBukoCount();

        this.dealLas[0].string = (data.yCount + data.sCount) + '';


        this.dealLas[1].string = data.yCount + '';
        this.dealLas[2].string = data.sCount + '';

        if (data.maxRate != 0) {
            this.profitLas[0].string = data.maxDay + '';
            this.profitLas[1].string = (data.maxRate * 100).toFixed(2) + '%';
            if (data.maxRate > 0) {
                this.profitLas[1].node.color = cc.Color.RED;
            } else {
                this.profitLas[1].node.color = cc.Color.WHITE;
            }
        }

        if (data.minRate != 0) {
            this.lossLas[0].string = data.minDay + '';
            this.lossLas[1].string = ((data.minRate) * 100).toFixed(2) + '%';

            if (data.minRate != 0) {
                this.lossLas[1].node.color = cc.Color.GREEN;
            } else {
                this.lossLas[1].node.color = cc.Color.WHITE;
            }
        }
    }

    onBtnClick(event, data) {
        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.active = false;
        }
    }
}
