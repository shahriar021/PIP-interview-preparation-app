import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Button from 'src/components/shared/Button'

const PaymentModal = ({ visible ,onClose}:any) => {
    const navigation = useNavigation()
    const handleSave=()=>{
            onClose()
    }
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
            

        });
    }, [navigation]);
    return (
       
            <View className='flex-1 '>
                

                <View className='p-3 gap-2'>
                    <Text>Account Name</Text>
                    <TextInput className='border rounded-lg border-[#CACACA] p-3' placeholder='Name' />
                </View>
                <View className='p-3 gap-2'>
                    <Text>Card Number</Text>
                    <TextInput className='border rounded-lg border-[#CACACA] p-3' placeholder='Card Number' />
                </View>

                <View className='flex-row w-full  gap-2'>
                    <View className='p-3 gap-2  flex-1'>
                        <Text>Exp Date</Text>
                        <TextInput className='border rounded-lg border-[#CACACA] p-3' placeholder='03-03-2022' />
                    </View>
                    <View className='p-3 gap-2  flex-1'>
                        <Text>ccv</Text>
                        <TextInput className='border rounded-lg border-[#CACACA] p-3' placeholder='03-03-2022' />
                    </View>
                </View>

                <View className='items-center p-3 mb-2'>
             <Button
                title={"Save"}
                colors={["#1C75AD", "#083D70"]}
                labelSize={14}
                labelFont={'roboto-Bold'}
                labelColor={'white'}
                onPress={onClose}
            />
           </View>
            </View>
       
    )
}

export default PaymentModal