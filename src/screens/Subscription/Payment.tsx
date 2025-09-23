import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import Button from 'src/components/shared/Button'
import PaymentModal from './PaymentModal'

const Payment = () => {
     const navigation = useNavigation()
     const [showModal,setShowModal]=useState(false)
     const handleModal=()=>{
        setShowModal(true)
     }
     const toggleModal = () => {
    setShowModal(!showModal); // This toggles the modal's visibility state
};
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Payment",
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
            ),
            headerRight: () => (
                <TouchableOpacity className='mt-3 flex-row gap-3 items-center' onPress={()=>navigation.navigate("Payment Card")}>
                        <Image source={require("../../../assets/restroIcon/Frame 34913.png")} style={{ width: 25, height: 25 }} />
                        <Text className='text-xl text-[#606060]'>Add Card</Text>
                    </TouchableOpacity>
            )

        });
    }, [navigation]);
    const handlePayment = () => {
        navigation.navigate("Payment Animation")
    }
    return (
        <View className='flex-1 justify-between'>
            <View className='p-3'>

                {/* card */}
                <View className='m-2'>

                    <View className='flex-row mt-2 items-center gap-2  p-1  rounded-lg'>
                        <Entypo name="circle" size={24} color="#94AF29" />
                        <View className='flex-col gap-2'>
                            <Text className='text-black font-robotoBold'>Credit Card</Text>
                            <Text className='font-robotoRegular'>1234 **** **** 1234</Text>
                        </View>

                    </View>

                    <View className='flex-row mt-2 items-center gap-2  p-1  rounded-lg'>
                        <Entypo name="circle" size={24} color="#AFAFAF85" />
                        <View className='flex-col gap-2'>
                            <Text className='text-black font-robotoBold'>Paypal</Text>
                            <Text className='font-robotoRegular'>email@website.com</Text>
                        </View>

                    </View>

                    <View className='flex-row mt-2 items-center gap-2  p-1  rounded-lg'>
                        <Entypo name="circle" size={24} color="#AFAFAF85" />
                        <View className='flex-col gap-2'>
                            <Text className='text-black font-robotoBold'>Apple Pay</Text>
                            <Text className='font-robotoRegular'>email@website.com</Text>
                        </View>

                    </View>

                </View>
            </View>

           <View className='items-center p-3 mb-2'>
             <Button
                title={"Continue"}
                colors={["#1C75AD", "#083D70"]}
                labelSize={14}
                labelFont={'roboto-Bold'}
                labelColor={'white'}
                onPress={handlePayment}
            />
           </View>
           
        </View>
    )
}

export default Payment