import AirDatepicker from 'air-datepicker'
import 'air-datepicker/air-datepicker.css'

const currentDate = new Date()

let currentDateChanges = new Date()
let currentDateAddDay = currentDateChanges.setDate(currentDateChanges.getDate() + 1)

let dpMin, dpMax

dpMin = new AirDatepicker('.date-begin_js', {
    minDate: currentDate,
    selectedDates: currentDate,

    onSelect({ date }) {
        let dateSelected = date

        dateSelected.setDate(dateSelected.getDate() + 1)

        dpMax.update({
            minDate: dateSelected,
        })
    },
})

dpMax = new AirDatepicker('.date-end_js', {
    minDate: currentDateAddDay,

    onSelect({ date }) {
        dpMin.update({
            maxDate: date.setDate(date.getDate() - 1),
        })
    },
})

let tpMin, tpMax

tpMin = new AirDatepicker('.time-begin_js', {
    inline: true,
    timepicker: true,
    onlyTimepicker: true,
    minHours: 9,
    maxHours: 19,
    minutesStep: 5,

    onSelect({ date }) {},
})

tpMax = new AirDatepicker('.time-end_js', {
    inline: true,
    timepicker: true,
    onlyTimepicker: true,
    minHours: 9,
    maxHours: 19,
    minutesStep: 5,

    onSelect({ date }) {},
})

// dpMax.selectDate(dateSelected)
// dpMax.selectDate(currentDateAddDay)
