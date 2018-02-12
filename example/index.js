import React from 'react'
import ReactDOM from 'react-dom'
import DatePickerProvider, { DatePicker, Calendar } from '../src'
import { getDateStr } from '../src/calendar'
const dayMS = 1000 * 60 * 60 * 24
const defaultFormat = 'YYYY.MM.DD'
const formatWeek = [
  { key: 0, name: '礼拜天' },
  { key: 1, name: '礼拜一' },
  { key: 2, name: '礼拜二' },
  { key: 3, name: '礼拜三' },
  { key: 4, name: '礼拜四' },
  { key: 5, name: '礼拜五' },
  { key: 6, name: '礼拜六' }
]
import './index.scss'
class DatePickerSample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      isShow: false
    }
    this.closeDatePicker = this.closeDatePicker.bind(this)
  }
  closeDatePicker () {
    if (this.state.isShow) {
      this.setState({
        isShow: false
      })
    }
  }
  onSelect (value) {
    this.setState({
      date: value
    })
  }
  showDatePicker () {
    this.setState({
      isShow: !this.state.isShow
    })
  }
  empty () {
    this.setState({
      date: new Date(this.state.date.getTime() + 1000 * 60 * 60 * 24)
    })
  }
  render () {
    const { date, isShow } = this.state
    const dateRender = date ? (date instanceof Date ? getDateStr(date, defaultFormat) : date) : ''
    return (
      <div>
        <div>
          <span>当前日期:</span>
          <span>{dateRender}</span>
        </div>
        <div className='box-3'>
          <button
            onClick={(e) => {
              e.stopPropagation()
              this.showDatePicker()
            }}
            className='btn btn-default'>
            开关
          </button>
          <button onClick={this.empty.bind(this)} className='btn btn-primary  '>
            加一
          </button>
          {isShow ? (
            <Calendar onSelect={this.onSelect.bind(this)} date={date} className='example-s-date-picker-box' />
          ) : null}
        </div>
      </div>
    )
  }
}

class DatePickerLimit extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      isShow: false,
      startDate: '',
      isStartShow: false,
      endDate: '',
      isEndShow: false
    }
    this.closeDatePicker = this.closeDatePicker.bind(this)
  }
  closeDatePicker (key) {
    if (this.state[key]) {
      this.setState({
        [key]: false
      })
    }
  }
  onSelect (key, value) {
    this.setState({
      [key]: value
    })
  }
  showDatePicker (key) {
    this.setState({
      [key]: !this.state[key]
    })
  }

  render () {
    const { startDate, endDate, isStartShow, isEndShow } = this.state
    const startDateRender = startDate
      ? startDate instanceof Date ? getDateStr(startDate, defaultFormat) : startDate
      : ''
    const endDateRender = endDate ? (endDate instanceof Date ? getDateStr(endDate, defaultFormat) : endDate) : ''
    return (
      <div>
        <div>
          <span>当前起始日期:</span>
          <span>{startDateRender}</span>
        </div>
        <div>
          <span>当前截止日期:</span>
          <span>{endDateRender}</span>
        </div>
        <div className='box-3'>
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                this.showDatePicker('isStartShow')
              }}
              className='btn btn-default'>
              起始日历开关
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                this.showDatePicker('isEndShow')
              }}
              className='btn btn-primary'>
              截止日历开关
            </button>
          </div>
          {isStartShow ? (
            <Calendar
              onSelect={(val) => {
                this.onSelect('startDate', val)
              }}
              min={new Date()}
              max={endDate}
              date={startDate}
              className='example-s-date-picker-box-1'
            />
          ) : null}

          {isEndShow ? (
            <Calendar
              onSelect={(val) => {
                this.onSelect('endDate', val)
              }}
              min={(new Date(), startDate)}
              date={endDate}
              className='example-s-date-picker-box-1'
            />
          ) : null}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <div>
      <h2>简单示例</h2>
      <DatePickerSample />
    </div>
    <div>
      <h2>扩展示例</h2>
      <DatePickerLimit />
    </div>
  </div>,
  document.getElementById('app')
)
