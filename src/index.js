import DatePickerProvider, { DatePickerOfControlledProvider } from './provider'
import DateBar from './bar'
import DateBox from './itemBox'
import DateItem from './item'
import DateTitle from './title'
export default DatePickerProvider
const DatePicker = DatePickerProvider({})
const Calendar = DatePickerOfControlledProvider({})
export { DateBar, DateBox, DateItem, DateTitle, DatePicker, Calendar, DatePickerOfControlledProvider }
