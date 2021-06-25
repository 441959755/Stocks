import { pb } from "../../protos/proto";
import GameCfg from "../../sctiprs/game/GameCfg";
import GameCfgText from "../../sctiprs/GameText";
import ComUtils from "../../sctiprs/Utils/ComUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    itemData = null;

    itemIndex = 0;

    @property(cc.Label)
    indexLabel: cc.Label = null;

    @property(cc.Label)
    startLabel: cc.Label = null;

    @property(cc.Label)
    modeLabel: cc.Label = null;

    @property(cc.Label)
    rankLabel: cc.Label = null;

    @property(cc.Label)
    recLabel: cc.Label = null;



    onHisItemRate(flag) {
        this.recLabel.string = '****';
        flag && (this.recLabel.string = (this.itemData.userProfitRate).toFixed(2) + '%')
    }


    onShow() {
        this.indexLabel.string = this.itemIndex + '';
        this.startLabel.string = ComUtils.formatTime(this.itemData.ts);
        this.rankLabel.string = this.itemData.rank;
        // this.recLabel.string = this.itemData.userProfitRate + '%';
        this.recLabel.string = '****';
        if (this.itemData.gType == pb.GameType.ShuangMang) {
            this.modeLabel.string = '双盲训练';
        }
        else if (this.itemData.gType == pb.GameType.DingXiang) {
            this.modeLabel.string = '定向训练';
        }
        else if (this.itemData.gType == pb.GameType.FenShi) {
            this.modeLabel.string = '分时训练';
        }
        else if (this.itemData.gType == pb.GameType.ZhiBiao) {
            this.modeLabel.string = '指标训练';
        }
        else if (this.itemData.gType == pb.GameType.TiaoJianDan) {
            this.modeLabel.string = '条件单训练';
        }
        else if (this.itemData.gType == pb.GameType.QiHuo) {
            this.modeLabel.string = '期货训练';
        }
        else if (this.itemData.gType == pb.GameType.TiaoZhan) {
            this.modeLabel.string = '挑    战';
        }
        else if (this.itemData.gType == pb.GameType.JJ_PK) {
            this.modeLabel.string = 'P K 大战';
        }
        else if (this.itemData.gType == pb.GameType.JJ_DuoKong) {
            this.modeLabel.string = '多空大战';
        }
        else if (this.itemData.gType == pb.GameType.JJ_ChuangGuan) {
            this.modeLabel.string = '闯  关赛';
        }
        else if (this.itemData.gType == pb.GameType.JJ_QiHuo) {
            this.modeLabel.string = '期货大战';
        }
        else if (this.itemData.gType == pb.GameType.MoNiChaoGu) {
            this.modeLabel.string = '模拟炒股';
        }
        else if (this.itemData.gType == pb.GameType.ChaoGuDaSai) {
            this.modeLabel.string = '炒股大赛';
        }
        else if (this.itemData.gType == pb.GameType.GeGuJingChai) {
            this.modeLabel.string = '个股竞猜';
        }
        else if (this.itemData.gType == pb.GameType.DaPanJingChai) {
            this.modeLabel.string = '大盘竞猜';
        }

    }

    onBtnClick(event, data) {
        let name = event.target.name;
        if (name == 'cgs_fupan') {



        }
        else if (name == 'btn_xl') {
            let code = this.itemData.quotesCode;

            let items;
            if (GameCfg.GameType == pb.GameType.QiHuo) {
                items = GameCfgText.getQHItemInfo(code);
            } else {
                items = GameCfgText.getGPItemInfo(code);
            }
            let data = {
                code: code,
                kType: this.itemData.kType,
                kStyle: 0,
                from: this.itemData.kFrom,



            }




        }

    }


}
