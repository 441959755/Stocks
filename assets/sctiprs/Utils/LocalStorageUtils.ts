
export default class LocalStorageUtils{

    public static getItem(key){
        return cc.sys.localStorage.getItem();
    }


    public static setItem(key,val){
        cc.sys.localStorage.setItem(key,val);
    }


    public static removeItem(key){
        cc.sys.localStorage.removeItem(key);
    }
}