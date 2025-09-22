import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'

const History = () => {

    const [hisList] = useState(Array.from({ length: 10 }, (_, i) => i + 1))
    const [isQuiz,setIsQuiz]=useState("quiz")
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "History",
            headerTitleStyle: {
                fontFamily: 'open-sans',
            },
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: "#305FA1",
            headerTitleAlign: "left",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("BottomScreen", { screen: "Profile" })}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    return (
        <View className='flex-1  p-1 '>
            <View className='flex-row gap-2 p-3 mt-2 mb-2 '>
                <TouchableOpacity onPress={()=>setIsQuiz("quiz")}>
                    <Text className={`${isQuiz=="quiz"?"underline":""} ${isQuiz=="quiz"?"text-[#305FA1]":""} font-robotoBold text-lg`}>Quizzes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setIsQuiz("interview")}>
                    <Text className={`${isQuiz!=="quiz"?"underline":""}  ${isQuiz!=="quiz"?"text-[#305FA1]":""} font-robotoBold text-lg`}>Interview</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {hisList.map(i => <View className=' flex-row justify-between items-center border border-[#0000000D] rounded-2xl p-2  overflow-hidden mt-1 mb-2 gap-1 m-4' style={{ borderLeftColor: "#305FA1", borderLeftWidth: 4 }}>
                    <View className='flex-col gap-1 py-3 flex-1'>
                        <Text className='text-[#000000] text-xl font-robotoBold' numberOfLines={1}>{isQuiz=="quiz"?"Quizze":"Interview"}</Text>
                        <Text className='text-[#33363F]' numberOfLines={1}>Result:<Text className='text-[#000000] font-robotoBold'>{" "}3/25</Text> </Text>
                    </View>
                    <View className='items-center p-2 rounded-full'>
                        <Text className='text-[#4D4D55]'>25 January 2025</Text>
                    </View>
                </View>)}
            </ScrollView>
        </View>
    )
}

export default History