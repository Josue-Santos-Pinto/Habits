import React,{useEffect} from 'react'
import { View,Text,TouchableOpacity,ScrollView } from "react-native"
import HabitDay from "../components/HabitDay"
import Header from "../components/Header"
import { DAY_SIZE } from "../components/HabitDay"
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'
import {useNavigation} from '@react-navigation/native'

const weekDays = ['D','S','T','Q','Q','S','S']

const dateFromYearStart = generateRangeDatesFromYearStart()

const minimumSummaryDatesSizes = 18 * 5

const amountOfDaysToFill = minimumSummaryDatesSizes - dateFromYearStart.length

export default () => {

    const {navigate} = useNavigation()

    return (
        <View className='flex-1 bg-background px-8 pt-16 '>
            <Header />

            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay,i)=>(
                        <Text 
                        key={`${weekDay} - ${i}`}
                        className='text-zinc-400 text-xl font-bold text-center mx-1'
                        style={{ width: DAY_SIZE }}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                    <View className="flex-row flex-wrap">
                        {
                            dateFromYearStart.map((date)=>(
                                <HabitDay 
                                    key={date.toISOString()}
                                    onPress={()=>navigate('habit',{date: date.toISOString()})}
                                />
                            )) 
                        }
                        {
                        amountOfDaysToFill > 0 && Array
                        .from({length: amountOfDaysToFill})
                        .map((_,i)=>(
                            <View 
                                key={i}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40" 
                                style={{width:DAY_SIZE, height: DAY_SIZE}} 
                                
                            />
                        ))
                    }
                    </View>

            </ScrollView>
           
        </View>
    )
}