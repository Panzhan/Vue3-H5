/*
var myDate = new Date();
    myDate.getYear();      //获取当前年份(2位)
    myDate.getFullYear(); //获取完整的年份(4位,1970-????)
    myDate.getMonth();      //获取当前月份(0-11,0代表1月)
    myDate.getDate();      //获取当前日(1-31)
    myDate.getDay();        //获取当前星期X(0-6,0代表星期天)
    myDate.getTime();      //获取当前时间(从1970.1.1开始的毫秒数)
    myDate.getHours();      //获取当前小时数(0-23)
    myDate.getMinutes();    //获取当前分钟数(0-59)
    myDate.getSeconds();    //获取当前秒数(0-59)
    myDate.getMilliseconds(); //获取当前毫秒数(0-999)
    myDate.toLocaleDateString();    //获取当前日期
    var mytime = myDate.toLocaleTimeString();    //获取当前时间
myDate.toLocaleString();      //获取日期与时间----如果涉及到时分秒，直接使用即可。
*/

//获取当前日期
export function getCurrentDate() {
  const curr_date = new Date();
  const currentDate = `${curr_date.getFullYear()}-${curr_date.getMonth() +
    1}-${curr_date.getDate()}`;
  return currentDate;
}
//获取当前时间戳
export function getCurrentDateTime() {
  const curr_date = new Date();
  const time = curr_date.getTime();
  return time;
}

//展示时间
export function showTime(dateStr) {
  dateStr = dateStr.replace(/-/g, "/"); //一般得到的时间的格式都是：yyyy-MM-dd hh24:mi:ss，所以我就用了这个做例子，是/的格式，就不用replace了。
  const end_date = new Date(dateStr); //将字符串转化为时间
  //开始时间
  const curr_date = new Date();
  const num = (curr_date - end_date) / (1000 * 3600 * 24); //求出两个时间的天数时间差
  const days = parseInt(Math.ceil(num)) - 1; //转化为整天

  switch (
    days //天数
  ) {
    case 0: //今天
      return currentDayShowTime(curr_date, end_date);
    case 1: //昨天
      return "昨天";
    case 2: //2天前
      return "两天前";
    case 3: //3天前
      return "三天前";
    case 4: //4天前
      return "四天前";
    case 5: //5天前
      return "5天前";
    case 6: //6天前
      return "6天前";
    default:
      return dateStr;
  }
}

function currentDayShowTime(curr_date, end_date) {
  const num = (curr_date - end_date) / (1000 * 3600); //求出两个时间的小时差
  const hours = parseInt(Math.ceil(num)) - 1; //转化为整小时

  if (hours >= 1) {
    return `${hours}小时前`;
  } else {
    const num = (curr_date - end_date) / (1000 * 60); //求出两个时间的分钟
    const m = parseInt(Math.ceil(num)) - 1; //转化为分钟数
    if (m >= 1) {
      return `${m}分钟前`;
    } else {
      return "刚刚";
    }
  }
}

export function currentWeekShowTime(prefix = "星期") {
  switch (new Date().getDay()) {
    case 0:
      return `${prefix}日`;
    case 1:
      return `${prefix}一`;
    case 2:
      return `${prefix}二`;
    case 3:
      return `${prefix}三`;
    case 4:
      return `${prefix}四`;
    case 5:
      return `${prefix}五`;
    case 6:
      return `${prefix}六`;
    default:
      return "";
  }
}

/**
 *时间转换 date:dateFormat(new Date(result),'yyyy-MM-dd hh:mm'),
 * @export
 * @param {*} dateTime
 * @param {*} fmt
 * @returns
 */
export function dateFormat(dateTime, fmt) {
  const date = new Date(dateTime);
  fmt = fmt || "yyyy-MM-dd";
  const o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  }
  return fmt;
}

export function internationalTime(dateTime) {
  if(!dateTime) {
    return null
  } else {
    var date = new Date(dateTime * 1000)
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() ;
    var hour = date.getHours();
    var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var interMonth = "";
    var interHour = "";
    var noon = ''
    console.log(hour)
    switch (month) {
      case 1:
        interMonth = "Jan";
        break;
      case 2:
        interMonth = "Feb";
        break;
      case 3:
        interMonth = "Mar";
        break;
      case 4:
        interMonth = "Apr";
        break;
      case 5:
        interMonth = "May";
        break;
      case 6:
        interMonth = "Jun";
        break;
      case 7:
        interMonth = "Jul";
        break;
      case 8:
        interMonth = "Aug";
        break;
      case 9:
        interMonth = "Sep";
        break;
      case 10:
        interMonth = "Oct";
        break;
      case 11:
        interMonth = "Nov";
        break;
      case 12:
        interMonth = "Dec";
        break;
    }
    if(hour < 13) {
      noon = 'AM'
      interHour = hour
    } else if(hour >= 13) {
      noon = 'PM'
      interHour = '0' +  (hour - 12) 
    } else {
      noon = ''
      interHour = ''
    }
    return interMonth + ' ' + day + ',' + year + ' ' + interHour + ':' + minute + ' ' + noon
  }
}

// 根据日期判断时间节点。
export function compareTime(selectedTime, currentTime) {
  if (selectedTime && currentTime) {
    const ST = new Date(dateFormat(selectedTime, "yyyy-MM-dd")).getTime();
    const CT = new Date(dateFormat(currentTime, "yyyy-MM-dd")).getTime();
    if (ST === CT) {
      return TIME_STATUS.today;
    } else if (ST < CT) {
      return TIME_STATUS.yesterday;
    } else if (ST > CT) {
      return TIME_STATUS.tomorrow;
    }
  } else {
    // 防止报错
    return TIME_STATUS.today;
  }
}

export const TIME_STATUS = {
  yesterday: "Yesterday",
  today: "Today",
  tomorrow: "Tomorrow",
};

export function formatSeconds(value) {
  var theTime = parseInt(value); // 需要转换的时间秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  var theTime3 = 0; // 天
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
      if (theTime2 > 24) {
        //大于24小时
        theTime3 = parseInt(theTime2 / 24);
        theTime2 = parseInt(theTime2 % 24);
      }
    }
  }
  let result = "";
  if (theTime > 0) {
    result = "" + parseInt(theTime) + "秒";
  }
  if (theTime1 > 0) {
    result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + "小时" + result;
  }
  if (theTime3 > 0) {
    result = "" + parseInt(theTime3) + "天" + result;
  }
  console.log(result, 1111);
  return result;
}
