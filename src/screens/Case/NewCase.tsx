import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const NewCase = () => {
    const navigation = useNavigation();
    const {t}=useTranslation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("newCase"),
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
            )

        });
    }, [navigation]);

    return (
        <View className='bg-#fff flex-1 p-3'>
            <Text className='text-[#33363F] font-robotoBold text-2xl'>{t('newCase')}</Text>
            <TextInput className='border border-[#0000001A] p-3 rounded-xl mt-3 mb-2' placeholder={t('caseNumber')} />
            <View className="items-center mt-3">
                <TouchableOpacity className="flex-row items-center  gap-2 border border-[#083D70] p-4 rounded-full" onPress={() => navigation.navigate("Case Type")}>
                    <Entypo name="squared-plus" size={24} color="#7E869E40" />

                    <Text className="font-robotoBold text-lg text-[#083D70]">{t('addCase')}</Text>

                </TouchableOpacity>
            </View>

            <View className='p-3  rounded-xl mt-3 mb-2 ' style={{backgroundColor:'rgba(0,0,0,0.10)'}}>
                <Text className='font-robotoBold text-lg'>USCIS and FOIA</Text>
                <Text className='font-robotoRegular text-md mt-2'>Use the case number for your application. Here are some examples:</Text>
                <Text className='font-robotoRegular text-md mt-1'>-MSC2490165261</Text>
                <Text className='font-robotoRegular text-md mt-1'>-MSC2490165261</Text>
                <Text className='font-robotoRegular text-md mt-1'>-MSC2490165261</Text>

                 <Text className='font-robotoBold text-lg mt-2'>EOIR (Immigration Court)</Text>
                <Text className='font-robotoRegular text-md mt-2'>Use the case number for your application. Here are some examples:</Text>
                <Text className='font-robotoRegular text-md mt-1'>-MSC2490165261</Text>
                <Text className='font-robotoRegular text-md mt-1'>-MSC2490165261</Text>
                <Text className='font-robotoRegular text-md mt-1'>-MSC2490165261</Text>
            </View>
        </View>
    )
}

export default NewCase