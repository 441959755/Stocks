import GameCfg from "../../../sctiprs/game/GameCfg";

import { pb } from '../../../protos/proto';
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

    onEnable() {
        this.SMNode.active = false;
        this.DXNode.active = false;
        this.QHNode.active = false;
        this.ZBNode.active = false;

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

    }


    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'blackbtn') {
            this.node.active = false;

        }
    }
}
