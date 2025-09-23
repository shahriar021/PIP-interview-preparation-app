import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PaymentInfo = () => {
    const { width, height } = useWindowDimensions();

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Payment Details",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTintColor: "#305FA1",
            headerTitleAlign: "left",
            headerLeft: () => (
                <TouchableOpacity className='p-1 m-2' onPress={() => navigation.navigate("Payment")}>
                    <View className='w-[35px] h-[35px] border border-[#F9F9F9] items-center justify-center rounded-full bg-[#F9F9F9]'>
                       <AntDesign name="close" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView className='flex-1'>
            <View className='flex-1 items-center justify-between '>

                <View>
                    <Text className='font-robotoRegular text-xl text-[#626262]'>Payment Details</Text>
                </View>
                <View className='relative border p-3 border-gray-200 rounded-3xl shadow-slate-50 items-center justify-center' style={{ width: width * 0.8 }}>
                    <LinearGradient
                        colors={['#305FA1', '#305FA1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: "absolute",

                            top: -30,
                            alignSelf: 'center'
                        }}
                    >
                        <AntDesign name="check" size={24} color="white" />
                    </LinearGradient>
                    <Text className='text-[#9FA2AB] mt-10'>Payment Total</Text>
                    <Text className='text-[#33363F] text-xl font-robotoBold mb-5'>$89.35</Text>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Date</Text>
                        <Text className='text-[#33363F] font-robotoBold'>31 Dec 2024</Text>
                    </View>
                    
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Transaction ID</Text>
                        <Text className='text-[#33363F] font-robotoBold'>A253151sdfd</Text>
                    </View>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Account</Text>
                        <Text className='text-[#33363F] font-robotoBold'>Shahriar</Text>
                    </View>

                    <View className='border border-[#33363F] w-full border-dashed mb-2 ' style={{
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        borderColor: 'rgba(51, 54, 63, 0.3)',
                    }} />
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#9FA2AB]'>Total Payment</Text>
                        <Text className='text-[#33363F] font-robotoBold'>$89.36</Text>
                    </View>
                    <View className='flex-row justify-between w-full mb-3'>
                        <Text className='text-[#33363F]'>Total</Text>
                        <Text className='text-[#33363F] font-robotoBold'>$89.32</Text>
                    </View>
                </View>
                <View className="items-center mt-3 mb-5" >
                    <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden border border-[#00000080] flex-row  justify-center" style={{ width: width * 0.9 }} onPress={() => navigation.navigate("BottomScreen")}>
                        <AntDesign name="download" size={24} color="black" />
                        <Text className="text-[#00000080] p-3 font-robotoBold">Get PDF Receipt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className=" items-center mt-3 rounded-full  overflow-hidden border border-[#1C75AD] flex-row  justify-center" style={{ width: width * 0.9 }} onPress={() => navigation.navigate("BottomScreen")}>
                        <Feather name="arrow-left" size={24} color={"#1C75AD"} />
                        <Text className="text-[#1C75AD] p-3 font-robotoBold">Back to Homepage</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentInfo