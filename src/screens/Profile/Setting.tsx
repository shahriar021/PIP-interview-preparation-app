import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { getSettingItems } from 'src/constants/settingItems'
import { useTranslation } from 'react-i18next'

const Setting = () => {

    const navigation = useNavigation()
     const { t } = useTranslation();
     const settingItems = getSettingItems(t);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('screens.setting'),
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
    const handleDelete =()=>{

    }

    const SettingsItem = ({ icon, label, onPress }: any) => {
        return (<TouchableOpacity onPress={onPress} className="flex-row justify-between border p-2 m-2 rounded-xl border-gray-300 w-full" >
            <View className='flex-row items-center justify-between p-2 w-full'>
                <View className='flex-row items-center gap-2'>
                    <Image source={icon} style={{width:24,height:24}}/>
                    <Text className='text-[#626262] text-xl font-robotoBold '>{label}</Text>
                </View>
                <View>
                    <View className='p-1' >
                    <View className='w-[35px] h-[35px] border border-gray-200 items-center justify-center rounded-full' >
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }

    return (
        <View className='flex-1 p-2 items-center'>
            {settingItems.map((item, index) => (
                <SettingsItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    onPress={() => navigation.navigate(item.route)}
                />
            ))}
            <TouchableOpacity onPress={handleDelete} className="flex-row justify-between border p-2 m-2 rounded-xl border-gray-300 w-full" >
            <View className='flex-row items-center justify-between p-2 w-full'>
                <View className='flex-row items-center gap-2'>
                    <Image source={require("../../../assets/restroIcon/Delete.png")} style={{width:24,height:24}}/>
                    <Text className='text-[#B20000] text-xl font-robotoBold'>{t('deleteAccount')}</Text>
                </View>
                <View>
                    <View className='p-1' >
                    <View className='w-[35px] h-[35px] border border-gray-200 items-center justify-center rounded-full' >
                        <Entypo name="chevron-small-right" size={24} color="black" />
                    </View>
                </View>
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default Setting