

export default {

    /**
     * 
     * @param dateStr   2001-01-01
     * @returns       时间戳
     */
    dateToTimestamp(dateStr) {
        if (!dateStr) {
            return 0;
        }
        let newDataStr = dateStr.replace(/\.|\-/g, '/')
        let date = new Date(newDataStr);
        let timestamp = date.getTime();
        return timestamp
    },

    /**
     * 
     * @param from   开始时间戳
     * @param end    结束时间戳
     * @returns      天数
     */
    GetDay(from, end) {
        return parseInt((end - from) / 24 / 60 / 60 / 1000 + '');
    },

    /**
     * 
     * @param data 时间戳
     * @returns ‘20010101’
     */
    getYYMMDD(data) {
        if (!data) {
            return;
        }

        let f = new Date(data);

        let y = f.getFullYear();
        let m = f.getMonth() + 1 >= 10 ? f.getMonth() + 1 : '0' + (f.getMonth() + 1);
        let d = f.getDate() >= 10 ? f.getDate() : '0' + (f.getDate());

        return y + '' + m + '' + d;
    }

}