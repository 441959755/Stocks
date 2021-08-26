import GameData from "../GameData";
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

    onLoad() {

        GlobalEvent.on('UPDATESTUDYDATA', (data1, data2, data3) => {
            this.studyData = data1;
            this.onShow();
        }, this);

    }


    onDestroy() {
        GlobalEvent.off('UPDATESTUDYDATA');
    }

    onShow() {
        this.title && (this.title.string = this.studyData.title);
        this.studysLa.forEach((el, index) => {
            el.string = this.studyData.list[index].title;
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
            GameData.studyBar = curData;
            GlobalEvent.emit('OPENCURSTUDYBAR');
        }

        else if (name == 'study_dtcg') {
            GlobalEvent.emit('OPENCURSTUDYBAR', 1);
        }


    }
}
