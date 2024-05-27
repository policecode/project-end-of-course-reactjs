export default {
  // YYYY/MM/DD HH:mm:ss
  getCurrentDateTime() {
    const currentTime = new Date();
    return (
      currentTime.getFullYear() +
      "/" +
      this.getNumberWithLeadingZero(currentTime.getMonth() + 1) +
      "/" +
      this.getNumberWithLeadingZero(currentTime.getDate()) +
      " " +
      this.getNumberWithLeadingZero(currentTime.getHours()) +
      ":" +
      this.getNumberWithLeadingZero(currentTime.getMinutes()) +
      ":" +
      this.getNumberWithLeadingZero(currentTime.getSeconds())
    );
  },

  // yyyymm
  getYYYYMM() {
    const currentTime = new Date();
    return (
      currentTime.getFullYear() + "" +
      this.getNumberWithLeadingZero(currentTime.getMonth() + 1)
    );
  },

  getNumberWithLeadingZero(number) {
    return ("0" + number).slice(-2);
  },

  addOrSubMonthYYYY(m) {
    const currentTime = new Date();
    currentTime.setMonth(currentTime.getMonth() + m)
    return (
      currentTime.getFullYear() + "" +
      this.getNumberWithLeadingZero(currentTime.getMonth() + 1)
    );
  },

  // yyyymm
  getYYYY() {
    const currentTime = new Date();
    return (
      currentTime.getFullYear() + ""
    );
  },

  getTimeLastYear(startMonth) {
    let month = 1
    const year = this.getYYYY()*1
    const arrTimeLastYear = []
    for(let i=0; i<12; i++) {
      if(i + startMonth > 12) {
        month = i + startMonth - 12
        arrTimeLastYear.push(year + this.getNumberWithLeadingZero(month))
      } else {
        month = i + startMonth
        arrTimeLastYear.push((year - 1) + this.getNumberWithLeadingZero(month))
      }
    }
    return arrTimeLastYear;
  },
  getDaysBetween2Date(date1, date2) {
    const difference = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(difference / (1000 * 3600 * 24));
  },
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  unixTimestampToDotDate(unixTime) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const dateInput = new Date(unixTime * 1000);
    const year = dateInput.getFullYear()
    const month = dateInput.getMonth() + 1
    const dayOfMonth = dateInput.getDate()
    return `${year}.${month}.${dayOfMonth}`
  },

  // yyyy-mm-dd
  getYYYYMMDD(checkDate,type){
    const time = new Date(checkDate)
    time.setTime(time.getTime() + 1000 * 60 * 60 * 9)

    const yyyy = time.getUTCFullYear();
    const mm = ('00' + (time.getUTCMonth()+1)).slice(-2);
    const dd = ('00' + time.getUTCDate()).slice(-2);
    const yyyymmdd= yyyy + type + mm + type + dd
    return yyyymmdd
  }
}
