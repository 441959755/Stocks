
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
        cc.loader.loadRes(url, (err, pre) => {
            if (err) {
                console.log('LoadUtils err' + err);
                return;
            }
            call && (call(pre))
        })
    }

    public static releaseRes(url, type?) {
        cc.loader.releaseRes(url, type);
    }

    public static releaseAsset(ins) {
        cc.loader.releaseAsset(ins);
    }

    public static loadResDir(url, call?) {

        cc.loader.loadResDir(url, (com, total, item) => {
            // call&&(call(com/total,false));
        }, (err, res) => {
            if (err) {
                console.log('loadUtils loadResDir err' + err);
                return;
            }
            call && (call(res, true));
        })
    }


    public static load(url, call?) {
        cc.loader.load(url, (err, res) => {
            if (err) {
                console.log('LoadUtils load' + err);
                return;
            }
            call && (call(res));
        })
    }



}