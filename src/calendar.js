import { weekFormatter } from './config'
/**
 * @param {Date} date 日期(正常情况)
 * @param {Number} increment 多少个月 // increment 递增
 * @return {Date}  (+/-)N月后的起始日期s
 */
export function switchMonth (date, increment = 0) {
  let month = date.getMonth() + increment,
    year = date.getFullYear()
  return new Date(`${year}`, `${month}`)
}
/**
 * 获得某日期所在月的最后一天
 * @param {Date} date  日期
 * @return {Date} date 该月份的最后一天
 */
export function getLastDayaOfMonth (date) {
  const month = date.getMonth(),
    year = date.getFullYear()
  return new Date(year, month, monthSize(date))
}
/**
 * [monthSize 获得指定日期所在月的天数]
 * @param  {[Date]} oDate [指定的日期，非必填，默认为当天]
 * @return {[Int]}       [总天数]
 */
function monthSize (oDate) {
  oDate = oDate ? oDate : new Date()
  let year = oDate.getFullYear(),
    month = oDate.getMonth(),
    _oDate = new Date()
  _oDate.setFullYear(year)
  _oDate.setMonth(month + 1, 0)
  return _oDate.getDate()
}
/**
 * 判断是否可转成Date对象
 * @param {String|Number|Date} date 
 */
export function isValidDate (date) {
  date = date instanceof Date ? date : new Date(date)
  if (isNaN(date.getTime())) {
    return false
  }
  return true
}
/**
 * 格式转换成Date类型 非时间类型将变成 空 '' 抛出 
 * @param {String|Number|Date} date 
 */
export function toResponsibleDate (date) {
  if (isValidDate(date)) {
    return date instanceof Date ? date : new Date(date)
  }
  return ''
}
/**
 * 无忧转换 - 不负责是否是正确的时间格式
 * @param {String|Number|Date} date 
 */
export function toCarefreeDate (date) {
  return date instanceof Date ? date : new Date(date)
}
/**
 * 转换日期对象 忽略 时分秒的影响
 * @param {Date} date 
 */
export function toDateWithNoDiscrepancy (date) {
  if (isValidDate(date)) {
    date = toCarefreeDate(date)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
  return ''
}
/**
 * 找出最大日期
 * @param {Array[Date]|Date} min 
 */
export function getMaxDate (min) {
  if (Array.isArray(min)) {
    const list = min.map((i) => toResponsibleDate(i)).filter((i) => i).map((i) => toDateWithNoDiscrepancy(i).getTime())
    if (list.length > 0) {
      return toDateWithNoDiscrepancy(Math.max.apply(null, list))
    } else {
      return ''
    }
  } else {
    return toDateWithNoDiscrepancy(min)
  }
}
/**
 * 找出最小日期
 * @param {Array[Date]|Date} max 
 */
export function getMinDate (max) {
  if (Array.isArray(max)) {
    const list = max.map((i) => toDate(i)).filter((i) => i).map((i) => toDateWithNoDiscrepancy(i).getTime())
    if (list.length > 0) {
      return toDateWithNoDiscrepancy(Math.min.apply(null, list))
    } else {
      return ''
    }
  } else {
    return toDateWithNoDiscrepancy(max)
  }
}
/**
 * 对比日期大小
 * @param { Date } targetDate   目标日期
 * @param { Date } sourceDate   源日期
 * @returns number: 0:目标日期 === 源日期;1:目标日期 < 源日期;2:目标日期>源日期;3:两者都非时间格式
 */
export function getCompareDate (targetDate, sourceDate) {
  //compareDate
  const source = toDateWithNoDiscrepancy(sourceDate)
  const target = toDateWithNoDiscrepancy(targetDate)
  if (isDateEqual(targetDate, sourceDate)) {
    return 0
  }
  return target < source ? 1 : 2
}
/**
 * @param {Date} month 当前月份(当前日期所在月份)
 * @param {Date} max 最大日期
 * @param {Date} min 最小日期
 * @returns {Boolean} isLastMonth 上个月是否有可选值
 * @returns {Boolean} isNextMonth 下个月是否有可选值
 */
export function hasSwitchMonth (month, max, min) {
  const lastMonth = switchMonth(month, -1)
  const nextMonth = switchMonth(month, 1)
  return {
    isLastMonth: min ? min < getLastDayaOfMonth(lastMonth) : true,
    isNextMonth: max ? max > nextMonth : true
  }
}
/**
 * 查看是否在同一天 
 * @param {Date} sourceDate 源日期
 * @param {Date} targetDate 目标日期
 */
export function isDateEqual (sourceDate, targetDate) {
  //isDateEqual
  const source = toDateWithNoDiscrepancy(sourceDate)
  const target = toDateWithNoDiscrepancy(targetDate)
  if (!source || !target) {
    return false
  }
  return !(source > target) && !(source < target) && !(source === target)
}
/**
 * 查看是否在同一月 
 * @param {Date} sourceDate 源日期
 * @param {Date} targetDate 目标日期
 */
export function isMonthEqual (sourceDate, targetDate) {
  // isMonthEqual
  const source = toDateWithNoDiscrepancy(sourceDate)
  const target = toDateWithNoDiscrepancy(targetDate)
  if (!source || !target) {
    return false
  }
  const sourceYear = source.getFullYear()
  const sourceMonth = source.getMonth()
  const targetYear = target.getFullYear()
  const targetMonth = target.getMonth()
  return sourceYear === targetYear && sourceMonth === targetMonth
}
/**
 * 查看是否在同一年 
 * @param {Date} sourceDate 源日期
 * @param {Date} targetDate 目标日期
 */
export function isYearEqual (sourceDate, targetDate) {
  const source = toDateWithNoDiscrepancy(sourceDate)
  const target = toDateWithNoDiscrepancy(targetDate)
  if (!source || !target) {
    return false
  }
  const sourceYear = source.getFullYear()
  const targetYear = target.getFullYear()
  return sourceYear === targetYear
}
/**
 * @param {Date} dataToMath 当前日期所在月份的日期列表
 * @param {Number} start 日历起始(周几开始) 0:日,1:1,2:2,3:3,4:4,5:5,6:6 默认:0
 * @param {Array} weekFormatter 用于转译 格式与默认保持一致
 */
export function getDisplayDates (dataToMath, start = 0, formatWeek = weekFormatter) {
  dataToMath = dataToMath ? dataToMath : new Date()
  formatWeek = formatWeek.sort((agrn1, agrn2) => agrn1.key > agrn2.key).map((i) => i)
  const y = dataToMath.getFullYear()
  const m = dataToMath.getMonth()
  const days = monthSize(dataToMath) //当月天数
  const first = new Date(y, m, 1) //本月 第一天 日期对象
  const firstWeek = new Date(y, m, 1).getDay() // 本月第一天 周几
  const last = new Date(y, m, days) //本月 第一天 日期对象
  const lastWeek = new Date(y, m, days).getDay() // 本月第一天 周几
  const prevMonthDays = monthSize(new Date(y, m - 1)) //上月天数
  formatWeek = formatWeek.concat(formatWeek.splice(0, formatWeek.findIndex((item) => item.key === start)))
  const prevNum = formatWeek.findIndex((item) => item.key === firstWeek) //本月之前还有几天
  const LastNum = formatWeek.length - formatWeek.findIndex((item) => item.key === lastWeek) //月末之前还有几天
  let monthDateList = [],
    monthDates = []
  let i = 0,
    date
  // 本月之前还有几天
  for (i = 1; i <= prevNum; i++) {
    date = new Date(y, m, i - prevNum)
    monthDateList.push({
      isCurMonth: false,
      dateNum: date.getDate(), // 日期一月第几天
      day: date.getDay(), // 一周第几天
      date: date //日期对象
    })
  }
  // 本月日期
  for (i = 1; i <= days; i++) {
    date = new Date(y, m, i)
    monthDateList.push({
      isCurMonth: true,
      dateNum: date.getDate(),
      day: date.getDay(),
      date: date
    })
  }
  // 本月之后日期
  for (i = 1; i < LastNum; i++) {
    date = new Date(y, m + 1, i)
    monthDateList.push({
      isCurMonth: false,
      dateNum: date.getDate(),
      day: date.getDay(),
      date: date
    })
  }
  monthDateList.forEach((item, index) => {
    let _index = Number.parseInt(index / 7)
    monthDates[_index] = monthDates[_index] ? monthDates[_index] : []
    monthDates[_index].push(Object.assign(item, { weekIndex: _index }))
  })
  return monthDates
}
export function getDisplayWeek (start = 0, formatWeek = weekFormatter) {
  const displayWeek = formatWeek.sort((agrn1, agrn2) => agrn1.key > agrn2.key).map((i) => i)
  return displayWeek.concat(displayWeek.splice(0, displayWeek.findIndex((item) => item.key === start)))
}
/**
 * [getDateStr 获得指定日期格式的字符串]
 * @param  {[String or Date]}  date  
 * [要转换的日期，必填, String须为ISO时间字符串2016-01-01T14:16:00+08:00]
 * @param  {[String]}  format     
 * [要转化的目标格式，必填。其中 YYYY/yyyy代表年,MM代表月,DD/dd代表日。hh/HH代表时，mm代表分，ss/SS代表秒，Z代表时区,O代表数字时区（+08:00）
 * example
 * input: '2016-01-01T14:16:00+08:00','YYYY年MM月DD日 hh:mm:ss (Z)'
 * output: 2016年01月01日 14:16:00 (CTS)
 * ]
 */
export function getDateStr (date, format) {
  if (!(date instanceof Date)) {
    console.log(date)
    throw new Error('date is required')
  }
  const _dateStr = date.toString() //浏览器时间字符串
  if (/invalid/i.test(_dateStr)) {
    throw new Error('Invalid Date')
  }
  let returnStr = '',
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    weekday = date.getDay()
  const patternI = /(yyyy)|(dd)|(hh)|(ss)|(Z)|(d)|(h)|(s)|(o)|(w)/gi,
    pattern = /(MM)|(mm)|(M)|(m)/g

  //替换年、日、小时、秒、时区
  returnStr = format.replace(patternI, (match, ...args) => {
    let [ p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, ...rest ] = args
    if (p1) return year
    if (p2) return zeroPadding(day)
    if (p3) return zeroPadding(hour)
    if (p4) return zeroPadding(second)
    if (p5) {
      const timeZone = _dateStr.match(/\((.*)\)$/)[1]
      if (timeZone) return timeZone
      else return `${p5}`
    }
    if (p6) return day
    if (p7) return hour
    if (p8) return second
    if (p9) {
      const offset = -date.getTimezoneOffset()
      const isNegative = offset < 0
      const offsetByHours = Math.floor(offset / 60)
      const offsetByMins = Math.floor(offset % 60)
      const offsetByHoursAbs = zeroPadding(Math.abs(offsetByHours))
      const offsetByMinsAbs = zeroPadding(Math.abs(offsetByMins))
      return isNegative ? `-${offsetByHoursAbs}:${offsetByMinsAbs}` : `+${offsetByHoursAbs}:${offsetByMinsAbs}`
    }
    if (p10) {
      const weekdays = [ '日', '一', '二', '三', '四', '五', '六' ]
      return weekdays[weekday]
    }
  })
  //替换月、分钟
  returnStr = returnStr.replace(pattern, (match, p1, p2, p3, p4) => {
    if (p1) return zeroPadding(month)
    if (p2) return zeroPadding(minute)
    if (p3) return month
    if (p4) return minute
  })
  return returnStr
}
/**
 * [zeroPadding 小于10的数字补0，必填]
 * @param  {[Int]} value [description]
 * @return {[String]}       [description]
 */
export function zeroPadding (value) {
  return value < 10 ? `0${value}` : `${value}`
}
