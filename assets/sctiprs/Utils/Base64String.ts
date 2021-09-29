
export default {

    webBase64String(param) {
        var fileList = param.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(fileList);
        reader.onload = function (event) {
            let image = new Image() //新建一个img标签（还没嵌入DOM节点)
            var dataImg = event.target.result;
            var num = 0;
            image.src = event.target.result
            image.onload = function () {
                cc.log(fileList.size)
                //由于不能将太多Base64字符给服务端发过于，咱们压缩一下
                //如果想支持更大图片，请继续加判断，增加除数
                if (fileList.size > 20000000) {
                    cc.log("文件大小不能大于20M！")
                    param.value = '';
                    return;
                } else if (fileList.size > 20000000) {
                    num = 100;
                } else if (fileList.size > 19000000) {
                    num = 95;
                } else if (fileList.size > 18000000) {
                    num = 90;
                } else if (fileList.size > 17000000) {
                    num = 85;
                } else if (fileList.size > 16000000) {
                    num = 80;
                } else if (fileList.size > 15000000) {
                    num = 75;
                } else if (fileList.size > 14000000) {
                    num = 70;
                } else if (fileList.size > 13000000) {
                    num = 65;
                } else if (fileList.size > 12000000) {
                    num = 60;
                } else if (fileList.size > 11000000) {
                    num = 55;
                } else if (fileList.size > 10000000) {
                    num = 50;
                } else if (fileList.size > 9000000) {
                    num = 45;
                } else if (fileList.size > 8000000) {
                    num = 40;
                } else if (fileList.size > 7000000) {
                    num = 35;
                } else if (fileList.size > 6000000) {
                    num = 30;
                } else if (fileList.size > 5000000) {
                    num = 25;
                } else if (fileList.size > 4000000) {
                    num = 20;
                } else if (fileList.size > 3000000) {
                    num = 15;
                } else if (fileList.size > 2000000) {
                    num = 10;
                } else if (fileList.size > 1000000) {
                    num = 5;
                } else if (fileList.size > 500000) {
                    num = 2.5;
                } else if (fileList.size > 250000) {
                    num = 1.5;
                } else {
                    num = 0;
                }
                let canvas = document.createElement('canvas');
                context = canvas.getContext('2d');
                imageWidth = image.width / num;  //压缩后图片的大小
                imageHeight = image.height / num;
                canvas.width = imageWidth;
                canvas.height = imageHeight;
                context.drawImage(image, 0, 0, imageWidth, imageHeight);
                dataImg = canvas.toDataURL('image/jpeg');
                cc.log(dataImg);
                //此时的dataImg就是你要上传给服务器的字符
            }
        };

    }
}