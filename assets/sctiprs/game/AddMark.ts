import GlobalEvent from '../Utils/GlobalEvent';
import EventCfg from '../Utils/EventCfg';
import GameCfg from './GameCfg';
import { pb } from '../../protos/proto';
import GameData from '../GameData';
import StrategyAIData from './StrategyAIData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    sItem: cc.Prefab = null;

    @property(cc.Prefab)
    bItem: cc.Prefab = null;

    @property(cc.Prefab)
    startItem: cc.Prefab = null;

    @property(cc.Prefab)            //指标AI标签
    ZSItem: cc.Prefab = null;

    @property(cc.Prefab)
    ZBItem: cc.Prefab = null;       //指标AI标签

    @property(cc.Prefab)
    Zb: cc.Prefab = null;     //指标玩家标签

    @property(cc.Prefab)
    Zs: cc.Prefab = null;     //指标玩家标签

    startNode = [];          //开始mark

    markNodes = [];         //xl  mark

    bmarkNodes = [];

    AIMarkNodes = [];      //AI的mark

    mark1Nodes = [];       //pk 自己的mark

    mark2Nodes = [];       //pk 其他的mark

    currPint = null;       //当前绘制的坐标

    currScale = null;       //当前的缩放

    status = 0;



    onLoad() {

        this.node.removeAllChildren();

        GlobalEvent.on(EventCfg.ONADDMARK, this.onAddMard.bind(this), this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onMarkAllShow.bind(this), this);

        GlobalEvent.on(EventCfg.ONMARKUPDATE, this.onMarkUpdate.bind(this), this);

        GlobalEvent.on(EventCfg.ADDMARKHIDEORSHOW, (flag) => { this.node.active = flag }, this);

        GlobalEvent.on(EventCfg.SETMARKCOLOR, this.setMarkColor.bind(this), this);

        GlobalEvent.on(EventCfg.CUTGAMEFUPAN, this.onShowCutMark.bind(this), this);

        GlobalEvent.on(EventCfg.PKFUPAN, this.onShowCutMark.bind(this), this);

    }

    onShowCutMark(status) {

        this.status = status;

        this.markNodes.forEach(el => {
            if (el && el.node) {
                el.node.destroy();
            }
        })

        this.markNodes = [];
        this.markNodes.length = 0;

        this.bmarkNodes.forEach(el => {
            if (el && el.node) {
                el.node.destroy();
            }
        })

        this.bmarkNodes = [];
        this.bmarkNodes.length = 0;

        this.mark1Nodes.forEach(el => {
            if (el && el.node) {
                el.node.active = false;
            }
        })

        this.mark2Nodes.forEach(el => {
            if (el && el.node) {
                el.node.active = false;
            }
        })

        if (this.status == 1) {
            this.mark1Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i >= GameCfg.beg_end[0] && i < GameCfg.beg_end[1]) {
                        el.node.active = true;
                    }
                }
            })
        }
        else if (this.status == 2) {
            this.mark2Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i >= GameCfg.beg_end[0] && i < GameCfg.beg_end[1]) {
                        el.node.active = true;
                    }
                }
            })
        } else if (this.status == 3) {

            this.mark1Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i >= GameCfg.beg_end[0] && i < GameCfg.beg_end[1]) {
                        el.node.active = true;
                    }
                }
            })
            this.mark2Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i >= GameCfg.beg_end[0] && i < GameCfg.beg_end[1]) {
                        el.node.active = true;
                    }
                }
            })
        }
    }


    setMarkColor() {
        let info = StrategyAIData.onCompareReult();
        this.markNodes;
        info.low.forEach(el => {
            if (this.markNodes[el.start]) {
                let nodes = this.markNodes[el.start].node.children;
                nodes[0].active = true;
                nodes[1].active = false;
                nodes[2].active = false;
            }
            if (this.markNodes[el.end]) {
                let nodes = this.markNodes[el.end].node.children;
                nodes[0].active = true;
                nodes[1].active = false;
                nodes[2].active = false;
            }
        })

        info.middle.forEach(el => {
            if (this.markNodes[el.start]) {
                let nodes = this.markNodes[el.start].node.children;
                nodes[1].active = true;
                nodes[0].active = false;
                nodes[2].active = false;
            }
            if (this.markNodes[el.end]) {
                let nodes = this.markNodes[el.end].node.children;
                nodes[1].active = true;
                nodes[0].active = false;
                nodes[2].active = false;
            }
        })

        info.high.forEach(el => {
            if (this.markNodes[el.start]) {
                let nodes = this.markNodes[el.start].node.children;
                nodes[2].active = true;
                nodes[0].active = false;
                nodes[1].active = false;
            }
            if (this.markNodes[el.end]) {
                let nodes = this.markNodes[el.end].node.children;
                nodes[2].active = true;
                nodes[0].active = false;
                nodes[1].active = false;
            }
        })

    }


    start() {
        if (GameCfg.GameType) {
            this.onAddMard({ type: 1, index: GameData.huizhidatas });
            if (!GameCfg.GAMEFUPAN) {
            }
            else {
                this.onMarkAllShow();
            }
        }

    }

    onMarkRangeShowOrHide() {

        this.markNodes.forEach((el, i) => {
            if (el && el.node) {
                if (i < GameCfg.beg_end[0] || i >= GameCfg.beg_end[1]) {
                    el.node.active = false;

                }
            }
        })

        this.bmarkNodes.forEach((el, i) => {
            if (el && el.node) {
                if (i < GameCfg.beg_end[0] || i >= GameCfg.beg_end[1]) {
                    el.node.active = false;

                }
            }
        })

        this.AIMarkNodes.forEach((el, index) => {
            if (el && el.node) {
                if (index < GameCfg.beg_end[0] || index >= GameCfg.beg_end[1]) {
                    el.node.active = false;
                }
            }
        })

        this.startNode.forEach((el, index) => {
            if (el && el.node) {
                if (index < GameCfg.beg_end[0] || index >= GameCfg.beg_end[1]) {
                    el.node.active = false;
                }
            }
        })

        if (this.status == 1) {
            this.mark1Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i < GameCfg.beg_end[0] || i >= GameCfg.beg_end[1]) {
                        el.node.active = false;
                    }
                }
            })
        }
        else if (this.status == 2) {
            this.mark2Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i < GameCfg.beg_end[0] || i >= GameCfg.beg_end[1]) {
                        el.node.active = false;
                    }
                }
            })
        } else if (this.status == 3) {
            this.mark1Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i < GameCfg.beg_end[0] || i >= GameCfg.beg_end[1]) {
                        el.node.active = false;
                    }
                }
            })
            this.mark2Nodes.forEach((el, i) => {
                if (el && el.node) {
                    if (i < GameCfg.beg_end[0] || i >= GameCfg.beg_end[1]) {
                        el.node.active = false;
                    }
                }
            })
        }

    }


    onMarkUpdate(posInfo) {
        this.currPint = posInfo;
        this.onMarkRangeShowOrHide();
        //放大
        this.currScale = GameCfg.hz_width / 15;

        if (this.currScale <= 0.7) {
            this.currScale = 0.7;
        } else if (this.currScale >= 2) {
            this.currScale = 2;
        }

        //开始标签
        if (this.startNode[posInfo.index] && this.startNode[posInfo.index].type == 1) {

            this.startNode[posInfo.index].node.position = posInfo.lowPos;

            if (GameCfg.GAMEFUPAN) {
                this.startNode[posInfo.index].node.active = true;
            }

            this.startNode[posInfo.index].node.scale = this.currScale;
        }

        //AI 标签
        if (this.AIMarkNodes[posInfo.index]) {
            this.AIMarkNodes[posInfo.index].node.position = posInfo.lowPos;
            this.AIMarkNodes[posInfo.index].node.y -= (this.AIMarkNodes[posInfo.index].node.height / 2 + 5)
            if (GameCfg.GAMEFUPAN || GameCfg.GameSet.showSign) {
                this.AIMarkNodes[posInfo.index].node.active = true;
            }
            else if (!GameCfg.GameSet.showSign) {
                this.AIMarkNodes[posInfo.index].node.active = false;
            }

            this.AIMarkNodes[posInfo.index].node.scale = this.currScale;
        }

        //玩家
        if (this.markNodes[posInfo.index]) {

            if (GameCfg.GAMEFUPAN) {
                this.markNodes[posInfo.index].node.active = true;
            }

            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                if (this.markNodes[posInfo.index].type == 2 || this.markNodes[posInfo.index].type == 3) {
                    this.markNodes[posInfo.index].node.position = posInfo.highPos;
                    this.markNodes[posInfo.index].node.y += (this.markNodes[posInfo.index].node.height / 2 + 5)
                }
            }
            else {
                //买入标签
                if (this.markNodes[posInfo.index].type == 2) {
                    this.markNodes[posInfo.index].node.position = posInfo.lowPos;
                    this.markNodes[posInfo.index].node.y -= (this.markNodes[posInfo.index].node.height / 2 + 5)
                }
                //卖出标签
                else if (this.markNodes[posInfo.index].type == 3) {
                    this.markNodes[posInfo.index].node.position = posInfo.highPos;
                    this.markNodes[posInfo.index].node.y += (this.markNodes[posInfo.index].node.height / 2 + 5)
                }
            }
            this.markNodes[posInfo.index].node.scale = this.currScale;
        }

        if (GameCfg.GameType == pb.GameType.JJ_DuoKong) {
            if (this.bmarkNodes[posInfo.index]) {

                if (GameCfg.GAMEFUPAN) {
                    this.bmarkNodes[posInfo.index].node.active = true;
                }

                //买入标签
                if (this.bmarkNodes[posInfo.index].type == 2) {
                    this.bmarkNodes[posInfo.index].node.position = posInfo.lowPos;
                    this.bmarkNodes[posInfo.index].node.y -= (this.bmarkNodes[posInfo.index].node.height / 2 + 5)
                }
                //卖出标签
                else if (this.bmarkNodes[posInfo.index].type == 3) {
                    this.bmarkNodes[posInfo.index].node.position = posInfo.highPos;
                    this.bmarkNodes[posInfo.index].node.y += (this.bmarkNodes[posInfo.index].node.height / 2 + 5)
                }

                this.bmarkNodes[posInfo.index].node.scale = this.currScale;
            }
        }

        //pk 切换
        if (this.status) {

            if (this.mark1Nodes[posInfo.index]) {
                if (this.status == 1 || this.status == 3) {
                    this.mark1Nodes[posInfo.index].node.active = true;
                }
                this.mark1Nodes[posInfo.index].node.position = posInfo.highPos;
                this.mark1Nodes[posInfo.index].node.y += (this.mark1Nodes[posInfo.index].node.height / 2 + 5)
            }

            if (this.mark2Nodes[posInfo.index]) {
                if (this.status == 2 || this.status == 3) {
                    this.mark2Nodes[posInfo.index].node.active = true;
                }
                this.mark2Nodes[posInfo.index].node.position = posInfo.lowPos;
                this.mark2Nodes[posInfo.index].node.y -= (this.mark2Nodes[posInfo.index].node.height / 2 + 5)
            }

        }

    }

    //添加标签
    //1是开始
    //2买入
    //3卖出
    onAddMard(info) {
        let node, inde;
        inde = info.index - 1;
        if (this.status == 1) {
            if (this.mark1Nodes[inde]) { return }
            if (info.type == 2) {
                node = cc.instantiate(this.Zb);
            }
            else if (info.type == 3) {
                node = cc.instantiate(this.Zs);
            }
            node.children[0].active = false;
            node.children[2].active = false;
            this.mark1Nodes[inde] = {
                node: node,
                type: info.type,
            }

        }
        else if (this.status == 2) {
            if (this.mark2Nodes[inde]) { return }
            if (info.type == 2) {
                node = cc.instantiate(this.ZBItem);
            }
            else if (info.type == 3) {
                node = cc.instantiate(this.ZSItem);
            }
            this.mark2Nodes[inde] = {
                node: node,
                type: info.type,
            }
        }
        else if (info.type == 1) {
            if (this.startNode[inde]) { return }
            node = cc.instantiate(this.startItem);
        } else if (info.type == 2) {
            //   if (this.markNodes[inde]) { return }
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                node = cc.instantiate(this.Zb);
            } else {
                node = cc.instantiate(this.bItem);
            }
        } else if (info.type == 3) {
            //  if (this.markNodes[inde]) { return }
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                node = cc.instantiate(this.Zs);
            }
            else {
                node = cc.instantiate(this.sItem);
            }
        }
        //策略買入 
        else if (info.type == 12) {
            if (this.AIMarkNodes[inde]) { return }
            node = cc.instantiate(this.ZBItem);
        }
        //卖出
        else if (info.type == 13) {
            if (this.AIMarkNodes[inde]) { return }
            node = cc.instantiate(this.ZSItem);
        }

        this.node.addChild(node);
        if (!this.status || this.status < 0) {
            if (info.type == 1) {
                this.startNode[inde] = {
                    node: node,
                    type: info.type,
                }

            }

            else if (info.type == 12 || info.type == 13) {
                this.AIMarkNodes[inde] = {
                    node: node,
                    type: info.type,
                };

                if (this.AIMarkNodes[this.currPint.index]) {
                    this.AIMarkNodes[this.currPint.index].node.position = this.currPint.lowPos;
                    this.AIMarkNodes[this.currPint.index].node.y -= (this.AIMarkNodes[this.currPint.index].node.height / 2 + 5)
                    if (GameCfg.GAMEFUPAN || GameCfg.GameSet.showSign) {
                        this.AIMarkNodes[this.currPint.index].node.active = true;
                    }
                    else if (!GameCfg.GameSet.showSign) {
                        this.AIMarkNodes[this.currPint.index].node.active = false;
                    }

                    this.AIMarkNodes[this.currPint.index].node.scale = this.currScale;
                    return;
                }

            } else {
                if (this.markNodes[inde]) {
                    this.bmarkNodes[inde] = {
                        node: node,
                        type: info.type,
                    }
                } else {
                    this.markNodes[inde] = {
                        node: node,
                        type: info.type,
                    };
                }

            }
        }
        node.active = false;
        node.x = -9999;

    }

    //显示所有标签
    onMarkAllShow() {
        this.markNodes.forEach((el, i) => {
            if (el && el.node) {
                //   
                if (i >= GameCfg.beg_end[0] && i < GameCfg.beg_end[1]) {
                    el.node.active = true;

                }
            }
        })

        this.bmarkNodes.forEach((el, i) => {
            if (el && el.node) {
                //   
                if (i >= GameCfg.beg_end[0] && i < GameCfg.beg_end[1]) {
                    el.node.active = true;

                }
            }
        })

        this.AIMarkNodes.forEach((el, index) => {
            if (el && el.node) {
                if (index >= GameCfg.beg_end[0] && index < GameCfg.beg_end[1]) {
                    el.node.active = true;
                }
            }
        })

        this.startNode.forEach((el, index) => {
            if (el && el.node) {
                if (index >= GameCfg.beg_end[0] && index < GameCfg.beg_end[1]) {
                    el.node.active = true;
                }
            }
        })

    }

    onDestroy() {
        GlobalEvent.off(EventCfg.GAMEFUPAN);
        GlobalEvent.off(EventCfg.ONADDMARK);
        GlobalEvent.off(EventCfg.ONMARKUPDATE);
        GlobalEvent.off(EventCfg.ADDMARKHIDEORSHOW);
        GlobalEvent.off(EventCfg.CUTGAMEFUPAN);
        GlobalEvent.off(EventCfg.PKFUPAN);
    }


}
