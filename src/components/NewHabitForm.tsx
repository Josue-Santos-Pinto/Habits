import { Check } from "phosphor-react"
import React, {FormEvent, useState} from "react"
import * as Checkbox from '@radix-ui/react-checkbox'
import { api } from "../lib/axios"


const availableWeekDays = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado']

export default () => {

    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    const createNewHabit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(title + weekDays)

        if(!title || weekDays.length === 0){
            return
        }

        await api.post('habits',{
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('Hábito criado com sucesso!')
    }

    const handleToogleWeekDay = (weekDay: number) => {
        if(weekDays.includes(weekDay)){
            const weekDayWithRemovedOne = weekDays.filter(day => day !== weekDay)
            setWeekDays(weekDayWithRemovedOne)
        } else {
            const weekDayWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDayWithAddedOne)
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input 
                type='text'
                id="title"
                placeholder="ex.: Exercícios, dormir bem, etc..."
                autoFocus
                value={title}
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 "
                onChange={(e)=>setTitle(e.target.value)}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((weekDay,index)=>(
                    <Checkbox.Root
                            key={weekDay}
                            className="flex items-center gap-3 group"
                            onCheckedChange={()=>handleToogleWeekDay(index)}
                            checked={weekDays.includes(index)}
                        >
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 
                            group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                <Checkbox.Indicator>
                                    <Check size={20} color='white' />
                                </Checkbox.Indicator>
                            </div>
                            

                            <span className="text-white leading-tight ">
                                {weekDay}
                            </span>
                </Checkbox.Root>
                ))}
                
            </div>
            

            <button type="submit" className="p-4 mt-6 rounded-lg flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 " >
                <Check size={20} weight='bold'/>
                Confirmar
            </button>
        </form>
    )
}