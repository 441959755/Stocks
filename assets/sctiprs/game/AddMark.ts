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

    markNodes = [];

    ratio = 1;

    rWidth = 0;
    rHeight = 0;

    onLoad() {
        this.node.removeAllChildren();

        GlobalEvent.on(EventCfg.ONADDMARK, this.onAddMard.bind(this), this);

        GlobalEvent.on(EventCfg.GAMEFUPAN, this.onMarkAllShow.bind(this), this);

        GlobalEvent.on(EventCfg.ONMARKUPDATE, this.onMarkUpdate.bind(this), this);

        GlobalEvent.on(EventCfg.ADDMARKHIDEORSHOW, (flag) => { this.node.active = flag }, this);

        GlobalEvent.on(EventCfg.SETMARKCOLOR, this.setMarkColor.bind(this), this);
    }

    //
    setMarkColor() {
        let info = StrategyAIData.onCompareReult();

        info.low.forEach(el => {
            if (this.markNodes[el.start]) {
                let nodes = this.markNodes[el.start].children;
                nodes[0].active = true;
                nodes[1].active = false;
                nodes[2].active = false;
            }
            if (this.markNodes[el.end]) {
                let nodes = this.markNodes[el.end].children;
                nodes[0].active = true;
                nodes[1].active = false;
                nodes[2].active = false;
            }
        })

        info.middle.forEach(el => {
            if (this.markNodes[el.start]) {
                let nodes = this.markNodes[el.start].children;
                nodes[1].active = true;
                nodes[0].active = false;
                nodes[2].active = false;
            }
            if (this.markNodes[el.end]) {
                let nodes = this.markNodes[el.end].children;
                nodes[1].active = true;
                nodes[0].active = false;
                nodes[2].active = false;
            }
        })

        info.high.forEach(el => {
            if (this.markNodes[el.start]) {
                let nodes = this.markNodes[el.start].children;
                nodes[2].active = true;
                nodes[0].active = false;
                nodes[1].active = false;
            }
            if (this.markNodes[el.end]) {
                let nodes = this.markNodes[el.end].children;
                nodes[2].active = true;
                nodes[0].active = false;
                nodes[1].active = false;
            }
        })

    }


    onEnable() {
        if (!GameCfg.GAMEFUPAN) {
            //添加开始标签
            this.onAddMard({ type: 1, index: GameCfg.huizhidatas });
        }
        else {
            this.onAddMard({ type: 1, index: GameData.huizhidatas });
        }
    }

    onMarkRangeShowOrHide() {
        this.markNodes.forEach((el, i) => {
            if (el && el.node) {
                if (i < cc.ext.beg_end[0] || i >= cc.ext.beg_end[1]) {
                    el.node.active = false;
                }
            }
        })
    }


    onMarkUpdate(posInfo) {
        this.onMarkRangeShowOrHide();
        if (this.markNodes[posInfo.index]) {

            //  if (GameCfg.GAMEFUPAN) {
            this.markNodes[posInfo.index].node.active = true;
            //  }

            //开始标签
            if (this.markNodes[posInfo.index - 1] && this.markNodes[posInfo.index - 1].type == 1) {

                this.markNodes[posInfo.index - 1].node.position = posInfo.lowPos;
                // this.markNodes[posInfo.index].node.x += cc.ext.hz_width;

            }
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                if (this.markNodes[posInfo.index].type == 2 || this.markNodes[posInfo.index].type == 3) {
                    this.markNodes[posInfo.index].node.position = posInfo.highPos;
                    this.markNodes[posInfo.index].node.y += (this.markNodes[posInfo.index].node.height / 2 + 5)
                }
                else {
                    this.markNodes[posInfo.index].node.position = posInfo.lowPos;
                    this.markNodes[posInfo.index].node.y -= (this.markNodes[posInfo.index].node.height / 2 + 5)
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

            //放大
            let s = cc.ext.hz_width / 14;

            if (s <= 0.7) {
                s = 0.7;
            } else if (s >= 1.5) {
                s = 2;
            }
            this.markNodes[posInfo.index].node.scale = s;
        }
    }

    //添加标签
    //1是开始
    //2买入
    //3卖出
    onAddMard(info) {

        let node, inde;

        if (info.type == 1) {
            inde = info.index - 2;
            if (this.markNodes[inde]) { return }
            node = cc.instantiate(this.startItem);
            this.ratio = node.height / node.width;
            this.rWidth = node.width;
            this.rHeight = node.height;

        } else if (info.type == 2) {
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                node = cc.instantiate(this.Zb);
            } else {
                node = cc.instantiate(this.bItem);
            }

            inde = info.index - 1;
        } else if (info.type == 3) {
            if (GameCfg.GameType == pb.GameType.ZhiBiao) {
                node = cc.instantiate(this.Zs);
            }
            else {
                node = cc.instantiate(this.sItem);
            }

            inde = info.index - 1;
        }
        //策略買入 
        else if (info.type == 12) {
            node = cc.instantiate(this.ZBItem);
            inde = info.index - 1;
        }
        //卖出
        else if (info.type == 13) {
            node = cc.instantiate(this.ZSItem);
            inde = info.index - 1;
        }

        else {
            return;
        }
        this.node.addChild(node);


        this.markNodes[inde] = {
            node: node,
            type: info.type,
        };

        node.active = false;
        node.x = -9999;
    }

    //显示所有标签
    onMarkAllShow() {

        this.markNodes.forEach((el, i) => {
            if (el && el.node) {
                //   
                if (i >= cc.ext.beg_end[0] && i < cc.ext.beg_end[1]) {
                    el.node.active = true;
                }
            }
        })
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
        GlobalEvent.off(EventCfg.ADDMARKHIDEORSHOW);
    }

}
