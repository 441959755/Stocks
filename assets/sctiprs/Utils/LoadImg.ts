export default {
    loadImage(url, callback, caller) {
        cc.loader.load(url, function (err, tex) {

            if (tex && tex.height != 0) {
                let spriteFrame = new cc.SpriteFrame(tex);
                callback.call(caller, spriteFrame);
            } else {
                callback.call(caller, null);
            }
        });
    }

// 下载远程图片
downloadRemoteImageAndSave(url, callback, caller) {
        if (url == null || url == "") {
            return;
        }

        if (window.jsb == null) {
            callback.call(caller, null);
        } else {
            let dirpath = jsb.fileUtils.getWritablePath() + 'customRes/';
            let formatedFilename = this.convertPathRemoveDirectory(url);
            if (formatedFilename == null || formatedFilename == "") {
                callback.call(caller, null);
                return;
            }
            let filepath = dirpath + formatedFilename;
            if (!this.isValidCommonSuffix(this.getSuffixFromPath(filepath))) {
                // 防止有的网址不带图片后缀
                filepath += '.png';
            }

            let self = this;
            if (jsb.fileUtils.isFileExist(filepath)) {
                // 图片存在，直接加载
                self.loadImage(filepath, callback, caller);
                return;
            }

            var saveFile = function (data) {
                if (data) {
                    if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
                        // 目录不存在，创建
                        jsb.fileUtils.createDirectory(dirpath);
                    }

                    if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
                        // 成功将下载下来的图片写入本地
                        self.loadImage(filepath, callback, caller);
                    } else {
                        callback.call(caller, null);
                    }
                } else {
                    callback.call(caller, null);
                }
            };
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    saveFile(xhr.response);
                } else {
                    saveFile(null);
                }
            }
        }.bind(this);

        //responseType一定要在外面设置
        xhr.responseType = 'arraybuffer';
        xhr.open("GET", url, true);
        xhr.send();
    }


// 将网址中的"/"转换成"__"
convertPathRemoveDirectory(path) {
        if (path == null) {
            return "";
        }

        let len = path.length;
        path = path.substr(8, len);
        path = path.replace(/\//g, '__');
        return path;
    }
}






getSuffixFromPath: function (path) {
    let index = path.lastIndexOf('.');
    if (index < 0) {
        return "";
    }

    return path.substr(index);
},

isValidCommonSuffix: function (s) {
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
