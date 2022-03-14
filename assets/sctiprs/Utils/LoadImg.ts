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

        // if (window.jsb) {

        //     let dirpath = jsb.fileUtils.getWritablePath() + 'customRes/';

        //     let formatedFilename = this.convertPathRemoveDirectory(url);

        //     let filepath = dirpath + formatedFilename;

        //     if (!this.isValidCommonSuffix(this.getSuffixFromPath(filepath))) {
        //         console.log('防止有的网址不带图片后缀' + filepath);
        //         filepath += '.png';
        //     }

        //     if (jsb.fileUtils.isFileExist(filepath) && caller) {
        //         console.log('   // 图片存在，直接加载' + filepath);
        //         this.loadImage(filepath, callback, null);
        //         return;
        //     }

        //     let saveFile = function (data) {
        //         if (data) {
        //             if (!jsb.fileUtils.isDirectoryExist(dirpath)) {
        //                 console.log('   // 目录不存在，创建');
        //                 jsb.fileUtils.createDirectory(dirpath);
        //             }
        //             //writeDataToFile
        //             if (jsb.fileUtils.writeDataToFile(new Uint8Array(data), filepath)) {
        //                 console.log('// 成功将下载下来的图片写入本地');
        //                 self.loadImage(filepath, callback, data);
        //             }
        //         }
        //         else {
        //             console.log('Err :data is null');
        //         }
        //     };

        //     var xhr = new XMLHttpRequest();
        //     xhr.onreadystatechange = function () {
        //         if (xhr.readyState === 4) {
        //             if (xhr.status === 200) {
        //                 //  callback && (callback(xhr.response));
        //                 saveFile(xhr.response);
        //             } else {
        //                 console.log('xhr.response is null');
        //                 //   saveFile(null);
        //             }
        //         }
        //     }.bind(this);

        //     //responseType一定要在外面设置
        //     xhr.responseType = 'arraybuffer';
        //     xhr.open("GET", url, true);
        //     xhr.send();

        // }
        // else {
        cc.loader.load({ url, type: 'jpg' }, function (err, tex) {
            if (tex && tex.height != 0) {

                // let canvas = document.createElement("canvas");
                // let ctx = canvas.getContext("2d");
                // var img = tex.getHtmlElementObj();
                // canvas.width = tex.width;
                // canvas.height = tex.height;
                // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                let spriteFrame = new cc.SpriteFrame(tex);
                callback(tex, spriteFrame);
            } else {
                callback(caller, null);
            }
        });
        //   }

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


    base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    }
}









