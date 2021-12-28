export default {

    loadImage(url, callback, caller) {
        cc.loader.load(url, function (err, tex) {
            if (tex && tex.height != 0) {
                let spriteFrame = new cc.SpriteFrame(tex);
                callback(caller, spriteFrame);
            } else {
                callback(caller, null);
            }
        });
    },

    // 下载远程图片
    downloadRemoteImageAndSave(url, callback, caller) {

        if (url == null || url == '') {
            return;
        }

        let self = this;

        if (window.jsb) {

            let dirpath = jsb.fileUtils.getWritablePath() + 'customRes/';

            let formatedFilename = this.convertPathRemoveDirectory(url);

            let filepath = dirpath + formatedFilename;

            if (!this.isValidCommonSuffix(this.getSuffixFromPath(filepath))) {
                console.log('防止有的网址不带图片后缀' + filepath);
                filepath += '.png';
            }

            if (jsb.fileUtils.isFileExist(filepath) && caller) {
                console.log('   // 图片存在，直接加载' + filepath);
                this.loadImage(filepath, callback, null);
                return;
            }

            let saveFile = function (data) {
                if (data) {
                    if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
                        console.log('   // 目录不存在，创建');
                        jsb.fileUtils.createDirectory(dirpath);
                    }
                    //writeDataToFile
                    if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                        console.log('// 成功将下载下来的图片写入本地');
                        self.loadImage(filepath, callback, data);
                    }
                }
                else {
                    console.log('Err :data is null');
                }
            };
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //  callback && (callback(xhr.response));
                        saveFile(xhr.response);
                    } else {
                        console.log('xhr.response is null');
                        //   saveFile(null);
                    }
                }
            }.bind(this);

            //responseType一定要在外面设置
            xhr.responseType = 'arraybuffer';
            xhr.open("GET", url, true);
            xhr.send();

        }
        else {
            cc.loader.load(url, function (err, tex) {
                if (tex && tex.height != 0) {

                    let spriteFrame = new cc.SpriteFrame(tex);
                    callback(caller, spriteFrame);
                } else {
                    callback(caller, null);
                }
            });
        }

    }
    ,

    // 将网址中的"/"转换成"__"
    convertPathRemoveDirectory(path) {
        if (path == null) {
            return "";
        }

        let len = path.length;
        path = path.substr(8, len);
        path = path.replace(/\//g, '__');
        return path;
    },

    getSuffixFromPath(path) {
        let index = path.lastIndexOf('.');
        if (index < 0) {
            return "";
        }

        return path.substr(index);
    },

    isValidCommonSuffix(s) {
        if (typeof s !== "string" || s == "" || s == "unknown") {
            return false;
        }

        if (s.length > 4) {
            return false;
        }

        let index = s.indexOf('.');
        if (index == -1) {
            return false;
        }

        return true;
    },
}









