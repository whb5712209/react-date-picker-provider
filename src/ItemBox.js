import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateItemLable from './item'
import { noop, getDisplayDates, toDateWithNoDiscrepancy } from './calendar'
export default function DateBox ({
  month,
  date,
  start,
  formatWeek,
  DateItem,
  className,
  dateClassName,
  ...otherProps
}) {
  const monthDateList = getDisplayDates(month, start, formatWeek)

  return (
    <table className={`${className} date-picker-panel`}>
      <tbody>
        {monthDateList.map((item, index) => {
          return (
            <tr key={index}>
              {item.map((i) => {
                return (
                  <td key={i.date}>
                    <DateItem
                      {...i}
                      selectDate={toDateWithNoDiscrepancy(date)}
                      className={dateClassName}
                      {...otherProps}
                    />
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
DateBox.propTypes = {
  onSelect: PropTypes.func,
  className: PropTypes.string,
  dateClassName: PropTypes.string
}
DateBox.defaultProps = {
  onSelect: noop,
  className: '',
  dateClassName: '',
  DateItem: DateItemLable
}
