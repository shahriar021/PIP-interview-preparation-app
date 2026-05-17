import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';
import { useGetQuizAndAnsQuery } from 'src/redux/features/quiz/quizApi';

const QuestionAndAnswer = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const {RID}=route.params
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Questions & Answers",
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
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )

        });
    }, [navigation]);
    const [questionList] = useState(Array.from({ length: 52 }, (_, i) => i + 1))

    const {data:getQnA}=useGetQuizAndAnsQuery(RID)
    console.log(getQnA,"aaa")

    return (
        <View className='items-center bg-white justify-between flex-1'>
            <View className='w-full items-center mt-5 flex-grow flex-1'>
                <ScrollView contentContainerStyle={{ flexGrow: 1,paddingBottom:100 }} showsVerticalScrollIndicator={false} >
                    <View className='flex-col gap-1 p-3 '>
                        {getQnA?.data?.map((item,index) => <View key={item} className='p-4 '>
                            <Text className='font-robotoBold text-[#1D1D1D] text-xl'>Q:{index+1}{" "}{item.question}</Text>
                            <Text className='mt-4 font-robotoBold text-[#7B7B7B] text-xl'>Answer: <Text className='font-robotoBold text-[#1D1D1D] text-xl'>{item.answer}</Text></Text>
                        </View>)}
                    </View>
                </ScrollView>
            </View>

            <View className='w-full flex-col mb-4 '>
                <TouchableOpacity className='border border-[#00000080] p-3 rounded-full m-3 items-center flex-row justify-center gap-2'>
                    <Feather name="download" size={24} color="#00000080" />
                    <Text className='text-[#000] font-robotoRegular text-lg'>Get PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-[#1C75AD] p-3 rounded-full m-3 items-center flex-row justify-center gap-2'>
                    <Ionicons name="arrow-back-sharp" size={24} color="#1C75AD" />
                    <Text className='text-[#1C75AD] font-robotoRegular text-lg'>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuestionAndAnswer