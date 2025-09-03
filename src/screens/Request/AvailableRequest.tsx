import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'
import { scale, verticalScale } from 'react-native-size-matters'

const AvailableRequest = () => {

    const navigation = useNavigation()
    const [requestList] = useState(Array.from({ length: 10 }, (_, i) => i + 1))

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0
            },
            headerTitleAlign: "center",
            headerTintColor: "#626262",
            headerLeft: () => {
                return <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full'>
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            }
        })
    }, [navigation])

    return (
        <View className='p-1'>
            <ScrollView contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
                {/* card start */}
                {requestList.map(item =>
                    <TouchableOpacity key={item} className='border p-1 border-gray-200 rounded-xl mb-3' onPress={() => navigation.navigate("Delivery Request")}>
                        {/* first view */}
                        <View className='flex-row items-center justify-between  p-2 '>
                            <View className='flex-row gap-2'>
                                <View style={{ width: scale(50), height: verticalScale(70) }} className='rounded-md overflow-hidden'>
                                    <Image source={require("../../../assets/restroIcon/nearbyRes.png")} style={{ width: "100%", height: "100%" }} />
                                </View>
                                <View className='flex-col'>
                                    <Text className='font-robotoBold text-xl'>Urban Palate</Text>
                                    <Text className='font-robotoBold'>
                                        Receiver Name: <Text className='font-robotoRegular text-[#222222]'>Robert Fox</Text>
                                    </Text>
                                </View>
                            </View>
                            <View className='flex-row items-center gap-2'>
                                <Image source={require("../../../assets/restroIcon/clock-01 2.png")} style={{ width: 20, height: 20 }} />
                                <Text className='text-[#2E2E2E]'>8:00 PM</Text>
                            </View>
                        </View>

                        {/* second view */}
                        <View className='flex-row items-center justify-between'>
                            <View className='flex-col p-2 mt-2 rounded-md'>
                                <Text className='text-[#888888]'>Drop off: <Text className='text-[#222222]'>Downtown LA</Text></Text>
                                <Text className='text-[#888888]'>Earning: <Text className='text-[#222222]'>$3.75</Text></Text>
                            </View>
                            <View className='flex-row gap-4'>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/restroIcon/ok.png")} style={{ width: 34, height: 34 }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/restroIcon/cross.png")} style={{ width: 34, height: 34 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>)}
            </ScrollView>
        </View>
    )
}

export default AvailableRequest