import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getDayByMonth, getDisplayWeek } from './calendar'
import { weekFormatter } from './config'
/**
 * 
 * @param {Array} weeks 日历组件顶部数组
 * @param {String} className 外层样式
 */
export default function DateTitle ({ start, formatWeek, className }) {
  const week = getDisplayWeek(start, formatWeek)
  return (
    <table className={`${className} date-picker-panel`}>
      <tbody>
        <tr>
          {week.map((item, index) => {
            return (
              <td className='date-picker-week' key={index}>
                {item.name}
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}
DateTitle.propTypes = {
  className: PropTypes.string,
  weeks: PropTypes.array
}
DateTitle.defaultProps = {
  className: '',
  weeks: weekFormatter
}
