
import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const InterviewDifficulty = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Interview Difficulty",
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
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("Interview Type")}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )

        });
    }, [navigation]);

    const [caseArray] = useState(["Beginner", "Intermediate", "Advanced"])
    return (
        <View className='flex-1 bg-white p-3'>
            <Text className='text-[#33363F] font-robotoBold text-4xl'>Choose Difficulty</Text>
            <View className='flex-col gap-3 mt-4 mb-2'>
                {caseArray.map((item) => <TouchableOpacity key={item} style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} className='p-4 rounded-xl border border-gray-300' onPress={()=>navigation.navigate("Interview 1")}>
                    <Text className='font-robotoBold text-lg'>{item}</Text>
                </TouchableOpacity>)}
            </View>
        </View>
    )
}

export default InterviewDifficulty



