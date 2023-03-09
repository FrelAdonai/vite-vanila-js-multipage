import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'

var currentDate = new Date()
var someDate = new Date()
someDate.setDate(someDate.getDate() + 10)

new AirDatepicker('.input-date', {
    range: true,
    multipleDatesSeparator: ' - ',

    minDate: currentDate,
    maxDate: someDate,

    onSelect(date) {
        console.log(date)
    },
})
