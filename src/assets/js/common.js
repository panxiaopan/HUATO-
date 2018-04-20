///不带时分秒的
export const timeFormattershow = (value) => { 
    let date = new Date(value)
      var y =date.getFullYear();
      var MM =date.getMonth() + 1;
      MM =MM <10 ? ('0'+MM) : MM
      var d =date.getDate();
      d = d < 10 ? ('0'+d) : d
      var h =date.getHours();
      h = h <10 ? ('0' + h) :h
      var m = date.getMinutes()
      m = m>9 ? m : ('0' +m)
     var ss = date.getSeconds()
      ss = ss >9 ? ss : ('0' +ss)
      return y + '-'+MM+'-'+d 
  
    /*return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() +':'+date.getSeconds();*/
  }
  //默认时间七天
  export const SevenDay = (date) => {
    // console.log(date)
  
    let today = new Date(date);
    // console.log(today)
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    today = today.getTime();
    let oneday = 1000 * 60 * 60 * 24;
     
  /* console.log("panpnapan")
   console.log(oneday)*/
    // console.log(today );
    // console.log(oneday)
    return today - oneday * 7;
   /*  return date >9 ?(date) : ("0"+date) */
  }; 

  //带时分秒
