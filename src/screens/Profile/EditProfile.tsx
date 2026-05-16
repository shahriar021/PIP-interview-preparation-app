import { View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, Ionicons, Octicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Button from 'src/components/shared/Button'
import { useTranslation } from 'react-i18next'

const EditProfile = () => {
    const { width, height } = Dimensions.get("window")
    const navigation = useNavigation();
    const {t}=useTranslation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: t('editProfileDetails'),
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
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("BottomScreen",{screen:"Profile"})}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )

        });

        
    }, [navigation]);

    const handleCreate=()=>{

    }

    return (
        <View className='flex-1 items-center p-3'>
            <View style={{ width: width * 0.3, height: height * 0.15 }} className='rounded-full  mt-4 relative bg-green-700'>
                <Image source={require("../../../assets/restroIcon/tikaImg.jpg")} style={{ width: "100%", height: "100%" }} resizeMode='cover' className='rounded-full' />
                <View style={{ bottom: 0, right: 3 }} className='absolute z-10 bg-[#fff] p-2 rounded-full border items-center justify-center border-gray-300'>
                    <Octicons name="pencil" size={24} color="gray" />
                </View>
            </View>


            <Text className='font-robotoBold text-xl text-[#33363F] text-start w-full'>{t('name')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1 p-2' />
            </View>

            <Text className='font-robotoBold text-xl text-[#33363F] text-start w-full'>{t('email')}</Text>
            <View className='flex-row items-center border rounded-xl border-gray-400 mt-2 mb-2 p-1'>
                <TextInput className=' flex-1 p-2' />
            </View>

           

            <Button
                        title={t("saveChanges")}
                        colors={["#1C75AD", "#083D70"]}
                        labelSize={14}
                        labelFont={'roboto-Bold'}
                        labelColor={'white'}
                        onPress={handleCreate}
                    />
        </View>
    )
}

export default EditProfile