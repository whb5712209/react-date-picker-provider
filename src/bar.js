import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { noop, switchMonth, hasSwitchMonth, getMinDate, getMaxDate } from './calendar'
/**
 * @param {Function} onChange 当前月份改变事件
 * @param {Date} month 当前月份
 * @param {Date} max 时间最大边界
 * @param {Date} min 时间最小边界 
 * @param {String} className 盒子样式
 */
export default function DateBar ({ onChange, month, max, min, className }) {
  min = getMaxDate(min)
  max = getMinDate(max)
  const { isLastMonth, isNextMonth } = hasSwitchMonth(month, max, min)
  return (
    <div className={`date-picker-bar-box ${className}`}>
      <button
        className='date-picker-bar-icon'
        disabled={!isLastMonth ? 'disabled' : ''}
        onClick={(e) => {
          onChange(switchMonth(month, -1))
        }}>
        上个月
      </button>
      <div className='date-picker-bar-txt'>{`${month.getFullYear()}年${month.getMonth() + 1}月`}</div>
      <button
        className='date-picker-bar-icon'
        disabled={!isNextMonth ? 'disabled' : ''}
        onClick={() => {
          onChange(switchMonth(month, 1))
        }}>
        下个月
      </button>
    </div>
  )
}
DateBar.propTypes = {
  onChange: PropTypes.func,
  month: PropTypes.instanceOf(Date).isRequired,
  isNextMonth: PropTypes.bool,
  isLastMonth: PropTypes.bool,
  className: PropTypes.string
}
DateBar.defaultProps = {
  onChange: noop,
  isNextMonth: false,
  isLastMonth: false,
  min: '',
  max: '',
  className: ''
}
