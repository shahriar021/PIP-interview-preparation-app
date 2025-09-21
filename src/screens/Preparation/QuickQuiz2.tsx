import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { verticalScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as Progress from "react-native-progress";

const QuickQuiz2 = () => {
    const navigation = useNavigation()
        const [caseArray] = useState(["Freedom of speech", "Right to bear arms", "Vote in a fedreal election", "Right to a fair trial"])
        const [showHint,setShowHint]=useState(false)
  return (
        <View className='flex-1 bg-white'>
            <LinearGradient colors={["#1C75AD", "#083D70"]} style={{ height: verticalScale(230), borderBottomLeftRadius: 30 }}>
                <SafeAreaView style={{ padding: 10, flex: 1 }}>
                    <View className='flex-row justify-between items-center w-full mb-2'>
                        <TouchableOpacity className='p-1  z-10' onPress={() => navigation.goBack()}>
                            <View className='w-[35px] h-[35px]  bg-[#FFFFFF1A] items-center justify-center rounded-full'>
                                <Ionicons name="arrow-back-sharp" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                        <Text className='font-robotoBold text-white text-xl w-[45px] h-[35px]'>3/25</Text>
                        <Text className='w-[35px] h-[35px]'>{""}</Text>
                    </View>


                    <View className='p-3 mb-2' style={{ flex: 1, justifyContent: "space-around" }}>
                        <Text className='text-white font-robotoBold text-2xl mt-2 mb-2'>Name one right only for United States citizens.</Text>

                        <View className='flex-row items-center gap-x-10 mt-3 '>
                            <View className='bg-black flex-row items-center gap-1 p-1 px-2 rounded-full'>
                                <Ionicons name="volume-medium-sharp" size={24} color="white" />
                                <Text className='text-white font-robotoRegular'>Listen</Text>
                            </View>



                            <View className='flex-1 gap-2 '>
                                <Text className='text-white'>Your confidence level<Text className='text-[#FF0C00]'>{" "}(20%)</Text></Text>
                                <Progress.Bar progress={.2} width={null} height={10} color='#FF0C00' unfilledColor='#FFFFFF1A' borderColor='#1C75AD' />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
            <ScrollView contentContainerStyle={{paddingBottom:150}} showsVerticalScrollIndicator={false}>
            <View className='flex-col gap-3 mt-4 mb-2 p-3'>
                {caseArray.map((item) => <TouchableOpacity key={item} style={{ backgroundColor: 'rgba(0,0,0,0.05)' }} className='p-4 rounded-xl border border-gray-300' onPress={() => navigation.navigate("Case Details create")}>
                    <Text className='font-robotoBold text-lg'>{item}</Text>
                </TouchableOpacity>)}
            </View>

            <View className='flex-row justify-between p-3 mt-2'>
                <TouchableOpacity className='flex-row items-center gap-2 bg-[#F5F5F5] p-2 rounded-full' onPress={()=>setShowHint(!showHint)}>
                    <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color="#083D70" />
                    <Text className='text-[#083D70] font-robotoBold text-xl'>Show Hint</Text>
                </TouchableOpacity>

                <TouchableOpacity className='flex-row items-center gap-2' onPress={()=>navigation.navigate("Quick 3")}>
                    <Text className='text-[#083D70] font-robotoBold text-xl'>Next</Text>
                   <Feather name="arrow-right" size={24} color="#083D70" />
                </TouchableOpacity>
            </View>

            {showHint&&<View className='bg-[#F5F5F5] p-3 m-3 rounded-xl'>
                <Text className='text-[#4E4E4E]'>Think about what only citizens can do that even legal residents cannot. It's related to voting and holding certain official positions. Ask yourself: who gets a ballot on election d</Text>
            </View>}
            </ScrollView>
        </View>
    )
}

export default QuickQuiz2