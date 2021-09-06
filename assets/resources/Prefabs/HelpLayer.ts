import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    SMNode: cc.Node = null;

    @property(cc.Node)
    DXNode: cc.Node = null;

    @property(cc.Node)
    QHNode: cc.Node = null;

    @property(cc.Node)
    ZBNode: cc.Node = null;

    @property(cc.Node)
    ZNXG: cc.Node = null;

    @property(cc.Node)
    MNXGNode: cc.Node = null;

    @property(cc.Node)
    CGDSNode: cc.Node = null;

    @property(cc.Node)
    wwzb: cc.Node = null;  //威望总榜

    @property(cc.Node)
    djph: cc.Node = null;  //等级排行

    @property(cc.Node)
    wwzb1: cc.Node = null;  //威望周榜

    @property(cc.Node)
    sjb: cc.Node = null;  //赛季榜

    @property(cc.Node)
    tjd: cc.Node = null;  //条件单

    onEnable() {

        this.SMNode.active = false;
        this.DXNode.active = false;
        this.QHNode.active = false;
        this.ZBNode.active = false;
        this.ZNXG.active = false;
        this.MNXGNode.active = false;
        this.CGDSNode.active = false;
        this.tjd.active = false;

        if (GameCfg.GameType == pb.GameType.ShuangMang) {
            this.SMNode.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.DingXiang) {
            this.DXNode.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.QiHuo) {
            this.QHNode.active = true;
        }
        else if (GameCfg.GameType == pb.GameType.ZhiBiao) {
            this.ZBNode.active = true
        }

        else if (GameCfg.GameType == 'ZNXG') {
            this.ZNXG.active = true;
        }

        else if (GameCfg.GameType == pb.GameType.MoNiChaoGu) {
            this.MNXGNode.active = true;
        }

        else if (GameCfg.GameType == pb.GameType.ChaoGuDaSai) {
            this.CGDSNode.active = true;
        }

        else if (GameCfg.GameType == 'wwzb') {
            this.wwzb.active = true;
        }

        else if (GameCfg.GameType == 'djph') {
            this.djph.active = true;
        }

        else if (GameCfg.GameType == 'wwzb1') {
            this.wwzb1.active = true;
        }

        else if (GameCfg.GameType == 'sjb') {
            this.sjb.active = true;
        }

        else if (GameCfg.GameType == pb.GameType.TiaoJianDan) {
            this.tjd.active = true;
        }

    }


    onBtnClick(event, data) {

        let name = event.target.name;

        if (name == 'blackbtn') {
            this.node.active = false;
        }
    }
}
