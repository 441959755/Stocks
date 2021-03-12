
export default {

    GOLDCHANGE:'GOLDCHANGE',  //金币改变

    BIRCKCHANGE:'BIRCKCHANGE', //砖石改变

    LEVELCHANGE:"LEVELCHANGE",//等级

    EXPCHANGE:'EXPCHANGE',//经验

    LOADINGSHOW:'LOADINGSHOW',//加载显示

    LOADINGHIDE:'LOADINGHIDE',//加载动画隐藏


    //[{"name":"好利来","code":"002729",
    // "info":{"c":"46.98","h":"47.7","l":"44.86","o":"45.41","a":"4697","v":"21914711","yc":"45.6",
    // "time":"2021-03-11 15:34:03"},
    // "data":[{"day":"2014-12-26","open":"36.40","close":"36.69","high":"37.34","low":"36.40","value":"5307","price":"19914269.00","amplitude":"2.53","Rate":"3.18"},
    // {"day":"2014-12-29","open":"36.71","close":"35.16","high":"37.31","low":"35.01","value":"6773","price":"24502404.00","amplitude":"6.27","Rate":"4.06"},
    // {"day":"2014-12-30","open":"35.16","close":"34.56","high":"35.84","low":"34.36","value":"5836","price":"20815562.00","amplitude":"4.21","Rate":"3.50"},{"day":"2014-12-31","open":"34.41","close":"35.36","high":"35.65","low":"34.28","value":"5591","price":"19867768.00","amplitude":"3.96","Rate":"3.35"},
    // {"day":"2015-01-05","open":"35.08","close":"34.24","high":"35.08","low":"33.49","value":"7461","price":"25856827.00","amplitude":"4.50","Rate":"4.47"},{"day":"2015-01-06","open":"33.74","close":"35.50","high":"35.62","low":"33.74","value":"9209","price":"32691600.00","amplitude":"5.49","Rate":"5.52"},{"day":"2015-01-07","open":"35.36","close":"34.82","high":"35.56","low":"34.46","value":"4939","price":"17523577.00","amplitude":"3.10","Rate":"2.96"},{"day":"2015-01-08","open":"34.84","close":"34.82","high":"35.34","low":"34.48","value":"4747","price":"16963790.00","amplitude":"2.47","Rate":"2.85"},{"day":"2015-01-09","open":"34.82","close":"34.61","high":"35.51","low":"34.60","value":"5641","price":"20072969.00","amplitude":"2.61","Rate":"3.38"},{"day":"2015-01-12","open":"34.35","close":"33.16","high":"34.35","low":"32.93","value":"7033","price":"23976489.00","amplitude":"4.10","Rate":"4.22"},{"day":"2015-01-13","open":"33.16","close":"34.05","high":"34.16","low":"32.70","value":"5845","price":"19990555.00","amplitude":"4.40","Rate":"3.50"},{"day":"2015-01-14","open":"33.71","close":"34.23","high":"34.26","low":"33.61","value":"5957","price":"20650930.00","amplitude":"1.91","Rate":"3.57"},{"day":"2015-01-15","open":"33.86","close":"34.44","high":"34.55","low":"33.46","value":"7173","price":"24981156.00","amplitude":"3.18","Rate":"4.30"},{"day":"2015-01-16","open":"34.23","close":"35.56","high":"35.82","low":"34.07","value":"9166","price":"32817525.00","amplitude":"5.08","Rate":"5.50"},
    // {"day":"2015-01-19","open":"34.77","close":"36.39","high":"36.86","low":"34.77","value":"13443","price":"49291541.00","amplitude":"5.88","Rate":"8.06"},{"day":"2015-01-20","open":"36.39","close":"39.09","high":"39.32","low":"36.16","value":"22710","price":"87720966.00","amplitude":"8.68","Rate":"13.61"},{"day":"2015-01-21","open":"39.26","close":"38.41","high":"39.26","low":"37.94","value":"15519","price":"60549274.00","amplitude":"3.38","Rate":"9.30"},{"day":"2015-01-22","open":"38.14","close":"38.43","high":"38.76","low":"38.07","value":"8261","price":"32303690.00","amplitude":"1.80","Rate":"4.95"},{"day":"2015-01-23","open":"38.48","close":"37.06","high":"38.72","low":"36.97","value":"10225","price":"38988103.00","amplitude":"4.55","Rate":"6.13"},{"day":"2015-01-26","open":"37.07","close":"37.35","high":"37.46","low":"36.96","value":"4686","price":"17743611.00","amplitude":"1.35","Rate":"2.81"},{"day":"2015-01-27","open":"37.65","close":"37.30","high":"37.65","low":"36.94","value":"5663","price":"21424207.00","amplitude":"1.90","Rate":"3.39"},{"day":"2015-01-28","open":"37.16","close":"37.19","high":"37.84","low":"36.73","value":"6863","price":"26105687.00","amplitude":"2.98","Rate":"4.11"},{"day":"2015-01-29","open":"36.97","close":"36.98","high":"37.55","low":"36.71","value":"3451","price":"13045455.00","amplitude":"2.26","Rate":"2.07"},{"day":"2015-01-30","open":"36.70","close":"36.40","high":"37.33","low":"36.36","value":"4831","price":"18061267.00","amplitude":"2.62","Rate":"2.90"},{"day":"2015-02-02","open":"36.40","close":"36.46","high":"36.72","low":"35.95","value":"3272","price":"12107397.00","amplitude":"2.12","Rate":"1.96"},{"day":"2015-02-03","open":"36.73","close":"37.65","high":"37.76","low":"36.61","value":"7561","price":"28726050.00","amplitude":"3.15","Rate":"4.53"},{"day":"2015-02-04","open":"37.71","close":"37.67","high":"38.75","low":"37.66","value":"10217","price":"39668914.00","amplitude":"2.90","Rate":"6.13"},{"day":"2015-02-05","open":"37.41","close":"37.20","high":"38.36","low":"37.18","value":"7055","price":"27016132.00","amplitude":"3.13","Rate":"4.23"},{"day":"2015-02-06","open":"37.01","close":"35.07","high":"37.36","low":"34.42","value":"6869","price":"25143997.00","amplitude":"7.90","Rate":"4.12"},{"day":"2015-02-09","open":"34.81","close":"35.17","high":"36.31","low":"34.81","value":"3099","price":"11207147.00","amplitude":"4.28","Rate":"1.86"},{"day":"2015-02-10","open":"35.18","close":"35.16","high":"35.53","low":"34.87","value":"2833","price":"10153602.00","amplitude":"1.88","Rate":"1.70"},{"day":"2015-02-11","open":"35.16","close":"35.66","high":"35.72","low":"34.84","value":"6325","price":"22614187.00","amplitude":"2.50","Rate":"3.79"},{"day":"2015-02-12","open":"35.69","close":"35.73","high":"35.87","low":"35.48","value":"4751","price":"17248852.00","amplitude":"1.09","Rate":"2.85"},{"day":"2015-02-13","open":"36.04","close":"36.51","high":"36.64","low":"35.77","value":"5158","price":"19111104.00","amplitude":"2.43","Rate":"3.09"},{"day":"2015-02-16","open":"36.56","close":"37.30","high":"37.40","low":"36.39","value":"4541","price":"17090755.00","amplitude":"2.77","Rate":"2.72"},{"day":"2015-02-17","open":"37.26","close":"36.48","high":"37.26","low":"35.96","value":"8051","price":"29806714.00","amplitude":"3.49","Rate":"4.83"},{"day":"2015-02-25","open":"36.48","close":"37.46","high":"37.73","low":"36.38","value":"8366","price":"31766239.00","amplitude":"3.70","Rate":"5.02"},{"day":"2015-02-26","open":"37.44","close":"37.33","high":"37.44","low":"36.98","value":"5500","price":"20840347.00","amplitude":"1.23","Rate":"3.30"},{"day":"2015-02-27","open":"37.46","close":"38.42","high":"38.46","low":"37.23","value":"11821","price":"45707566.00","amplitude":"3.29","Rate":"7.09"},{"day":"2015-03-02","open":"38.36","close":"40.62","high":"40.76","low":"38.12","value":"15309","price":"61540400.00","amplitude":"6.87","Rate":"9.18"},{"day":"2015-03-03","open":"40.36","close":"44.37","high":"44.41","low":"39.65","value":"32547","price":"135724873.00","amplitude":"11.72","Rate":"19.51"},{"day":"2015-03-04","open":"42.86","close":"47.36","high":"47.94","low":"42.36","value":"27548","price":"128807527.00","amplitude":"12.58","Rate":"16.52"},{"day":"2015-03-05","open":"46.27","close":"46.97","high":"47.43","low":"44.63","value":"14147","price":"66324624.00","amplitude":"5.91","Rate":"8.48"},{"day":"2015-03-06","open":"46.49","close":"46.09","high":"47.44","low":"45.16","value":"8344","price":"38864336.00","amplitude":"4.85","Rate":"5.00"},{"day":"2015-03-09","open":"46.01","close":"45.01","high":"46.06","low":"44.37","value":"7005","price":"31927411.00","amplitude":"3.67","Rate":"4.20"},{"day":"2015-03-10","open":"45.01","close":"46.08","high":"46.36","low":"44.95","value":"11501","price":"53330966.00","amplitude":"3.13","Rate":"6.90"},{"day":"2015-03-11","open":"46.36","close":"45.65","high":"46.56","low":"45.41","value":"5823","price":"27152555.00","amplitude":"2.50","Rate":"3.49"},{"day":"2015-03-12","open":"45.55","close":"46.36","high":"46.46","low":"44.69","value":"7649","price":"35449319.00","amplitude":"3.88","Rate":"4.59"},{"day":"2015-03-13","open":"46.73","close":"46.71","high":"46.97","low":"45.97","value":"5428","price":"25620996.00","amplitude":"2.16","Rate":"3.25"},{"day":"2015-03-16","open":"46.78","close":"47.54","high":"48.34","low":"46.78","value":"10265","price":"49420816.00","amplitude":"3.34","Rate":"6.15"},{"day":"2015-03-17","open":"47.36","close":"47.35","high":"47.54","low":"46.21","value":"8514","price":"40525775.00","amplitude":"2.80","Rate":"5.10"},{"day":"2015-03-18","open":"46.82","close":"46.76","high":"47.30","low":"46.37","value":"8312","price":"39367123.00","amplitude":"1.96","Rate":"4.98"},{"day":"2015-03-19","open":"46.75","close":"49.17","high":"49.83","low":"45.82","value":"13818","price":"66506678.00","amplitude":"8.58","Rate":"8.28"},{"day":"2015-03-20","open":"48.66","close":"48.90","high":"49.71","low":"48.37","value":"7704","price":"38214487.00","amplitude":"2.73","Rate":"4.62"},{"day":"2015-03-23","open":"48.62","close":"50.01","high":"50.36","low":"48.36","value":"24669","price":"122719411.00","amplitude":"4.09","Rate":"14.79"},{"day":"2015-03-24","open":"49.55","close":"50.36","high":"50.36","low":"46.43","value":"36609","price":"177736652.00","amplitude":"7.86","Rate":"21.95"},{"day":"2015-03-25","open":"48.76","close":"52.15","high":"53.65","low":"48.39","value":"27702","price":"142301079.00","amplitude":"10.44","Rate":"16.61"},{"day":"2015-03-26","open":"52.22","close":"49.56","high":"53.20","low":"49.37","value":"31692","price":"165585245.00","amplitude":"7.34","Rate":"19.00"},{"day":"2015-03-27","open":"49.22","close":"47.51","high":"49.22","low":"46.76","value":"24311","price":"117880215.00","amplitude":"4.96","Rate":"14.57"},{"day":"2015-03-30","open":"47.23","close":"46.55","high":"47.36","low":"46.43","value":"13540","price":"64230855.00","amplitude":"1.96","Rate":"8.12"},{"day":"2015-03-31","open":"46.70","close":"46.83","high":"47.16","low":"46.40","value":"9543","price":"45207493.00","amplitude":"1.63","Rate":"5.72"},{"day":"2015-04-01","open":"46.92","close":"47.38","high":"47.64","low":"46.78","value":"8504","price":"40581493.00","amplitude":"1.84","Rate":"5.10"},{"day":"2015-04-02","open":"47.48","close":"48.17","high":"48.32","low":"47.01","value":"11904","price":"57463399.00","amplitude":"2.76","Rate":"7.14"},{"day":"2015-04-03","open":"48.35","close":"47.97","high":"48.35","low":"47.36","value":"11884","price":"57724106.00","amplitude":"2.06","Rate":"7.12"},{"day":"2015-04-07","open":"48.05","close":"50.25","high":"50.48","low":"47.87","value":"17877","price":"89301165.00","amplitude":"5.44","Rate":"10.72"},{"day":"2015-04-08","open":"50.36","close":"50.26","high":"51.32","low":"48.82","value":"16713","price":"84877454.00","amplitude":"4.98","Rate":"10.02"},{"day":"2015-04-09","open":"50.05","close":"47.69","high":"50.05","low":"45.36","value":"14093","price":"68037246.00","amplitude":"9.33","Rate":"8.45"},{"day":"2015-04-10","open":"47.54","close":"47.95","high":"48.37","low":"46.86","value":"10275","price":"49878558.00","amplitude":"3.17","Rate":"6.16"},{"day":"2015-04-13","open":"47.95","close":"48.72","high":"49.14","low":"47.16","value":"11433","price":"55880776.00","amplitude":"4.13","Rate":"6.85"},{"day":"2015-04-14","open":"48.68","close":"50.47","high":"51.36","low":"48.61","value":"20814","price":"106137395.00","amplitude":"5.64","Rate":"12.48"},{"day":"2015-04-15","open":"49.86","close":"46.87","high":"49.86","low":"46.83","value":"13542","price":"65388920.00","amplitude":"6.00","Rate":"8.12"},{"day":"2015-04-16","open":"46.00","close":"46.18","high":"47.60","low":"44.87","value":"8474","price":"39603694.00","amplitude":"5.82","Rate":"5.08"},{"day":"2015-04-17","open":"46.66","close":"46.32","high":"47.36","low":"46.26","value":"5957","price":"28167722.00","amplitude":"2.38","Rate":"3.57"},{"day":"2015-04-20","open":"46.31","close":"44.86","high":"46.35","low":"44.86","value":"9216","price":"42415944.00","amplitude":"3.22","Rate":"5.52"},{"day":"2015-04-21","open":"44.86","close":"46.27","high":"46.36","low":"44.85","value":"6433","price":"29737418.00","amplitude":"3.37","Rate":"3.86"},{"day":"2015-04-22","open":"46.64","close":"47.44","high":"47.65","low":"46.64","value":"8717","price":"41713453.00","amplitude":"2.18","Rate":"5.23"},{"day":"2015-04-23","open":"47.46","close":"49.11","high":"50.36","low":"47.46","value":"16473","price":"82456787.00","amplitude":"6.11","Rate":"9.88"},{"day":"2015-04-24","open":"48.28","close":"47.96","high":"48.76","low":"47.17","value":"10292","price":"49930763.00","amplitude":"3.24","Rate":"6.17"},{"day":"2015-04-27","open":"48.16","close":"48.81","high":"49.44","low":"47.69","value":"11641","price":"57727907.00","amplitude":"3.65","Rate":"6.98"},{"day":"2015-04-28","open":"47.36","close":"44.89","high":"47.36","low":"44.84","value":"18492","price":"85511217.00","amplitude":"5.16","Rate":"11.09"},{"day":"2015-04-29","open":"44.90","close":"45.66","high":"45.82","low":"44.67","value":"8000","price":"36916912.00","amplitude":"2.56","Rate":"4.80"},{"day":"2015-04-30","open":"45.66","close":"45.28","high":"46.06","low":"45.18","value":"8991","price":"41440500.00","amplitude":"1.93","Rate":"5.39"},{"day":"2015-05-04","open":"45.49","close":"45.39","high":"45.68","low":"44.97","value":"5628","price":"25832472.00","amplitude":"1.57","Rate":"3.37"},{"day":"2015-05-05","open":"45.36","close":"47.02","high":"48.24","low":"44.57","value":"12580","price":"58486788.00","amplitude":"8.09","Rate":"7.54"},{"day":"2015-05-06","open":"45.86","close":"45.74","high":"47.84","low":"45.74","value":"8390","price":"39716285.00","amplitude":"4.47","Rate":"5.03"},{"day":"2015-05-07","open":"45.66","close":"42.36","high":"45.66","low":"41.36","value":"6506","price":"28937523.00","amplitude":"9.40","Rate":"3.90"},{"day":"2015-05-08","open":"42.37","close":"44.51","high":"44.51","low":"42.37","value":"5937","price":"26219509.00","amplitude":"5.05","Rate":"3.56"},{"day":"2015-05-11","open":"45.40","close":"46.34","high":"46.56","low":"44.87","value":"8876","price":"41256547.00","amplitude":"3.80","Rate":"5.32"},{"day":"2015-05-12","open":"46.46","close":"51.04","high":"51.04","low":"45.92","value":"34400","price":"171656594.00","amplitude":"11.05","Rate":"20.62"},{"day":"2015-05-13","open":"52.67","close":"53.05","high":"56.21","low":"52.16","value":"46909","price":"255429771.00","amplitude":"7.93","Rate":"28.12"},{"day":"2015-05-14","open":"52.65","close":"54.83","high":"55.86","low":"52.26","value":"32172","price":"175765797.00","amplitude":"6.79","Rate":"19.29"},{"day":"2015-05-15","open":"53.66","close":"52.38","high":"54.24","low":"51.76","value":"18415","price":"98628356.00","amplitude":"4.52","Rate":"11.04"},{"day":"2015-05-18","open":"53.04","close":"56.06","high":"57.06","low":"52.43","value":"27053","price":"150677053.00","amplitude":"8.84","Rate":"16.22"},{"day":"2015-05-19","open":"56.36","close":"57.49","high":"58.29","low":"54.06","value":"23092","price":"130873457.00","amplitude":"7.55","Rate":"13.84"},{"day":"2015-05-20","open":"56.76","close":"56.14","high":"59.85","low":"55.76","value":"20034","price":"116761547.00","amplitude":"7.11","Rate":"12.01"},{"day":"2015-05-21","open":"55.91","close":"56.71","high":"57.66","low":"55.38","value":"19613","price":"112235863.00","amplitude":"4.06","Rate":"11.76"},{"day":"2015-05-22","open":"58.34","close":"62.45","high":"62.45","low":"57.83","value":"29929","price":"183674190.00","amplitude":"8.15","Rate":"17.94"},{"day":"2015-05-25","open":"63.45","close":"65.26","high":"68.76","low":"60.91","value":"34740","price":"228424953.00","amplitude":"12.57","Rate":"20.83"},{"day":"2015-05-26","open":"64.21","close":"69.21","high":"70.56","low":"64.00","value":"23062","price":"156841820.00","amplitude":"10.05","Rate":"13.83"},{"day":"2015-05-27","open":"69.06","close":"76.20","high":"76.20","low":"65.61","value":"22994","price":"166453747.00","amplitude":"15.30","Rate":"13.79"},{"day":"2015-05-28","open":"79.37","close":"70.16","high":"83.31","low":"68.56","value":"29727","price":"237965373.00","amplitude":"19.36","Rate":"17.82"},{"day":"2015-05-29","open":"67.26","close":"68.40","high":"73.35","low":"64.36","value":"22788","price":"158835543.00","amplitude":"12.81","Rate":"13.66"},{"day":"2015-06-01","open":"69.26","close":"73.83","high":"74.65","low":"66.42","value":"20839","price":"150737831.00","amplitude":"12.03","Rate":"12.49"},{"day":"2015-06-02","open":"73.36","close":"74.24","high":"77.29","low":"70.36","value":"18418","price":"137183932.00","amplitude":"9.39","Rate":"11.04"},{"day":"2015-06-03","open":"73.52","close":"71.06","high":"73.76","low":"69.77","value":"16410","price":"118563368.00","amplitude":"5.37","Rate":"9.84"},{"day":"2015-06-04","open":"71.06","close":"68.86","high":"71.86","low":"63.89","value":"18792","price":"127638746.00","amplitude":"11.22","Rate":"11.27"},{"day":"2015-06-05","open":"68.86","close":"69.44","high":"70.76","low":"66.94","value":"15679","price":"109232259.00","amplitude":"5.55","Rate":"9.40"},{"day":"2015-06-08","open":"68.97","close":"64.62","high":"70.30","low":"64.16","value":"11332","price":"75366394.00","amplitude":"8.84","Rate":"6.79"},{"day":"2015-06-09","open":"65.21","close":"66.30","high":"66.86","low":"64.37","value":"8983","price":"59719657.00","amplitude":"3.85","Rate":"5.39"},{"day":"2015-06-10","open":"65.86","close":"69.96","high":"71.91","low":"65.27","value":"13513","price":"93936394.00","amplitude":"10.02","Rate":"8.10"},{"day":"2015-06-11","open":"69.56","close":"75.36","high":"76.02","low":"67.67","value":"19393","price":"140076299.00","amplitude":"11.94","Rate":"11.63"},{"day":"2015-06-12","open":"74.36","close":"74.35","high":"75.36","low":"72.36","value":"12830","price":"95874566.00","amplitude":"3.98","Rate":"7.69"},{"day":"2015-06-15","open":"74.86","close":"81.15","high":"81.80","low":"73.36","value":"26277","price":"206117731.00","amplitude":"11.35","Rate":"15.75"},{"day":"2015-06-16","open":"81.06","close":"79.26","high":"81.74","low":"74.93","value":"18069","price":"142434068.00","amplitude":"8.39","Rate":"10.83"},{"day":"2015-06-17","open":"77.14","close":"87.21","high":"87.25","low":"75.36","value":"17396","price":"141124632.00","amplitude":"15.00","Rate":"10.43"},{"day":"2015-06-18","open":"88.36","close":"79.35","high":"92.94","low":"78.48","value":"19758","price":"172847775.00","amplitude":"16.58","Rate":"11.85"},{"day":"2015-06-19","open":"72.95","close":"72.40","high":"78.36","low":"72.40","value":"19176","price":"145346190.00","amplitude":"7.51","Rate":"11.50"},{"day":"2015-06-23","open":"72.96","close":"73.34","high":"75.56","low":"65.56","value":"13245","price":"96046518.00","amplitude":"13.81","Rate":"7.94"},{"day":"2015-06-24","open":"73.58","close":"79.33","high":"80.36","low":"73.58","value":"17950","price":"138705181.00","amplitude":"9.24","Rate":"10.76"},{"day":"2015-06-25","open":"78.36","close":"79.33","high":"80.20","low":"74.15","value":"14183","price":"111050825.00","amplitude":"7.63","Rate":"8.50"},{"day":"2015-06-26","open":"76.76","close":"77.65","high":"77.65","low":"71.53","value":"14680","price":"111072666.00","amplitude":"7.71","Rate":"8.80"},{"day":"2015-06-29","open":"83.35","close":"78.36","high":"83.35","low":"71.36","value":"21431","price":"171173466.00","amplitude":"15.44","Rate":"12.85"},{"day":"2015-06-30","open":"77.36","close":"84.36","high":"85.34","low":"70.46","value":"25519","price":"199514456.00","amplitude":"18.99","Rate":"15.30"},{"day":"2015-07-01","open":"80.36","close":"87.27","high":"90.22","low":"79.44","value":"25891","price":"226963350.00","amplitude":"12.78","Rate":"15.52"},{"day":"2015-07-02","open":"85.36","close":"81.36","high":"87.16","low":"78.48","value":"22659","price":"184173298.00","amplitude":"9.95","Rate":"13.58"},{"day":"2015-07-03","open":"75.42","close":"73.16","high":"77.84","low":"73.16","value":"42006","price":"311203632.00","amplitude":"5.75","Rate":"25.18"},{"day":"2015-07-06","open":"74.38","close":"65.78","high":"79.36","low":"65.78","value":"15682","price":"111389463.00","amplitude":"18.56","Rate":"9.40"},{"day":"2015-07-07","open":"59.14","close":"59.14","high":"59.14","low":"59.14","value":"336","price":"2008608.00","amplitude":"0.00","Rate":"0.20"},{"day":"2015-07-08","open":"53.16","close":"54.41","high":"59.26","low":"53.16","value":"66680","price":"363449008.00","amplitude":"10.31","Rate":"39.98"},{"day":"2015-07-14","open":"59.90","close":"59.90","high":"59.90","low":"59.90","value":"244","price":"1472296.00","amplitude":"0.00","Rate":"0.15"},{"day":"2015-07-15","open":"65.93","close":"54.22","high":"65.93","low":"53.87","value":"16584","price":"99300236.00","amplitude":"20.13","Rate":"9.94"},{"day":"2015-07-16","open":"48.94","close":"53.83","high":"56.11","low":"48.94","value":"10195","price":"54298934.00","amplitude":"13.22","Rate":"6.11"},{"day":"2015-07-17","open":"54.26","close":"57.56","high":"58.22","low":"52.77","value":"9022","price":"50695994.00","amplitude":"10.12","Rate":"5.41"},{"day":"2015-07-20","open":"57.03","close":"58.62","high":"61.36","low":"56.46","value":"11468","price":"68126741.00","amplitude":"8.51","Rate":"6.88"},{"day":"2015-07-21","open":"57.56","close":"59.66","high":"60.03","low":"56.24","value":"7981","price":"47084806.00","amplitude":"6.47","Rate":"4.78"},{"day":"2015-07-22","open":"60.84","close":"61.72","high":"65.30","low":"59.41","value":"8749","price":"54573007.00","amplitude":"9.87","Rate":"5.25"},{"day":"2015-07-23","open":"61.91","close":"63.56","high":"64.56","low":"59.90","value":"9589","price":"60499725.00","amplitude":"7.55","Rate":"5.75"},{"day":"2015-07-24","open":"64.56","close":"62.84","high":"68.06","low":"62.44","value":"11050","price":"72734602.00","amplitude":"8.84","Rate":"6.62"},{"day":"2015-07-27","open":"59.44","close":"56.65","high":"61.96","low":"56.51","value":"9311","price":"55262362.00","amplitude":"8.67","Rate":"5.58"},{"day":"2015-07-28","open":"51.01","close":"54.55","high":"59.01","low":"50.96","value":"6919","price":"38494201.00","amplitude":"14.21","Rate":"4.15"},{"day":"2015-07-29","open":"54.76","close":"57.34","high":"57.56","low":"51.00","value":"7605","price":"41229846.00","amplitude":"12.03","Rate":"4.56"},{"day":"2015-07-30","open":"57.43","close":"58.56","high":"62.84","low":"56.44","value":"12563","price":"76664376.00","amplitude":"11.16","Rate":"7.53"},{"day":"2015-07-31","open":"56.46","close":"56.56","high":"58.17","low":"54.64","value":"4731","price":"26898083.00","amplitude":"6.03","Rate":"2.84"},{"day":"2015-08-03","open":"54.08","close":"51.39","high":"55.36","low":"51.07","value":"5799","price":"30806314.00","amplitude":"7.58","Rate":"3.48"},{"day":"2015-08-04","open":"52.06","close":"55.59","high":"55.59","low":"51.36","value":"5433","price":"29422346.00","amplitude":"8.23","Rate":"3.26"},{"day":"2015-08-05","open":"55.24","close":"56.15","high":"58.05","low":"54.56","value":"5574","price":"31499739.00","amplitude":"6.28","Rate":"3.34"},{"day":"2015-08-06","open":"56.46","close":"61.81","high":"61.81","low":"53.66","value":"17146","price":"104731064.00","amplitude":"14.51","Rate":"10.28"},{"day":"2015-08-07","open":"62.56","close":"68.04","high":"68.04","low":"61.87","value":"20924","price":"141053198.00","amplitude":"9.98","Rate":"12.54"},{"day":"2015-08-10","open":"71.86","close":"69.16","high":"71.86","low":"65.66","value":"16988","price":"116922328.00","amplitude":"9.11","Rate":"10.18"},{"day":"2015-08-11","open":"69.55","close":"66.36","high":"69.67","low":"66.17","value":"11726","price":"80536523.00","amplitude":"5.06","Rate":"7.03"},{"day":"2015-08-12","open":"64.56","close":"65.76","high":"67.52","low":"64.40","value":"11493","price":"76253015.00","amplitude":"4.70","Rate":"6.89"},{"day":"2015-08-13","open":"65.74","close":"71.24","high":"71.56","low":"64.74","value":"16637","price":"116560170.00","amplitude":"10.37","Rate":"9.97"},{"day":"2015-08-14","open":"70.70","close":"71.81","high":"72.56","low":"69.06","value":"8496","price":"59823489.00","amplitude":"4.91","Rate":"5.09"},{"day":"2015-08-17","open":"70.56","close":"73.60","high":"73.91","low":"69.06","value":"7162","price":"51523329.00","amplitude":"6.75","Rate":"4.29"},{"day":"2015-08-18","open":"73.44","close":"69.56","high":"73.44","low":"67.74","value":"27450","price":"196555572.00","amplitude":"7.74","Rate":"16.46"},{"day":"2015-08-19","open":"67.55","close":"72.53","high":"73.68","low":"66.56","value":"22875","price":"159655516.00","amplitude":"10.24","Rate":"13.71"},{"day":"2015-08-20","open":"71.56","close":"65.56","high":"71.56","low":"65.56","value":"5628","price":"39339655.00","amplitude":"8.27","Rate":"3.37"},{"day":"2015-08-21","open":"62.56","close":"68.56","high":"70.06","low":"61.58","value":"16669","price":"112596688.00","amplitude":"12.93","Rate":"9.99"},{"day":"2015-08-24","open":"64.76","close":"62.56","high":"68.61","low":"61.66","value":"7670","price":"48851298.00","amplitude":"10.14","Rate":"4.60"},{"day":"2015-08-25","open":"56.29","close":"56.26","high":"61.54","low":"56.26","value":"4935","price":"28490854.00","amplitude":"8.44","Rate":"2.96"},{"day":"2015-08-26","open":"56.66","close":"58.56","high":"60.56","low":"55.56","value":"6158","price":"36152371.00","amplitude":"8.89","Rate":"3.69"},{"day":"2015-08-27","open":"59.70","close":"59.72","high":"60.91","low":"56.56","value":"4469","price":"26324629.00","amplitude":"7.43","Rate":"2.68"},{"day":"2015-08-28","open":"60.06","close":"63.56","high":"63.86","low":"58.86","value":"6132","price":"37874072.00","amplitude":"8.37","Rate":"3.68"},{"day":"2015-08-31","open":"64.46","close":"64.57","high":"65.56","low":"60.66","value":"5490","price":"34961573.00","amplitude":"7.71","Rate":"3.29"},{"day":"2015-09-01","open":"63.76","close":"60.63","high":"64.46","low":"60.63","value":"4661","price":"28944653.00","amplitude":"5.93","Rate":"2.79"},{"day":"2015-09-02","open":"58.07","close":"60.56","high":"63.34","low":"55.56","value":"6782","price":"40991003.00","amplitude":"12.83","Rate":"4.07"},{"day":"2015-09-07","open":"59.62","close":"59.06","high":"63.20","low":"54.47","value":"24311","price":"139826316.00","amplitude":"14.42","Rate":"14.58"},{"day":"2015-09-08","open":"57.02","close":"59.63","high":"60.53","low":"54.56","value":"5419","price":"31667230.00","amplitude":"10.11","Rate":"3.25"},{"day":"2015-09-09","open":"60.55","close":"59.26","high":"62.42","low":"57.48","value":"15664","price":"92842089.00","amplitude":"8.28","Rate":"9.39"},{"day":"2015-09-10","open":"57.56","close":"58.76","high":"59.75","low":"56.59","value":"7064","price":"41548839.00","amplitude":"5.33","Rate":"4.24"},{"day":"2015-09-11","open":"58.12","close":"57.85","high":"59.56","low":"56.86","value":"5448","price":"31854703.00","amplitude":"4.59","Rate":"3.27"},{"day":"2015-09-14","open":"56.81","close":"52.02","high":"57.85","low":"52.02","value":"6843","price":"37259377.00","amplitude":"10.08","Rate":"3.87"},{"day":"2015-09-15","open":"48.86","close":"46.77","high":"50.36","low":"46.77","value":"7393","price":"36294488.00","amplitude":"6.90","Rate":"4.18"},{"day":"2015-09-16","open":"46.86","close":"49.46","high":"49.96","low":"46.56","value":"16206","price":"79377545.00","amplitude":"7.27","Rate":"9.17"},{"day":"2015-09-17","open":"48.96","close":"44.96","high":"48.96","low":"44.76","value":"11848","price":"55429236.00","amplitude":"8.49","Rate":"6.70"},{"day":"2015-09-18","open":"44.71","close":"43.78","high":"46.25","low":"43.46","value":"7527","price":"33889499.00","amplitude":"6.21","Rate":"4.26"},{"day":"2015-09-21","open":"44.16","close":"44.81","high":"45.00","low":"42.87","value":"7665","price":"34058208.00","amplitude":"4.87","Rate":"4.34"},{"day":"2015-09-22","open":"44.95","close":"44.99","high":"45.85","low":"44.21","value":"7294","price":"33280919.00","amplitude":"3.66","Rate":"4.13"},{"day":"2015-09-23","open":"44.64","close":"46.86","high":"48.06","low":"43.61","value":"13876","price":"64571542.00","amplitude":"9.89","Rate":"7.85"},{"day":"2015-09-24","open":"45.97","close":"46.40","high":"47.50","low":"45.65","value":"6513","price":"30550082.00","amplitude":"3.95","Rate":"3.68"},{"day":"2015-09-25","open":"46.53","close":"43.14","high":"46.86","low":"42.50","value":"8780","price":"39225632.00","amplitude":"9.40","Rate":"4.97"},{"day":"2015-09-28","open":"43.28","close":"44.24","high":"44.40","low":"41.87","value":"4817","price":"21145729.00","amplitude":"5.86","Rate":"2.72"},{"day":"2015-09-29","open":"44.06","close":"43.37","high":"44.06","low":"42.33","value":"3353","price":"14644533.00","amplitude":"3.91","Rate":"1.90"},{"day":"2015-09-30","open":"43.56","close":"43.46","high":"43.92","low":"43.06","value":"2866","price":"12597334.00","amplitude":"1.98","Rate":"1.62"},{"day":"2015-10-08","open":"44.57","close":"45.36","high":"46.16","low":"44.36","value":"7094","price":"32506061.00","amplitude":"4.14","Rate":"4.01"},{"day":"2015-10-09","open":"45.55","close":"44.75","high":"45.55","low":"44.38","value":"14090","price":"63518010.00","amplitude":"2.58","Rate":"7.97"},{"day":"2015-10-12","open":"45.13","close":"46.79","high":"47.55","low":"44.54","value":"14268","price":"66877242.00","amplitude":"6.73","Rate":"8.07"},{"day":"2015-10-13","open":"46.91","close":"47.49","high":"47.88","low":"46.06","value":"9704","price":"46346045.00","amplitude":"3.89","Rate":"5.49"},{"day":"2015-10-14","open":"47.16","close":"46.70","high":"47.66","low":"46.27","value":"7562","price":"35811066.00","amplitude":"2.93","Rate":"4.28"},{"day":"2015-10-15","open":"46.67","close":"48.58","high":"48.76","low":"46.46","value":"9376","price":"44969152.00","amplitude":"4.93","Rate":"5.30"},{"day":"2015-10-16","open":"49.11","close":"48.46","high":"49.11","low":"47.37","value":"8241","price":"40128303.00","amplitude":"3.58","Rate":"4.66"},{"day":"2015-10-19","open":"48.16","close":"48.87","high":"49.24","low":"48.16","value":"12230","price":"60198237.00","amplitude":"2.23","Rate":"6.92"},{"day":"2015-10-20","open":"49.20","close":"48.81","high":"49.20","low":"47.41","value":"9001","price":"44001348.00","amplitude":"3.66","Rate":"5.09"},{"day":"2015-10-21","open":"48.79","close":"45.66","high":"48.86","low":"45.26","value":"11416","price":"54586063.00","amplitude":"7.38","Rate":"6.46"},{"day":"2015-10-22","open":"45.55","close":"46.84","high":"47.06","low":"45.36","value":"7233","price":"33693146.00","amplitude":"3.72","Rate":"4.09"},{"day":"2015-10-23","open":"46.94","close":"49.16","high":"49.79","low":"46.94","value":"14029","price":"69164323.00","amplitude":"6.08","Rate":"7.94"},{"day":"2015-10-26","open":"54.12","close":"54.12","high":"54.12","low":"52.21","value":"24626","price":"132672590.00","amplitude":"3.89","Rate":"13.93"},{"day":"2015-10-27","open":"54.56","close":"53.41","high":"56.11","low":"52.62","value":"22642","price":"124363864.00","amplitude":"6.45","Rate":"12.81"},{"day":"2015-10-28","open":"53.55","close":"51.83","high":"54.80","low":"51.42","value":"14641","price":"79173419.00","amplitude":"6.33","Rate":"8.28"},{"day":"2015-10-29","open":"52.06","close":"51.69","high":"53.45","low":"50.56","value":"9719","price":"50642447.00","amplitude":"5.58","Rate":"5.50"},{"day":"2015-10-30","open":"51.76","close":"52.01","high":"52.76","low":"50.17","value":"9286","price":"48252991.00","amplitude":"5.01","Rate":"5.25"},{"day":"2015-11-02","open":"51.06","close":"52.86","high":"55.55","low":"50.22","value":"13331","price":"71860162.00","amplitude":"10.25","Rate":"7.54"},{"day":"2015-11-03","open":"52.46","close":"53.98","high":"54.96","low":"52.46","value":"11561","price":"63125019.00","amplitude":"4.73","Rate":"6.54"},{"day":"2015-11-04","open":"54.05","close":"56.36","high":"56.55","low":"54.04","value":"12193","price":"68144287.00","amplitude":"4.65","Rate":"6.90"},{"day":"2015-11-05","open":"56.40","close":"55.09","high":"57.05","low":"54.21","value":"10874","price":"60883824.00","amplitude":"5.04","Rate":"6.15"},{"day":"2015-11-06","open":"54.58","close":"59.71","high":"60.06","low":"54.56","value":"11673","price":"67820714.00","amplitude":"9.98","Rate":"6.60"},{"day":"2015-11-09","open":"58.57","close":"61.31","high":"63.74","low":"57.56","value":"11260","price":"68591996.00","amplitude":"10.35","Rate":"6.37"},{"day":"2015-11-10","open":"61.31","close":"61.57","high":"62.46","low":"59.56","value":"8280","price":"50860640.00","amplitude":"4.73","Rate":"4.68"},{"day":"2015-11-11","open":"61.55","close":"63.96","high":"63.96","low":"60.68","value":"18808","price":"117959268.00","amplitude":"5.33","Rate":"10.64"},{"day":"2015-11-12","open":"64.28","close":"65.03","high":"67.44","low":"62.11","value":"17679","price":"113816624.00","amplitude":"8.33","Rate":"10.00"},{"day":"2015-11-13","open":"62.62","close":"59.57","high":"64.53","low":"59.56","value":"15544","price":"97196760.00","amplitude":"7.64","Rate":"8.79"},{"day":"2015-11-16","open":"57.59","close":"61.25","high":"61.55","low":"57.59","value":"5766","price":"35050514.00","amplitude":"6.65","Rate":"3.26"},{"day":"2015-11-17","open":"61.40","close":"59.74","high":"62.96","low":"59.57","value":"7055","price":"43504023.00","amplitude":"5.53","Rate":"3.99"},{"day":"2015-11-18","open":"59.94","close":"57.85","high":"60.54","low":"57.61","value":"5307","price":"31571601.00","amplitude":"4.90","Rate":"3.00"},{"day":"2015-11-19","open":"57.90","close":"60.01","high":"60.06","low":"57.90","value":"5266","price":"31293973.00","amplitude":"3.73","Rate":"2.98"},{"day":"2015-11-20","open":"60.21","close":"61.76","high":"62.62","low":"60.01","value":"7852","price":"48722055.00","amplitude":"4.35","Rate":"4.44"},{"day":"2015-11-23","open":"61.92","close":"61.37","high":"63.15","low":"60.96","value":"8424","price":"52591603.00","amplitude":"3.55","Rate":"4.76"},{"day":"2015-11-24","open":"60.75","close":"64.31","high":"64.56","low":"60.56","value":"12879","price":"81671750.00","amplitude":"6.52","Rate":"7.28"},{"day":"2015-11-25","open":"64.15","close":"66.16","high":"66.55","low":"63.55","value":"17767","price":"116432775.00","amplitude":"4.66","Rate":"10.05"},{"day":"2015-11-26","open":"65.67","close":"65.23","high":"67.11","low":"64.20","value":"12024","price":"79831819.00","amplitude":"4.40","Rate":"6.80"},{"day":"2015-11-27","open":"64.37","close":"62.91","high":"65.43","low":"60.79","value":"14643","price":"93814712.00","amplitude":"7.11","Rate":"8.28"},{"day":"2015-11-30","open":"63.49","close":"69.25","high":"69.25","low":"61.62","value":"15703","price":"103684686.00","amplitude":"12.13","Rate":"8.88"},{"day":"2015-12-01","open":"69.53","close":"72.01","high":"74.39","low":"67.60","value":"19968","price":"145097516.00","amplitude":"9.81","Rate":"11.29"},{"day":"2015-12-02","open":"69.44","close":"68.40","high":"70.46","low":"65.56","value":"10499","price":"71935443.00","amplitude":"6.80","Rate":"5.94"},{"day":"2015-12-03","open":"68.61","close":"70.25","high":"71.26","low":"66.77","value":"6703","price":"47160956.00","amplitude":"6.56","Rate":"3.79"},{"day":"2015-12-04","open":"70.25","close":"68.55","high":"71.86","low":"67.58","value":"6708","price":"46740609.00","amplitude":"6.09","Rate":"3.79"},{"day":"2015-12-07","open":"69.86","close":"69.05","high":"69.86","low":"67.47","value":"5593","price":"38383475.00","amplitude":"3.49","Rate":"3.16"},{"day":"2015-12-08","open":"69.07","close":"69.21","high":"70.56","low":"68.06","value":"6087","price":"42350491.00","amplitude":"3.62","Rate":"3.44"},{"day":"2015-12-09","open":"69.46","close":"67.56","high":"69.46","low":"65.56","value":"7803","price":"52814679.00","amplitude":"5.64","Rate":"4.41"},{"day":"2015-12-10","open":"67.46","close":"66.41","high":"67.55","low":"65.46","value":"6492","price":"43384013.00","amplitude":"3.09","Rate":"3.67"},{"day":"2015-12-11","open":"66.66","close":"67.10","high":"67.36","low":"65.67","value":"3891","price":"26153481.00","amplitude":"2.54","Rate":"2.20"},{"day":"2015-12-14","open":"67.08","close":"71.21","high":"73.85","low":"66.08","value":"8583","price":"61404229.00","amplitude":"11.58","Rate":"4.85"},{"day":"2015-12-15","open":"70.61","close":"72.11","high":"73.02","low":"70.54","value":"5453","price":"39390704.00","amplitude":"3.48","Rate":"3.08"},{"day":"2015-12-16","open":"72.06","close":"71.38","high":"72.91","low":"71.09","value":"5767","price":"41727442.00","amplitude":"2.52","Rate":"3.26"},{"day":"2015-12-17","open":"71.46","close":"72.66","high":"73.55","low":"71.46","value":"6635","price":"48494664.00","amplitude":"2.93","Rate":"3.75"},{"day":"2015-12-18","open":"72.56","close":"75.60","high":"77.53","low":"72.07","value":"9113","price":"68423033.00","amplitude":"7.51","Rate":"5.15"},{"day":"2015-12-21","open":"75.06","close":"74.57","high":"75.81","low":"73.41","value":"4564","price":"34128272.00","amplitude":"3.17","Rate":"2.58"},{"day":"2015-12-22","open":"75.91","close":"74.68","high":"75.96","low":"73.46","value":"3766","price":"28210212.00","amplitude":"3.35","Rate":"2.13"},{"day":"2015-12-23","open":"74.56","close":"72.54","high":"75.13","low":"71.03","value":"7951","price":"58104290.00","amplitude":"5.49","Rate":"4.50"},{"day":"2015-12-24","open":"72.44","close":"72.71","high":"73.26","low":"71.07","value":"3654","price":"26403699.00","amplitude":"3.02","Rate":"2.07"},{"day":"2015-12-25","open":"73.41","close":"72.01","high":"73.41","low":"71.30","value":"5221","price":"37936594.00","amplitude":"2.90","Rate":"2.95"},{"day":"2015-12-28","open":"72.51","close":"79.06","high":"79.26","low":"71.96","value":"19930","price":"151852971.00","amplitude":"10.14","Rate":"11.27"},{"day":"2015-12-29","open":"78.53","close":"76.28","high":"78.53","low":"75.26","value":"8731","price":"67173099.00","amplitude":"4.14","Rate":"4.94"},{"day":"2015-12-30","open":"75.58","close":"74.96","high":"76.25","low":"73.66","value":"6146","price":"46333214.00","amplitude":"3.40","Rate":"3.48"},{"day":"2015-12-31","open":"74.96","close":"75.37","high":"78.04","low":"74.55","value":"6846","price":"52679450.00","amplitude":"4.66","Rate":"3.87"},{"day":"2016-01-04","open":"75.08","close":"68.66","high":"75.08","low":"68.56","value":"5974","price":"43005077.00","amplitude":"8.65","Rate":"3.38"},{"day":"2016-01-05","open":"62.56","close":"68.45","high":"71.86","low":"62.56","value":"11071","price":"75936833.00","amplitude":"13.55","Rate":"6.26"},{"day":"2016-01-06","open":"68.56","close":"68.70","high":"70.33","low":"66.59","value":"5768","price":"39583718.00","amplitude":"5.46","Rate":"3.26"},{"day":"2016-01-07","open":"67.06","close":"61.79","high":"68.24","low":"61.79","value":"1917","price":"12278052.00","amplitude":"9.39","Rate":"1.08"},{"day":"2016-01-08","open":"63.06","close":"60.46","high":"65.04","low":"57.57","value":"6794","price":"41866730.00","amplitude":"12.09","Rate":"3.84"},{"day":"2016-01-11","open":"60.04","close":"54.65","high":"60.04","low":"54.37","value":"15294","price":"85034717.00","amplitude":"9.38","Rate":"8.65"},{"day":"2016-01-12","open":"54.57","close":"55.00","high":"56.56","low":"53.58","value":"5371","price":"29868967.00","amplitude":"5.45","Rate":"3.04"},{"day":"2016-01-13","open":"55.56","close":"53.65","high":"56.86","low":"53.65","value":"3344","price":"18598537.00","amplitude":"5.84","Rate":"1.89"},{"day":"2016-01-14","open":"52.27","close":"58.16","high":"59.01","low":"51.07","value":"5970","price":"33287147.00","amplitude":"14.80","Rate":"3.38"},{"day":"2016-01-15","open":"57.56","close":"56.98","high":"59.53","low":"56.10","value":"2878","price":"16776449.00","amplitude":"5.90","Rate":"1.63"}]}]

}