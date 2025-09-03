import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import ViewComplainModal from './ViewComplainModal';

const ViewMyComplain = () => {

    const navigation = useNavigation();
    const { width, height } = useWindowDimensions()
    const [showModal,setShowModal]=useState(false);
    const [data,setData]=useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "View My Complains",
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

    const handleModal=(txt)=>{
        setShowModal(true)
        setData(txt);
      console.log(txt)
    }

  return (
    <View className='p-3'>
      
      <TouchableOpacity className='border border-[#0000001A] p-2 rounded-lg mb-2' onPress={()=>handleModal("restaurant")}>
        <View className='flex-row justify-between'>
            <Text className='text-xl font-robotoBold'>Missing Items</Text>
            <Text className='text-[#FE724C] border border-[#FE724C] rounded-2xl p-2'>Submitted</Text>
        </View>
        <Text className='text-xs'>Restaurant name:  Red n hot pizza</Text>
      </TouchableOpacity>

      <TouchableOpacity className='border border-[#0000001A] p-2 rounded-lg mb-2' onPress={()=>handleModal("rider")}>
        <View className='flex-row justify-between'>
            <Text className='text-xl font-robotoBold'>Missing Items</Text>
            <Text className='text-[#3B55C4] border border-[#3B55C4] rounded-2xl p-2'>In review</Text>
        </View>
        <Text className='text-xs'>Rider ID: #FDX12345</Text>
      </TouchableOpacity>

      <TouchableOpacity className='border border-[#0000001A] p-2 rounded-lg' onPress={()=>handleModal("res$rider")}>
        <View className='flex-row justify-between'>
            <Text className='text-xl font-robotoBold'>Missing Items</Text>
            <Text className='text-[#19CC49] border border-[#19CC49] rounded-2xl p-2'>Resolved</Text>
        </View>
        <Text className='text-xs'>Restaurant name:  Red n hot pizza</Text>
        <Text className='text-xs'>Rider ID: #FDX12345</Text>
      </TouchableOpacity>

      <ViewComplainModal visible={showModal} onClose={()=>setShowModal(false)} data={data}/>

    </View>
  )
}

export default ViewMyComplain