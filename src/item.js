import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isDateEqual, getCompareDate, getMaxDate, getMinDate } from './calendar'
import { noop } from './config'
/**
 * @param {Date} min  最小日期边界
 * @param {Date} max  最大日期边界
 * @param {Date} selectDate 已选日期
 * @param {Date} date  当前日期
 * @param {Boolean} isCurMonth 是否是当前月份
 * @param {Number} dateNum  当月第几天
 * @param {Function} onSelect 选中事件
 * @param {String} className 外层样式
 */
export default function DateItem ({ min, max, isCurMonth, selectDate, dateNum, onSelect, date, className }) {
  min = getMaxDate(min)
  max = getMinDate(max)
  const isSelect = isDateEqual(selectDate, date)
  const maxType = max ? getCompareDate(date, max) : 1 // 0 : date === max ; 1: date < max ; 2 : date > max
  const minType = min ? getCompareDate(date, min) : 2 // 0 : date === min ; 1: date < min ; 2 : date > min
  const isDisabled = maxType === 2 || minType === 1
  const isToday = isDateEqual(new Date(), date)
  return isCurMonth ? (
    <button
      className={`${isSelect ? 'select' : ''} date-picker-item-box ${className}`}
      disabled={isDisabled ? 'disabled' : ''}
      onClick={() => {
        onSelect(date)
      }}>
      {isToday ? '今' : dateNum}
    </button>
  ) : (
    <div />
  )
}
DateItem.propTypes = {
  onSelect: PropTypes.func,
  isCurMonth: PropTypes.bool.isRequired,
  className: PropTypes.string
}
DateItem.defaultProps = {
  onSelect: noop,
  className: '',
  min: '',
  max: '',
  selectDate: ''
}
