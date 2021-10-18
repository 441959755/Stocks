import { pb } from "../../../protos/proto";
import GameData from "../../../sctiprs/GameData";
import EventCfg from "../../../sctiprs/Utils/EventCfg";
import GlobalEvent from "../../../sctiprs/Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    item: cc.Node = null;

    @property(cc.Node)
    content: cc.Node = null;

    @property(cc.Node)
    tipsLabel: cc.Node = null;


    onLoad() {
        GlobalEvent.on(EventCfg.GMAECOUNTERSCHANGE, () => {
            this.onShow();
        }, this);
    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GMAECOUNTERSCHANGE);
    }

    onShow() {
        GlobalEvent.emit(EventCfg.LOADINGHIDE);
        if (GameData.GameCounters.length == 0) {
            this.tipsLabel.active = true;
            return
        }
        else {
            this.tipsLabel.active = false;
            let nodes;
            if (this.content.childrenCount > 0) {
                //  nodes = this.content.children;
            }
            else {
                GameData.todayGameCount.forEach((el, index) => {
                    let node = cc.instantiate(this.item);
                    this.content.addChild(node);
                });
            }
            nodes = this.content.children;

            GameData.todayGameCount.forEach((el, index) => {
                nodes[index].active = false;
                let itemHeadle = nodes[index].getComponent('Win-lossItem');
                let win = 0;
                let lose = 0;
                if (GameData.GameCounters[index].win) {
                    win = GameData.GameCounters[index].win;
                }
                if (GameData.GameCounters[index].lose) {
                    lose = GameData.GameCounters[index].lose;
                }

                itemHeadle.winNum = win;
                itemHeadle.loseNum = lose;

                if (index == pb.GameType.ShuangMang) {
                    itemHeadle.nameStr = '双盲训练';
                    itemHeadle.GameType = pb.GameType.ShuangMang;
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.DingXiang) {
                    itemHeadle.nameStr = '定向训练';
                    itemHeadle.GameType = pb.GameType.DingXiang
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.FenShi) {
                    itemHeadle.nameStr = '分时训练';
                    itemHeadle.GameType = pb.GameType.FenShi
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.ZhiBiao) {
                    itemHeadle.nameStr = '指标训练';
                    itemHeadle.GameType = pb.GameType.ZhiBiao
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.TiaoJianDan) {
                    itemHeadle.nameStr = '条件单训练';
                    itemHeadle.GameType = pb.GameType.TiaoJianDan
                    nodes[index].active = true;
                } else if (index == pb.GameType.QiHuo) {
                    itemHeadle.nameStr = '期货训练';
                    itemHeadle.GameType = pb.GameType.QiHuo
                    nodes[index].active = true;
                } else if (index == pb.GameType.TiaoZhan) {
                    itemHeadle.nameStr = '挑    战';
                    itemHeadle.GameType = pb.GameType.TiaoZhan
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.JJ_PK) {
                    itemHeadle.nameStr = 'P K 大战';
                    itemHeadle.GameType = pb.GameType.JJ_PK
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.JJ_DuoKong) {
                    itemHeadle.nameStr = '多空大战';
                    itemHeadle.GameType = pb.GameType.JJ_DuoKong
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.JJ_ChuangGuan) {
                    itemHeadle.nameStr = '闯  关赛';
                    itemHeadle.GameType = pb.GameType.JJ_ChuangGuan
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.JJ_QiHuo) {
                    itemHeadle.nameStr = '期货大战';
                    itemHeadle.GameType = pb.GameType.JJ_QiHuo
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.MoNiChaoGu) {
                    itemHeadle.nameStr = '模拟炒股';
                    itemHeadle.GameType = pb.GameType.MoNiChaoGu
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.ChaoGuDaSai) {
                    itemHeadle.nameStr = '炒股大赛';
                    itemHeadle.GameType = pb.GameType.ChaoGuDaSai
                    nodes[index].active = true;
                }
                else if (index == pb.GameType.GeGuJingChai) {
                    itemHeadle.nameStr = '个股竞猜';
                    itemHeadle.GameType = pb.GameType.GeGuJingChai
                    nodes[index].active = true;
                }

                else if (index == pb.GameType.DaPanJingChai) {
                    itemHeadle.nameStr = '大盘竞猜';
                    itemHeadle.GameType = pb.GameType.DaPanJingChai
                    nodes[index].active = true;
                }
                itemHeadle.onShow();
            });


        }
    }

    onEnable() {
        this.onShow();
    }

}
