import { useEffect, useState } from "react"
import HomeScreen from "../../../screens/painel/home/HomeScreen"
import { eachDayOfInterval, addDays, format } from "date-fns"
import { ptBR } from 'date-fns/locale/pt-BR'

export type DayType = {
    day: number,
    month: number,
    year: number,
    dayFormatted: string,
    dayString: string
}

const Home = () => {
    const [daysWeek, setDaysWeek] = useState<DayType[]>([])
    const [activeDay, setActiveDay] = useState<number>(0)

    useEffect(() => {
        const getEndDay = addDays(new Date(), 6)
        const days = eachDayOfInterval({
            start: new Date(),
            end: getEndDay
        })

        const formatDays = days.map((day) => {
            return {
                day: day.getDate(),
                month: day.getMonth() + 1,
                year: day.getFullYear(),
                dayFormatted: format(day, 'yyyy/MM/dd'),
                dayString: format(day, 'EEEEEE', {locale: ptBR})
            }
        })

        setDaysWeek(formatDays)

    }, [])

    return (
        <HomeScreen daysWeek={daysWeek} setActiveDay={setActiveDay} activeDay={activeDay} />
    )
}

export default Home