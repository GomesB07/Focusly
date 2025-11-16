import { useEffect, useState } from "react"
import { Calendar as CalendarScreen, DateData, LocaleConfig } from "react-native-calendars"
import { colors } from "../../../constants/colors"
import { format, parse } from "date-fns";
import { DatesProps, today } from "../screens/CreateTaskScreen";

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
    const [selectedStartDate, setSelectedStartDate] = useState<string>(startDate.dateString)
    const [selectedEndDate, setSelectedEndDate] = useState<string>(endDate ? endDate.dateString : '')


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
        todayBackgroundColor: startDate.dateString === today.dateString ? colors.primary : undefined,
    }


    const parseDates = (date: string) => {
        return parse(date, 'yyyy-MM-dd', new Date())
    }

    const formatDates = (date: Date, typeOfFormat: string) => {
        return format(date, typeOfFormat)
    }

    const selectDay = (date: DateData) => {
        // console.log(date)
        console.log('START DATE: ', startDate)
        // console.log(endDate)
        // console.log(dateValue)

        const parsedDate = parseDates(date.dateString)

        if(endDateCalendar) {
            setSelectedEndDate(formatDates(parsedDate, 'yyyy-MM-dd'))
        } else {
            setSelectedStartDate(formatDates(parsedDate, 'yyyy-MM-dd'))
        }

        dateValue({...date, formattedDate: formatDates(parsedDate, 'dd/MM/yyyy')})
        close()
    }

    return (
        <CalendarScreen
            style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, marginTop: 20}}
            theme={theme}
            onDayPress={(date) => selectDay(date)}
            markedDates={{
                [selectedStartDate]: {selected: true, textColor: colors.textPrimary, selectedColor: colors.primary},
                // ...(selectedEndDate ? { [selectedEndDate]: {selected: true, textColor: colors.textPrimary, selectedColor: colors.primary}} : {})
                [selectedEndDate]: {selected: true, textColor: colors.textPrimary, selectedColor: colors.primary}
            }}
            minDate={minDate}
            maxDate={maxDate}
            current={selectedStartDate}
        />
    )
}

export default Calendar