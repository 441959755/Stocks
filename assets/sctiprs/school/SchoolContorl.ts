import { pb } from "../../protos/proto";
import GameCfg from "../game/GameCfg";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";


const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    studyData1 = null;

    studyData2 = null;

    studyData3 = null;

    url = null;

    url1 = null;

    url2 = null;

    assetImgs: Map<string, any> = new Map();

    @property(cc.Node)
    studyNode: cc.Node = null;

    @property(cc.Node)
    studyNode1: cc.Node = null;

    onLoad() {
        PopupManager.init();
        GlobalEvent.on('OPENCURSTUDYBAR', this.openCurStudyBar.bind(this), this);
    }

    openCurStudyBar(index) {
        if (!index) {
            this.studyNode.active = true;
            let handle = this.studyNode.getComponent('StudyHandle').onShow(this.studyData1, this.assetImgs);
        }
        else {
            this.studyNode1.active = true;
            let handle = this.studyNode1.getComponent('StudyHandle1').onShow(this.studyData3, this.assetImgs);
        }

    }

    start() {

        if (!this.studyData1) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            this.url = 'xy/';
            this.onLoadStudyData(this.url);
        }
    }

    //加载要的数据
    onLoadStudyData(url) {
        this.url += GameData.schoolProgress;

        LoadUtils.loadResDir(url, (res) => {
            //console.log('加載：' + JSON.stringify(res[0]));
            this.studyData1 = (res[0].json);
            console.log(this.studyData1);

            this.studyData2 = res[1].json;

            this.studyData3 = res[2].json;

            GlobalEvent.emit('UPDATESTUDYDATA', this.studyData1);
        })

        this.url1 = 'custom/' + GameData.schoolProgress;
        LoadUtils.loadResDir(this.url1, (res) => {

            res.forEach(element => {
                if (element.name) {
                    this.assetImgs.set(element.name, element);
                }
            });

            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })

        this.url1 = 'custom/' + GameData.schoolProgress;
        LoadUtils.loadResDir(this.url1, (res) => {

            res.forEach(element => {
                if (element.name) {
                    this.assetImgs.set(element.name, element);
                }
            });
        })

        this.url2 = 'custom/pic';
        LoadUtils.loadResDir(this.url2, (res) => {
            res.forEach(element => {
                if (element.name) {
                    this.assetImgs.set(element.name, element);
                }
            });
            GlobalEvent.emit(EventCfg.LOADINGHIDE);
        })
    }


    onDestroy() {
        GlobalEvent.off('OPENCURSTUDYBAR');
        GameData.schoolProgress = null;
        PopupManager.delPopupNode();
        LoadUtils.releaseAsset(this.url);
        LoadUtils.releaseAsset(this.url1);
        LoadUtils.releaseAsset(this.url2);
    }

    //保存学习任务进度
    saveStudyProgress(data) {

        let CmdStudyProgress = pb.CmdStudyProgress;
        let message = CmdStudyProgress.create(data);
        let buff = CmdStudyProgress.encode(message).finish();

        socket.send(pb.MessageId.Rep_Hall_SaveStudyProgress, buff, (info) => {
            console.log('学习任务进度' + JSON.stringify(info));
        });

    }




}
