
export default class LoadUtils {

    public static loadScene(str) {
        cc.director.loadScene(str);
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
        cc.resources.load(url, (err, pre) => {
            if (err) {
                console.log('LoadUtils err');
                return;
            }
            call && (call(pre));
        })
    }

    public static releaseRes(url, type?) {
        cc.resources.release(url);
    }

    public static releaseAsset(ins) {
        cc.assetManager.releaseAsset(ins);
    }

    public static loadResDir(url, call?) {
        cc.resources.loadDir(url, (com, total, item) => {
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
        cc.assetManager.loadRemote(url, (err, res) => {
            if (err) {
                console.log('LoadUtils load err');
                return;
            }
            call && (call(res));
        })
    }



}