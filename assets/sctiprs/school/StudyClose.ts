import { pb } from "../../protos/proto";
import GameData from "../GameData";
import GameCfgText from "../GameText";
import GlobalEvent from "../Utils/GlobalEvent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    tishu: cc.Label = null;

    @property(cc.Label)
    daduiLa: cc.Label = null;

    @property(cc.Label)
    zqlLa: cc.Label = null;

    @property(cc.Label)
    awardLa: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Label)
    levelLabel: cc.Label = null;

    @property(cc.Sprite)
    headImg: cc.Sprite = null;

    @property(cc.Label)
    expLabel: cc.Label = null;

    @property([cc.Node])
    stars: cc.Node[] = [];

    falg = false;

    award = 0;

    onEnable() {
        //用户信息
        this.headImg.spriteFrame = GameData.headImg;
        this.levelLabel.string = 'LV:  ' + GameData.properties[pb.GamePropertyId.Level] || '1';
        let max_exp = GameCfgText.levelInfoCfg[GameData.properties[pb.GamePropertyId.Level]];
        this.expLabel.string = 'EXP:' + GameData.properties[pb.GamePropertyId.Exp] + '/' + max_exp;
        this.userName.string = GameData.userName;
    }

    onShow(dui, cuo) {
        this.award = 0;
        GameData.TaskStudy.forEach((el, index) => {
            if (index + 1 == GameData.schoolProgress) {
                if (el.award) {
                    this.falg = true;
                }
                else {
                    this.falg = false;
                }
            }
        });


        this.stars.forEach(el => {
            el.active = false;
        })

        this.tishu.string = 10 + '';
        this.daduiLa.string = dui;

        let zql = (dui / 10) * 100;
        this.zqlLa.string = zql + '%';

        if (zql < 60) {

        }
        else if (zql >= 60 && zql < 80) {
            this.stars[0].active = true;
            if (!this.falg) {
                this.award = GameCfgText.gameConf.task.study[0].gold;
            }
        }
        else if (zql >= 80 && zql < 100) {
            this.stars[0].active = true;
            this.stars[1].active = true;

            if (!this.falg) {
                this.award = GameCfgText.gameConf.task.study[1].gold;
            }
        }
        else if (zql >= 100) {
            this.stars[0].active = true;
            this.stars[1].active = true;
            this.stars[2].active = true;
            if (!this.falg) {
                this.award = GameCfgText.gameConf.task.study[2].gold;
            }
        }

        if (zql < 60) {
            this.zqlLa.node.color = new cc.Color().fromHEX('#31a633');
        }
        else {
            this.zqlLa.node.color = new cc.Color().fromHEX('#e84848');
        }


        this.awardLa.string = this.award + '金币';
        if (this.award > 0) {
            this.awardLa.node.color = new cc.Color().fromHEX('#e84848');
        }
        else {
            this.awardLa.node.color = cc.Color.WHITE;
        }
        GameData.TaskStudy[GameData.schoolProgress - 1].award = this.award;
        GlobalEvent.emit('saveStudyProgress', this.award);
        GlobalEvent.emit('UPDATESCHOOLUI');
    }


    onBtnClick(event, curData) {
        let name = event.target.name;

        if (name == 'closeBtn') {
            this.node.active = false;
        }

        else if (name == 'lx_jsbt_zlyj') {
            this.node.active = false;
            GlobalEvent.emit('OPENCURSTUDYBAR', 1);
        }

    }
}
