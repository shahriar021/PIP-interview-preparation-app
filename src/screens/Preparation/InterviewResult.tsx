import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { scale, verticalScale } from 'react-native-size-matters';

const InterviewResult = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Quiz Result",
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
    return (
        <View className='items-center bg-white justify-between flex-1'>
            <View className='w-full items-center mt-5'>
                <Text className='text-[#ED9400] font-robotoBold text-xl'>Congratulations! You have scored</Text>
                <View className='rounded-full overflow-hidden mt-3' style={{width:scale(106),height:verticalScale(106)}}>
                    <LinearGradient colors={["#1C75AD", "#083D70"]} style={{width:"100%",height:"100%", padding: 20, alignItems: 'center',justifyContent:"center" }}>
                        <Text className='text-2xl text-white font-robotoBold'>20</Text>
                        <Text className='text-lg text-white font-robotoBold'>out of 25</Text>
                    </LinearGradient>
                </View>
                <Text className='mt-4 text-[#2A2A2A] font-robotoBold'>You have earned</Text>
                <View className='flex-row justify-center gap-2 items-center mt-2'>
                    <FontAwesome5 name="coins" size={24} color="#FFBB00" />
                    <Text className='text-[#FFBB00] font-robotoBold'>80 Points</Text>
                </View>
                <View className='flex-row justify-center gap-2 items-center mt-4 border border-[#083D70] p-3 rounded-full'>
                    <MaterialIcons name="loop" size={24} color="#083D70" />
                    <Text className='text-[#083D70] font-robotoRegular'>Start Over</Text>
                </View>
            </View>

            <View className='w-full flex-col mb-4'>
                <TouchableOpacity className='border border-[#1C75AD] p-3 rounded-full m-3 items-center' onPress={()=>navigation.navigate("Interview QnA")}>
                    <Text className='text-[#1C75AD] font-robotoRegular text-lg'>View All Question</Text>
                </TouchableOpacity>
                 <TouchableOpacity className='border border-[#1C75AD] p-3 rounded-full m-3 items-center flex-row justify-center gap-2'>
                    <Ionicons name="arrow-back-sharp" size={24} color="#1C75AD" />
                    <Text className='text-[#1C75AD] font-robotoRegular text-lg'>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InterviewResult