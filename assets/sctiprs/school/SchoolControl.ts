import { pb } from "../../protos/proto";
import GameData from "../GameData";
import EventCfg from "../Utils/EventCfg";
import GlobalEvent from "../Utils/GlobalEvent";
import LoadUtils from "../Utils/LoadUtils";
import PopupManager from "../Utils/PopupManager";
import ComUtils from "../Utils/ComUtils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SchoolControl extends cc.Component {

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

    @property(cc.Node)
    closeLayer: cc.Node = null;

    onLoad() {
        //  if (GameData.studyHisBar == 1) {
        GameData.TaskStudy.forEach((el, index) => {
            if (index + 1 == GameData.schoolProgress) {
                if (!el.progress) {
                    GameData.studyHisBar = 1;
                }
                else {
                    GameData.studyHisBar = el.progress;
                }
            }
        });
        // }

        PopupManager.init();

        GlobalEvent.on('OPENCURSTUDYBAR', this.openCurStudyBar.bind(this), this);

        GlobalEvent.on('saveStudyProgress', this.saveStudyProgress.bind(this), this);

        GlobalEvent.on('OPENCLOSELAYER', this.openCloseLayer.bind(this), this);

        this.init();

        ComUtils.resetSize(this.node);

    }


    openCloseLayer(dui, cuo) {
        this.closeLayer.active = true;
        this.closeLayer.getComponent('StudyClose').onShow(dui, cuo);
    }

    openCurStudyBar(index) {
        if (!index) {
            let his = cc.sys.localStorage.getItem('STUDY' + GameData.schoolProgress + '' + GameData.studyBar) || null;
            if (!his) {
                cc.sys.localStorage.setItem('STUDY' + GameData.schoolProgress + '' + GameData.studyBar, 1);
                GlobalEvent.emit('OPENGUIDE')
                return;
            }
            this.studyNode.active = true;
            this.studyNode.getComponent('StudyHandle').onShow(this.studyData1, this.assetImgs, this.studyData2);
        }
        else {
            this.studyNode1.active = true;
            this.studyNode1.getComponent('StudyHandle1').onShow(this.studyData3, this.assetImgs);
        }
    }

    init() {
        if (!this.studyData1) {
            GlobalEvent.emit(EventCfg.LOADINGSHOW);
            this.url = 'xy/';
            this.onLoadStudyData(this.url);
        }
    }

    //加载要的数据
    onLoadStudyData(url) {
        this.url += ('study' + GameData.schoolProgress);

        let falg1 = false, falg2 = false, falg3 = false;
        LoadUtils.loadResDir(this.url, (res) => {
            res.forEach(element => {
                if (element.name == 'Instructions' + GameData.schoolProgress) {
                    this.studyData1 = element.json;
                }
                else if (element.name == 'Instructions' + GameData.schoolProgress + 'dialogue') {
                    this.studyData2 = element.json;
                }
                else if (element.name == 'Instructions' + GameData.schoolProgress + 'question') {
                    this.studyData3 = element.json;
                }

            });

            GlobalEvent.emit('UPDATESTUDYDATA', this.studyData1, this.studyData2);
            falg1 = true;
            if (falg3 && falg1 && falg2) {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            }
        })

        this.url1 = 'custom/' + GameData.schoolProgress;
        LoadUtils.loadResDir(this.url1, (res) => {

            res.forEach(element => {
                if (element.name) {
                    this.assetImgs.set(element.name, element);
                }
            });
            falg2 = true;
            if (falg3 && falg1 && falg2) {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            }
        })

        this.url2 = 'custom/pic';
        LoadUtils.loadResDir(this.url2, (res) => {
            res.forEach(element => {
                if (element.name) {
                    this.assetImgs.set(element.name, element);
                }
            });
            falg3 = true;
            if (falg3 && falg1 && falg2) {
                GlobalEvent.emit(EventCfg.LOADINGHIDE);
            }
        })
    }


    onDestroy() {
        this.studyData1 = null;
        this.studyData2 = null;
        this.studyData3 = null;
        GlobalEvent.off('OPENCURSTUDYBAR');
        GlobalEvent.off('saveStudyProgress');
        GameData.schoolProgress = null;
        PopupManager.delPopupNode();
        LoadUtils.releaseAsset(this.url);
        LoadUtils.releaseAsset(this.url1);
        LoadUtils.releaseAsset(this.url2);
    }

    //保存学习任务进度
    saveStudyProgress(obj) {

        let data = {
            index: GameData.schoolProgress - 1,
            progress: obj.par,
            award: obj.award,
        }

        GameData.TaskStudy[data.index] = data;
        let CmdStudyProgress = pb.CmdStudyProgress;
        let message = CmdStudyProgress.create(data);
        let buff = CmdStudyProgress.encode(message).finish();

        socket.send(pb.MessageId.Req_Hall_SaveStudyProgress, buff, (info) => {
            console.log('学习任务进度' + JSON.stringify(info));
        });

    }

}
