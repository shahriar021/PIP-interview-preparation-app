import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Language = () => {
    const [langList] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Language",
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
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("Setting")}>
                    <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        });
    }, [navigation]);
    return (
        <View className='flex-1 bg-white p-3'>
            <ScrollView contentContainerStyle={{}}>
            {langList.map(item => <View className='flex-row items-center gap-4 border  border-gray-300 p-3 rounded-xl mt-2 mb-2'>
                {item==1?<FontAwesome name="dot-circle-o" size={24} color="#94AF29" />:<FontAwesome name="dot-circle-o" size={24} color="black" />}
                <Text className='font-robotoBold text-lg'>English</Text>
            </View>)}

            </ScrollView>
        </View>
    )
}

export default Language