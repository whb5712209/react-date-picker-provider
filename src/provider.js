import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateBarLabel from './bar'
import DateBoxLabel from './itemBox'
import DateItemLabel from './item'
import DateTitleLabel from './title'
import {
  getDisplayDates,
  toDateWithNoDiscrepancy,
  getMinDate,
  getMaxDate,
  hasSwitchMonth,
  isMonthEqual
} from './calendar'
import { defaultFormat, dayMS, weekFormatter, noop } from './config'

/**
 * 日期非受控组件
 * @param {React.Element} DateBar     日历组件-bar组件 默认值:DateBarLable
 * @param {React.Element} DateTitle   日历组件-bar组件 默认值:DateTitleLable
 * @param {React.Element} DateBox     日历组件-布局组件 默认值:DateBoxLable
 * @param {React.Element} DateItem    日历组件-日期组件 默认值:DateItemLable
 */
export default function DatePickerProvider ({
  DateBar = DateBarLabel,
  DateTitle = DateTitleLabel,
  DateItem = DateItemLabel,
  DateBox = DateBoxLabel,
  DateOther
}) {
  class DatePicker extends Component {
    /**
     * @param {Object} props 
     * @param {String|Number|Date} defaultDate  - 日期对象
     * @param {String|Number|Date} defaultMonth  - 组件显示月份 则内容须可转日期对象
     * @param {String} props.className  - 日期组件盒子 className
     * @param {String} props.dateBarClassName - 日期组件bar盒子 className
     * @param {String} props.dateBoxClassName     - 日期组件日期内容盒子 className
     * @param {String} props.dateTitClassName - 日期组件title盒子 className 
     * @param {String} props.dateClassName  - 日期组件单项盒子 className 
     * @param {Number} props.start          - 日历组件起点 默认是 0
     * @param {Array} props.formatWeek      - 日历组件 星期title展示格式
     */
    constructor (props) {
      super(props)
      const date = toDateWithNoDiscrepancy(props.defaultDate)
      let month = toDateWithNoDiscrepancy(props.defaultMonth)
      if (date) {
        month = date
      } else {
        if (!month) {
          month = toDateWithNoDiscrepancy(new Date())
        }
      }
      this.state = {
        date,
        month
      }
    }
    /**
     * 传入日期返回该日期所在月份所有日期对象数组
     * @param {Date} date  
     */
    onChangeMonth (date) {
      this.setState({
        month: toDateWithNoDiscrepancy(date)
      })
    }
    onSelect (date) {
      this.setState({
        date: date
      })
      this.props.onSelect(date)
    }
    render () {
      const { date, month } = this.state
      const {
        start,
        className,
        dateBarClassName,
        dateTitClassName,
        dateBoxClassName,
        dateClassName,
        formatWeek,
        ...otherProps
      } = this.props
      return (
        <div
          className={`date-picker-wrap ${className}`}
          onClick={(e) => {
            e.stopPropagation()
          }}>
          {DateBar ? (
            <DateBar
              className={dateBarClassName}
              {...otherProps}
              month={month}
              date={date}
              onChange={this.onChangeMonth.bind(this)}
            />
          ) : null}
          <div className='date-picker-cal-box'>
            {DateTitle ? <DateTitle start={start} formatWeek={formatWeek} className={dateTitClassName} /> : null}
            {DateBox ? (
              <DateBox
                start={start}
                formatWeek={formatWeek}
                dateClassName={dateClassName}
                className={dateBoxClassName}
                DateItem={DateItem}
                {...otherProps}
                month={month}
                onSelect={this.onSelect.bind(this)}
                date={date}
              />
            ) : null}
          </div>
          {DateOther ? <DateOther {...otherProps} /> : null}
        </div>
      )
    }
  }
  DatePicker.propTypes = {
    onSelect: PropTypes.func,
    formatWeek: PropTypes.array,
    start: PropTypes.number,
    className: PropTypes.string,
    dateBarClassName: PropTypes.string,
    dateBoxClassName: PropTypes.string,
    dateTitClassName: PropTypes.string,
    dateClassName: PropTypes.string
  }
  DatePicker.defaultProps = {
    onSelect: noop,
    formatWeek: weekFormatter,
    start: 0,
    className: '',
    dateBarClassName: '',
    dateBoxClassName: '',
    dateTitClassName: '',
    dateClassName: '',
    max: '',
    min: ''
  }
  return DatePicker
}
/**
 * 日期受控组件
 * @param {*} params 
 */
export function DatePickerOfControlledProvider ({
  DateBar = DateBarLabel,
  DateTitle = DateTitleLabel,
  DateItem = DateItemLabel,
  DateBox = DateBoxLabel,
  DateOther
}) {
  class DatePicker extends Component {
    /**
     * @param {Object} props 
     * @param {String|Number|Date} date  - 日期对象
     * @param {String|Number|Date} defaultMonth  - 组件显示月份 则内容须可转日期对象
     * @param {String} props.className  - 日期组件盒子 className
     * @param {String} props.dateBarClassName - 日期组件bar盒子 className
     * @param {String} props.dateBoxClassName     - 日期组件日期内容盒子 className
     * @param {String} props.dateTitClassName - 日期组件title盒子 className 
     * @param {String} props.dateClassName  - 日期组件单项盒子 className 
     * @param {Number} props.start          - 日历组件起点 默认是 0
     * @param {Array} props.formatWeek      - 日历组件 星期title展示格式
     */
    constructor (props) {
      super(props)
      const date = toDateWithNoDiscrepancy(props.date)
      let month = toDateWithNoDiscrepancy(props.defaultMonth)
      if (date) {
        month = date
      } else {
        if (!month) {
          month = toDateWithNoDiscrepancy(new Date())
        }
      }
      this.state = {
        month
      }
    }
    componentWillReceiveProps (nextProps) {
      if (nextProps.date !== this.props.date) {
        const month = this.state.month
        if (!isMonthEqual(nextProps.date, month)) {
          const date = toDateWithNoDiscrepancy(nextProps.date)
          this.setState({
            month: date
          })
        }
      }
    }
    /**
     * 传入日期返回该日期所在月份所有日期对象数组
     * @param {Date} date  
     */
    onChangeMonth (date) {
      this.setState({
        month: toDateWithNoDiscrepancy(date)
      })
    }
    render () {
      const { month } = this.state
      const {
        className,
        dateBarClassName,
        dateTitClassName,
        dateBoxClassName,
        dateClassName,
        formatWeek,
        start,
        ...otherProps
      } = this.props
      const date = toDateWithNoDiscrepancy(this.props.date)
      return (
        <div
          className={`date-picker-wrap ${className}`}
          onClick={(e) => {
            e.stopPropagation()
          }}>
          {DateBar ? (
            <DateBar
              month={month}
              className={dateBarClassName}
              {...otherProps}
              date={date}
              onChange={this.onChangeMonth.bind(this)}
            />
          ) : null}
          {DateBox ? (
            <div className='date-picker-cal-box'>
              {DateTitle ? <DateTitle start={start} formatWeek={formatWeek} className={dateTitClassName} /> : null}
              <DateBox
                start={start}
                formatWeek={formatWeek}
                month={month}
                dateClassName={dateClassName}
                className={dateBoxClassName}
                DateItem={DateItem}
                {...otherProps}
                date={date}
              />
            </div>
          ) : null}
          {DateOther ? (
            <DateOther date={date} start={start} formatWeek={formatWeek} month={month} {...otherProps} />
          ) : null}
        </div>
      )
    }
  }
  DatePicker.propTypes = {
    onSelect: PropTypes.func,
    formatWeek: PropTypes.array,
    start: PropTypes.number,
    className: PropTypes.string,
    dateBarClassName: PropTypes.string,
    dateBoxClassName: PropTypes.string,
    dateTitClassName: PropTypes.string,
    dateClassName: PropTypes.string
  }
  DatePicker.defaultProps = {
    onSelect: noop,
    formatWeek: weekFormatter,
    start: 0,
    className: '',
    dateBarClassName: '',
    dateBoxClassName: '',
    dateTitClassName: '',
    dateClassName: '',
    max: '',
    min: '',
    defaultMonth: ''
  }
  return DatePicker
}
