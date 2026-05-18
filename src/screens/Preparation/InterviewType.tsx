import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useGetInterTypeQuery } from 'src/redux/features/interview/interviewApi';

const InterviewType = () => {
    const navigation = useNavigation()
    const {data:getInterviewType}=useGetInterTypeQuery(undefined)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Interview Type",
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
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("BottomScreen",{screen:"Prep Hub"})}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )

        });

        
    }, [navigation]);

    const [caseArray] = useState(["Marriage", "Asylum", "Citizenship", "Green Card"])
    return (
        <View className='flex-1 bg-white p-3'>
            <Text className='text-[#33363F] font-robotoBold text-4xl'>Choose Interview Type</Text>
            <View className='flex-col gap-3 mt-4 mb-2'>
                {getInterviewType?.data.map((item) => <TouchableOpacity key={item.id} style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} className='p-4 rounded-xl border border-gray-300' onPress={()=>navigation.navigate("Interview Difficulty",{inType:item.name})}>
                    <Text className='font-robotoBold text-lg'>{item.name}</Text>
                </TouchableOpacity>)}
            </View>
        </View>
    )
}

export default InterviewType