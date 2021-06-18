import GameData from '../GameData';
import GameCfgText from '../GameText';
import GameCfg from './GameCfg';
import DrawData from './DrawData';
import { pb } from '../../protos/proto';
import StrategyAIData from './StrategyAIData';
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

    @property(cc.Node)
    dxNode: cc.Node = null;

    @property(cc.Node)
    zbNode: cc.Node = null;

    onEnable() {
        this.dxNode.active = false;
        this.zbNode.active = false;
        this.userHead.spriteFrame = GameData.headImg;

        this.userLe.string = 'LV:' + GameData.properties[2];

        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[2]];

        this.userExp.string = 'EXP:' + GameData.properties[1] + '/' + max_exp;

        this.userName.string = GameData.userName;
        let data = DrawData.getBukoCount();

        if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.dxNode.active = true;
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
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            let info = StrategyAIData.onCompareReult();
            this.zbNode.active = true;

            let boxs = this.zbNode.children;

            {
                let la = boxs[0].getChildByName('la').getComponent(cc.Label);

                la.string = GameCfg.GameSet.select + ' ' + GameCfg.GameSet.strategy;

            }

            {
                let la = boxs[1].getChildByName('la1').getComponent(cc.Label);
                la.string = StrategyAIData.buyCount + '';

                let la1 = boxs[1].getChildByName('la2').getComponent(cc.Label);
                la1.string = (StrategyAIData.profitrate * 100).toFixed(2) + '%';

                if (StrategyAIData.profitrate < 0) {
                    la1.node.color = GameCfg.labelGreen;
                } else {
                    la1.node.color = GameCfg.labelRed;
                }
            }

            {
                let la = boxs[2].getChildByName('la1').getComponent(cc.Label);
                la.string = (StrategyAIData.Ycount) + '';

                let la1 = boxs[2].getChildByName('la2').getComponent(cc.Label);
                la1.string = (StrategyAIData.Scount) + '';

                let la2 = boxs[2].getChildByName('la3').getComponent(cc.Label);
                la2.string = ((StrategyAIData.Ycount / (StrategyAIData.Ycount + StrategyAIData.Scount)) * 100).toFixed(2) + '%';
                if (StrategyAIData.Ycount + StrategyAIData.Scount == 0) {
                    la2.string = 0.00 + '%';
                }
            }

            {
                let la = boxs[3].getChildByName('la1').getComponent(cc.Label);
                la.string = (data.yCount + data.sCount) + '';

                let la1 = boxs[3].getChildByName('la2').getComponent(cc.Label);
                la1.string = (GameCfg.allRate * 100).toFixed(2) + '%';

                if (GameCfg.allRate < 0) {
                    la1.node.color = GameCfg.labelGreen;
                } else {
                    la1.node.color = GameCfg.labelRed;
                }
            }

            {
                let la = boxs[4].getChildByName('la1').getComponent(cc.Label);
                la.string = (data.yCount) + '';

                let la1 = boxs[4].getChildByName('la2').getComponent(cc.Label);
                la1.string = (data.sCount) + '';

                let la2 = boxs[4].getChildByName('la3').getComponent(cc.Label);
                la2.string = ((data.yCount / (data.yCount + data.sCount)) * 100).toFixed(2) + '%';
                if (data.yCount + data.sCount == 0) {
                    la2.string = 0.00 + '%';
                }
            }

            {
                let la = boxs[5].getChildByName('la1').getComponent(cc.Label);
                la.string = info.high.length + '';

                let la1 = boxs[5].getChildByName('la2').getComponent(cc.Label);
                la1.string = info.middle.length + '';

                let la2 = boxs[5].getChildByName('la3').getComponent(cc.Label);
                la2.string = info.low.length + '';
            }

            {
                let point = (3 * info.high.length + info.middle.length) / (3 * info.high.length + info.middle.length + 2 * info.low.length) * 100;
                if ((3 * info.high.length + info.middle.length + 2 * info.low.length) == 0) {
                    point = 0;
                }
                let node1 = boxs[6].getChildByName('node1');

                let node2 = boxs[6].getChildByName('node2');

                let node3 = boxs[6].getChildByName('node3');

                node1.active = false;
                node2.active = false;
                node3.active = false;
                if (point >= 85) {
                    node1.active = true;
                }
                else if (point >= 60) {
                    node2.active = true;
                }
                else {
                    node3.active = true;
                }
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
