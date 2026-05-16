import { Entypo, Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Button from 'src/components/shared/Button'

const ChangePassword = () => {
    const { width } = useWindowDimensions()
    const navigation = useNavigation()
    const {t}=useTranslation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t("changePassword"),
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
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("BottomScreen", { screen: "Profile" })}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    const handleCreate = () => {

    }

    return (
        <View className='p-4'>
            <Text className='font-robotoBold text-xl text-[#33363F]'>{t('currentPassword')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1' />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F]'>{t('newPassword')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1' />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F]'>{t('confirmNewPassword')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1' />
                <Feather name="eye-off" size={24} color="gray" />
            </View>

            <TouchableOpacity>
                <Text className='text-[#305FA1] font-robotoBold'>{t('forgotPassword')}</Text>
            </TouchableOpacity>

            <Button
                title={t('changePassword')}
                colors={["#1C75AD", "#083D70"]}
                labelSize={14}
                labelFont={'roboto-Bold'}
                labelColor={'white'}
                onPress={handleCreate}
            />
        </View>
    )
}

export default ChangePassword