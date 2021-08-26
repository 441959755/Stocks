import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property([cc.Label])
    studysLa: cc.Label[] = [];

    @property(cc.Label)
    hisResultLa: cc.Label = null;

    studyData = null;

    @property([cc.Node])
    studyNodes: cc.Node[] = [];

    onLoad() {

        GlobalEvent.on('UPDATESTUDYDATA', (data1, data2, data3) => {
            this.studyData = data1;
            this.onShow();
        }, this);

        GlobalEvent.on('UPDATESCHOOLUI', this.onShow.bind(this), this);

    }

    onDestroy() {
        GlobalEvent.off('UPDATESTUDYDATA');
        GlobalEvent.off('UPDATESCHOOLUI');
    }

    onShow() {
        this.title && (this.title.string = this.studyData.title);
        this.studysLa.forEach((el, index) => {
            el.string = this.studyData.list[index].title;
        })

        if (!GameData.TaskStudy[GameData.schoolProgress - 1].award) {
            this.hisResultLa && (this.hisResultLa.string = '最佳成绩  无')
        }
        else {
            this.hisResultLa && (this.hisResultLa.string = '最佳成绩  ' + GameData.TaskStudy[GameData.schoolProgress - 1].award);
        }

        this.studyNodes.forEach((el, index) => {
            if (index + 1 <= GameData.studyHisBar) {
                el.children[0].active = true;
            }
            else {
                el.children[0].active = false;
            }
        })

    }


    onBtnClick(event, curData) {
        let name = event.target.name;
        if (name == 'btn_black') {
            cc.director.loadScene('hall');
        }

        else if (name == 'study_cszb1' ||
            name == 'study_zbfx1' ||
            name == 'study_yyjq1' ||
            name == 'study_jdal1') {

            if (curData > GameData.studyHisBar) {
                GlobalEvent.emit(EventCfg.TIPSTEXTSHOW, '请先学习前一张');
                return;
            }
            GameData.studyBar = curData;
            GlobalEvent.emit('OPENCURSTUDYBAR');
        }

        else if (name == 'study_dtcg') {
            GlobalEvent.emit('OPENCURSTUDYBAR', 1);
        }


    }
}
