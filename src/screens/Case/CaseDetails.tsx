import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { scale, verticalScale } from 'react-native-size-matters';

const CaseDetails = () => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Case Details",
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
            headerTitleAlign: "center",


            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity className='p-3' onPress={() => navigation.navigate("Case Details edit")}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Entypo name="edit" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )

        });
    }, [navigation]);
    return (
        <View className="flex-1 bg-white p-3">
            <ScrollView>
                <Text className='text-[#2F2F36] font-robotoBold text-lg mt-2 mb-2'>Case Title</Text>
                <Text className='text-[#363636] font-robotoRegular text-md'>FOIA Request</Text>
                <Text className='text-[#2F2F36] font-robotoBold text-lg mt-2 mb-2'>Date of Last Update</Text>
                <Text className='text-[#363636] font-robotoRegular text-md'>July 28</Text>
                <Text className='text-[#2F2F36] font-robotoBold text-lg mt-2 mb-2'>Status</Text>
                <Text className='text-[#363636] font-robotoRegular text-md'>Forms Mailed </Text>
                <Text className='text-[#2F2F36] font-robotoBold text-lg mt-2 mb-2'>Reminder</Text>
                <View className='flex-row items-center gap-5'>
                    <Text className='text-[#363636] font-robotoRegular text-md'>Call the agency</Text>
                    <Text className='text-[#363636] font-robotoRegular text-md'>Aug 5</Text>
                </View>
                <Text className='text-[#2F2F36] font-robotoBold text-lg mt-2 mb-2'>Notes</Text>
                <Text className='text-[#363636] font-robotoRegular text-md'>Enter your registered email address or mobile number and we’ll send you instructions to reset your password. Let’s get you back on track quickly and securely!"</Text>
                <Text className='text-[#2F2F36] font-robotoBold text-lg mt-2 mb-2'>Documents </Text>
                <Image source={require("../../../assets/pipyrit/case.png")} style={{width:scale(142),height:verticalScale(100)}}/>
            </ScrollView>
        </View>
    )
}

export default CaseDetails