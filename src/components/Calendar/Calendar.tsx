import { useEffect, useState } from "react"
import { Calendar as CalendarScreen, DateData, LocaleConfig } from "react-native-calendars"
import { colors } from "../../constants/colors"
import { eachDayOfInterval, format, formatDate, parse } from "date-fns";
import { DatesProps, today } from "../../screens/painel/createTask/CreateTaskScreen";

type CalendarProps = {
    close: () => void;
    dateValue: (value: DatesProps) => void;
    startDate: DatesProps;
    endDate?: DatesProps | undefined;
    minDate?: string;
    maxDate?: string;
    endDateCalendar?: boolean;
}


LocaleConfig.locales['br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNames: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
    dayNamesShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
}

LocaleConfig.defaultLocale = 'br'

const Calendar = ({close, dateValue, startDate, endDate, minDate, maxDate, endDateCalendar}: CalendarProps) => {
    // const [selectedDay, setSelectedDay] = useState<string>(endDate ? endDate.dateString : startDate.dateString)
    const [selectedStartDate, setSelectedStartDate] = useState<string>(startDate.dateString)
    const [selectedEndDate, setSelectedEndDate] = useState<string>()
    const [allDays, setAllDays] = useState<string[]>([])

    useEffect(() => {

    }, [startDate, endDate])


    const theme = {
        calendarBackground: colors.textPrimary,
        textSectionTitleColor: colors.textDark,
        selectedDayTextColor: colors.textPrimary,
        todayTextColor: startDate.dateString === today.dateString ? colors.textPrimary : colors.primary,
        dayTextColor: colors.textDark,
        monthTextColor: colors.textDark,
        arrowColor: colors.primary,
        textDisabledColor: colors.disabled,
        disabledArrowColor: colors.disabled,
        todayBackgroundColor: startDate.dateString === today.dateString ? colors.primary : undefined
    }


    const parseDates = (date: string) => {
        return parse(date, 'yyyy-MM-dd', new Date())
    }

    const formatDates = (date: Date, typeOfFormat: string) => {
        return format(date, typeOfFormat)
    }

    const selectDay = (date: DateData) => {
        // console.log(date)
        // console.log(startDate)
        // console.log(endDate)
        // console.log(dateValue)

        const parsedDate = parseDates(date.dateString)

        if(endDateCalendar) {
            setSelectedEndDate(formatDates(parsedDate, 'yyyy-MM-dd'))
        } else {
            setSelectedStartDate(formatDates(parsedDate, 'yyyy-MM-dd'))
        }

        dateValue({...date, formattedDate: formatDates(parsedDate, 'dd/MM/yyyy')})

        const periodDays = eachDayOfInterval({
            start: parseDates(selectedStartDate),
            end: endDateCalendar ? parsedDate : parseDates(selectedEndDate!)
        })


        // console.log('PERIOD DAYS: ', typeof periodDays)


        // console.log('END DATE: ', selectedEndDate)
        // console.log(date.dateString)

        const formatPeriodDays = periodDays.map(date => formatDates(date, 'yyyy-MM-dd'))
        // console.log(typeof formatPeriodDays)
        setAllDays(formatPeriodDays)
        console.log(allDays)
    }

    console.log(allDays)

    return (
        <CalendarScreen
            style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20}}
            theme={theme}
            onDayPress={(date) => selectDay(date)}
            markingType={'period'}
            markedDates={

                allDays.reduce((acc, date, index) => ({
                    ...acc,
                    [date]: {selected: true, color: colors.primary, textColor: colors.textPrimary, startingDay: index === 0, endingDay: index === allDays.length - 1}
                }), {})
            }
            minDate={minDate}
            maxDate={maxDate}
            current={selectedStartDate}
        />
    )
}

export default Calendar