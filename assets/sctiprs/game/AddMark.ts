import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from '../game/GameCfg';
import { pb } from '../../protos/proto';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    sItem: cc.Prefab = null;

    @property(cc.Prefab)
    bItem: cc.Prefab = null;

    @property(cc.Prefab)
    startItem: cc.Prefab = null;


    markNodes = [];

    ratio = 1;

    showFlag = false;

    onLoad() {
        GlobalEvent.on(EventCfg.ONADDMARK, this.onAddMard.bind(this), this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onMarkAllShow.bind(this), this);

        //  GlobalEvent.on(EventCfg.ONMARKRANGESHOWORHIDE, this.onMarkRangeShowOrHide.bind(this), this);

        GlobalEvent.on(EventCfg.ONMARKUPDATE, this.onMarkUpdate.bind(this), this);

        if (GameCfg.GAMEFUPAN) {
            this.createFuPanData();
        }
    }

    //复盘的本地数据
    createFuPanData() {
        let data = GameCfg.mark;
        if (data) {

            data.forEach((el) => {
                if (el) {
                    this.onAddMard({ type: el[1], index: el[0] })
                }
            });
        }
    }

    onEnable() {
        //添加开始标签
        this.onAddMard({ type: 1, index: GameCfg.huizhidatas });
        if (GameCfg.GAMEFUPAN) {
            this.showFlag = true;
        }
    }

    onMarkRangeShowOrHide() {
        this.markNodes.forEach((el, i) => {
            if (el && el.node) {
                //   
                if (i < cc.ext.beg_end[0] || i >= cc.ext.beg_end[1]) {
                    el.node.active = false;
                }
            }

        })
    }


    onMarkUpdate(posInfo) {
        // this.onMarkhide();
        //console.log('posInfo' + JSON.stringify(posInfo));
        this.onMarkRangeShowOrHide();
        if (this.markNodes[posInfo.index]) {

            // if (posInfo.index < cc.ext.beg_end[0] || posInfo.index >= cc.ext.beg_end[1]) {
            //     this.markNodes[posInfo.index].node.active = false;
            //     return;
            // }
            if (this.showFlag) {
                this.markNodes[posInfo.index].node.active = true;
            }
            //开始标签
            if (this.markNodes[posInfo.index - 1] && this.markNodes[posInfo.index - 1].type == 1) {
                if (this.showFlag) {
                    this.markNodes[posInfo.index - 1].node.active = true;
                }
                this.markNodes[posInfo.index - 1].node.position = posInfo.lowPos;
                this.markNodes[posInfo.index - 1].node.position.y += 20;
                // this.markNodes[posInfo.index].node.
            }
            //买入标签
            if (this.markNodes[posInfo.index].type == 2) {
                this.markNodes[posInfo.index].node.position = posInfo.lowPos;
            }
            //卖出标签
            else if (this.markNodes[posInfo.index].type == 3) {
                this.markNodes[posInfo.index].node.position = posInfo.highPos;
            }

            //  if (cc.ext.hz_width >= 13) {
            this.markNodes[posInfo.index].node.width = cc.ext.hz_width;
            if (cc.ext.hz_width >= 30) {
                this.markNodes[posInfo.index].node.width = 30;
            }
            //   }
            this.markNodes[posInfo.index].node.height = this.markNodes[posInfo.index].node.width * this.ratio;

        }
    }

    //添加标签
    //1是开始
    //2买入
    //3卖出
    onAddMard(info) {
        let node, inde;
        if (info.type == 1) {
            node = cc.instantiate(this.startItem);
            this.ratio = node.height / node.width;
            inde = info.index - 2;
        } else if (info.type == 2) {
            node = cc.instantiate(this.bItem);
            inde = info.index - 1;
        } else if (info.type == 3) {
            node = cc.instantiate(this.sItem);
            inde = info.index - 1;
        } else {
            return;
        }
        this.node.addChild(node);


        this.markNodes[inde] = {
            node: node,
            type: info.type,
        };

        this.saveHistoryMark(inde, info.type);

        // //双盲
        // if (GameCfg.GameType == pb.GameType.ShuangMang) {
        //     node.active = false;
        // }
        if (GameCfg.GAMEFUPAN) {
            node.active = true;
        } else {
            node.active = false;
        }

        //  console.log(type);MA5下穿MA10

    }

    saveHistoryMark(inde, type) {
        //保存游戏记录
        if (!GameCfg.GAMEFUPAN && GameCfg.GameType != pb.GameType.ShuangMang) {

            GameCfg.mark.push([inde, type])

            // this.markNodes.forEach((el, indx) => {

            //     if (el) {
            //         GameCfg.mark[indx] = el.type;
            //     }

            // })
        }
    }


    //显示所有标签
    onMarkAllShow() {
        //双盲
        //  if (GameCfg.GameType == pb.GameType.ShuangMang) {
        this.showFlag = true;
        this.markNodes.forEach(el => {
            el.node.active = true;
        })
        //  }
    }




    onMarAllkhide() {
        this.markNodes.forEach(el => {
            el.node.active = false;
        })
    }


    onDestroy() {
        //  GlobalEvent.off('onDraw');
        GlobalEvent.off(EventCfg.GAMEFUPAN);
        GlobalEvent.off(EventCfg.ONADDMARK);
        GlobalEvent.off(EventCfg.ONMARKUPDATE);
    }

    // update (dt) {}
}
