import { View, Text, Image, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const CouponCards = () => {

    const navigation = useNavigation();
    const { width, height } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Coupon Card",
            headerStyle: {
                backgroundColor: "white",
                elevation: 0, // for Android
                shadowOpacity: 0, // for iOS
                borderBottomWidth: 0, // for iOS
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.goBack()}>
                    <View className='w-[35px] h-[35px] border border-red-100 items-center justify-center rounded-full' >
                        <Entypo name="chevron-small-left" size={24} color="red" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='bg-white flex-1 p-4 items-center' >


            <View className='overflow-hidden flex-row  mb-3'
                style={{
                    backgroundColor: "#e4e6eb",
                    width: scale(330),
                    // height: verticalScale(120),
                    minHeight: verticalScale(120),

                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: 10,

                    // ✅ Shadow for iOS
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,

                }}
            >
                <View
                    style={{
                        width: 1.5, // slightly thicker than 1
                        height: '80%',
                        borderLeftWidth: 0,       // remove border
                        backgroundColor: '#727272',
                        borderStyle: 'dashed',    // optional, won't affect backgroundColor
                        position: 'absolute',
                        left: scale(160),
                        top: '10%',
                    }}
                />


                <View className='flex-1 ml-9 items-center'> <Text className='font-bold' style={{ color: "#00B047", fontSize: 24 }}>Free Delivery</Text></View>
                <View className='flex-1 mr-9 ml-3'>
                    <Text className='text-[#5a5a5a]'>Use this voucher to get free delivery on your next order.</Text>
                    <Text className='text-[#000000] mt-1 font-bold'>CODE:  FREESHIP2025</Text>
                    <TouchableOpacity className='flex-row items-center gap-2 mt-3'>
                        <Text className='text-[#C21A1E]'>Copy code</Text>
                        <Image source={require("../../../assets/restroIcon/copy.png")} style={{ width: 17, height: 17 }} />
                    </TouchableOpacity>
                </View>

                {/* Left Cutout */}
                <View
                    style={{
                        position: "absolute",
                        left: -25,
                        top: '50%', // vertically center
                        marginTop: -25, // half of cutout height

                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "white", // same as screen background
                        // ✅ Shadow for iOS
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,

                        // ✅ Shadow for Android
                        elevation: 6,
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        right: -25,
                        top: '50%', // vertically center
                        marginTop: -25, // half of cutout height

                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#fff",

                        // ✅ Shadow for iOS
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,

                        // ✅ Shadow for Android
                        elevation: 6,
                    }}
                />

            </View>

            {/*  */}

            <View className='overflow-hidden flex-row  mb-3'
                style={{
                    backgroundColor: "#e4e6eb",
                    width: scale(330),
                    // height: verticalScale(120),
                    minHeight: verticalScale(120),

                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    borderRadius: 10,

                    // ✅ Shadow for iOS
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,

                }}
            >
                <View
                    style={{
                        width: 1.5, // slightly thicker than 1
                        height: '80%',
                        borderLeftWidth: 0,       // remove border
                        backgroundColor: '#727272',
                        borderStyle: 'dashed',    // optional, won't affect backgroundColor
                        position: 'absolute',
                        left: scale(160),
                        top: '10%',
                    }}
                />


                <View className='flex-1 ml-9 items-center'> <Text className='font-bold' style={{ color: "#00B047", fontSize: 24 }}>25 %</Text></View>
                <View className='flex-1 mr-9 ml-3'>
                    <Text className='text-[#5a5a5a]'>Use this voucher to get 25% descount on your next order.</Text>
                    <Text className='text-[#000000] mt-1 font-bold'>CODE:  FREESHIP2025</Text>
                    <TouchableOpacity className='flex-row items-center gap-2 mt-3'>
                        <Text className='text-[#C21A1E]'>Copy code</Text>
                        <Image source={require("../../../assets/restroIcon/copy.png")} style={{ width: 17, height: 17 }} />
                    </TouchableOpacity>
                </View>

                {/* Left Cutout */}
                <View
                    style={{
                        position: "absolute",
                        left: -25,
                        top: '50%', // vertically center
                        marginTop: -25, // half of cutout height

                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "white", // same as screen background
                        // ✅ Shadow for iOS
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,

                        // ✅ Shadow for Android
                        elevation: 6,
                    }}
                />
                <View
                    style={{
                        position: "absolute",
                        right: -25,
                        top: '50%', // vertically center
                        marginTop: -25, // half of cutout height

                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: "#fff",

                        // ✅ Shadow for iOS
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,

                        // ✅ Shadow for Android
                        elevation: 6,
                    }}
                />

            </View>


        </View>
    );
}

export default CouponCards