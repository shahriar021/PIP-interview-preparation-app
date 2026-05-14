import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { useGetTermOrPrivacyOrAboutQuery } from 'src/redux/features/profile/profileApi'

const Privacy = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Privacy Policy",
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

    const {data:getData}=useGetTermOrPrivacyOrAboutQuery("privacy_policy")
    
        return (
            <View className='flex-1 p-3 bg-white'>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className='font-bold text-xl'>{getData?.data?.title}</Text>
                    <Text className='mt-2 mb-2'>{getData?.data?.content}</Text>
                </ScrollView>
            </View>
        )
    }

export default Privacy