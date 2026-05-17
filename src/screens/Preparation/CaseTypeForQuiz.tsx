import { View, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useGetCaseTypesQuery } from 'src/redux/features/case/caseApi';

const CaseTypeForQuiz = () => {
    const navigation = useNavigation()
    const {data:getCaseTypes}=useGetCaseTypesQuery(undefined)
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Case Type",
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

    const [caseArray] = useState(["Asylum", "Green Card", "Citizenship", "EOIR Removal Case", "Work Visa"])
    return (
        <View className='flex-1 bg-white p-3'>
            <Text className='text-[#33363F] font-robotoBold text-2xl'>What type of case are you tracking?</Text>
            <View className='flex-col gap-3 mt-4 mb-2'>
                {getCaseTypes?.data?.map((item:string) => <TouchableOpacity key={item.id} style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} className='p-4 rounded-xl border border-gray-300' onPress={()=>navigation.navigate("Quick 1",{id:item.id})}>
                    <Text className='font-robotoBold text-lg'>{item?.name}</Text>
                </TouchableOpacity>)}
            </View>
        </View>
    )
}

export default CaseTypeForQuiz