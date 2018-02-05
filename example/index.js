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
            }}>
            开关
          </button>
          <button onClick={this.empty.bind(this)}>加一</button>
          {isShow ? <Calendar onSelect={this.onSelect.bind(this)} date={date} /> : null}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<DatePickerSample />, document.getElementById('app'))
