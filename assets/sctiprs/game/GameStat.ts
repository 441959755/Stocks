import GameData from '../GameData';

import GameCfgText from '../GameText';
import GameCfg from './GameCfg';
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

        let datas = GameCfg.history.deal;

        console.log(JSON.stringify(datas));

        let count = 0, yingcount = 0, kuiCount = 0;

        let minIndex = -1, min = 0;
        let maxIndex = -1, max = 0;

        this.dealLas[0].string = datas.length + '';

        for (let i = 0; i < datas.length; i++) {
            if (datas[i][2] >= 0) {
                yingcount++;
                let t = Math.max(max, datas[i][2]);
                if (t == datas[i][2]) {
                    maxIndex = i;
                    max = datas[i][2];
                }


            } else {
                kuiCount++;
                let t = Math.min(min, datas[i][2]);
                if (t == datas[i][2]) {
                    minIndex = i;
                    min = datas[i][2];
                }
            }
        }

        this.dealLas[1].string = yingcount + '';
        this.dealLas[2].string = kuiCount + '';

        if (max != 0) {
            this.profitLas[0].string = datas[maxIndex][1] - datas[maxIndex][0] + 1 + '';
            this.profitLas[1].string = (datas[maxIndex][2] * 100).toFixed(2) + '%';
            if (datas[maxIndex][2] > 0) {
                this.profitLas[1].node.color = cc.Color.RED;
            } else {
                this.profitLas[1].node.color = cc.Color.WHITE;
            }
        }

        if (min != 0) {
            this.lossLas[0].string = datas[minIndex][1] - datas[minIndex][0] + 1 + '';
            this.lossLas[1].string = ((datas[minIndex][2]) * 100).toFixed(2) + '%';

            if (datas[minIndex][2] != 0) {
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
