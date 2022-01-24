import LoadUtils from "../../../sctiprs/Utils/LoadUtils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.WebView)
    webview: cc.WebView = null;


    str = ''

    onShow(title, url) {
        this.title.string = title;

        // this.webview.url = url;
        LoadUtils.loadRes(title, (str) => {
            console.log(str);
        })
    }

    onBtnClick(event, curdata) {
        let name = event.target.name;
        if (name == 'closeBtn') {
            this.node.active = false;
        }
    }
}
