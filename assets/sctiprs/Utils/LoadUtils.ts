
export default class LoadUtils {

    public static loadScene(str) {
        cc.director.loadScene(str);
    }

    public static preLoadScene(str, call?) {
        cc.director.preloadScene(str, call);
    }

    public static addPersistRootNode(str) {
        cc.game.addPersistRootNode(str);
    }


    public static removePersistRootNode(str) {
        cc.game.removePersistRootNode(str);
    }

    public static preloadScene(str, call?) {
        cc.director.preloadScene(str, call);
    }

    public static loadRes(url, call?) {
        // cc.loader.loadRes(url, (err, pre) => {
        cc.loader.loadRes(url, (err, pre) => {
            if (err) {
                console.log('LoadUtils err' + url);
                return;
            }
            call && (call(pre));
        })
    }

    public static releaseRes(url, type?) {
        cc.loader.release(url);
    }

    public static releaseAsset(ins) {
        cc.loader.releaseAsset(ins);
    }

    public static loadResDir(url, call?) {
        cc.loader.loadResDir(url, (com, total, item) => {
            //call&&(call(com/total,false))
        }, (err, res) => {
            if (err) {
                console.log('LoadUtils loadResDir err');
                return;
            }
            call && (call(res, true));
        })
    }


    public static load(url, call?) {
        cc.loader.load(url, (err, res) => {
            if (err) {
                console.log('LoadUtils load err');

                call && (call());
                return;
            }
            call && (call(res));
        })
    }

    public static loadHead(obj, call) {
        cc.loader.load(obj, function (err, tex) {
            call && (call(tex));
        });
    }

    /**
     * 
     * @param parNode 父节点
     * @param node  当前加载节点
     * @param url  地址
     * @param zIndex 
     * @param call 回调
     */
    public static openNode(parNode, node, url, zIndex, call?) {
        if (!node) {
            LoadUtils.loadRes(url, pre => {
                node = cc.instantiate(pre);
                parNode.addChild(node, zIndex);
                call(node);
            })
        }
    }
}