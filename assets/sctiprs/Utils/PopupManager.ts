import LoadUtils from "./LoadUtils";
import ActionUtils from "./ActionUtils";

export default class PopupManager {

    public static popupNodes:Map<string,cc.Node>=new Map();

    //选择加载的Prefa
    public static LoadPopupBox(name,text,call?) {
        LoadUtils.loadRes('Prefabs/' + name, (pre) => {
                let node=cc.instantiate(pre);
                cc.find('Canvas').addChild(node,99);
                // 进场动画
                ActionUtils.openBox(node);

                this.popupNodes[name]=node;

                node.emit('contentText',{text:text,call:call});
        })
    }


    public  static delPopupNode(){
        this.popupNodes.forEach(el=>{
            this.popupNodes[el].destroy();
        })
       this.popupNodes.clear();
    }

    //public static  LoadPop


}