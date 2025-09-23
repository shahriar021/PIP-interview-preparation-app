import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { scale, verticalScale } from 'react-native-size-matters'
import Svg, { Text as SvgText, Defs, Stop, TextPath,LinearGradient } from 'react-native-svg';
import { LinearGradient as ExpoLinearGradient} from 'expo-linear-gradient'


const Subscription = () => {
    const navigation = useNavigation()
    const handleSbuscribe = () => {
        navigation.navigate("Payment")
    }
    return (
        <SafeAreaView className='flex-1 bg-white items-center '>
            <TouchableOpacity style={{ alignSelf: 'flex-start' }} className='bg-[#E9EBEF] p-2 rounded-full m-3' onPress={() => navigation.goBack()}>
                <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ alignItems: "center" }} showsVerticalScrollIndicator={false}>
                <View style={{ width: scale(260), height: verticalScale(230) }}>
                    <Image source={require("../../../assets/pipyrit/subscribe.png")} style={{ width: "100%", height: "100%" }} />
                </View>
                <View style={{ width: scale(320), height: verticalScale(44), marginTop: 10, marginBottom: 10 }}>
                    <Image source={require("../../../assets/pipyrit/7day.png")} style={{ width: "100%", height: "100%" }} resizeMode='contain' />
                </View>
                <Text className='mt-2 mb-2 text-center text-[#484848]'>Enjoy unrestricted access to interview prep tools for 7 days. Explore real interview questions, speaking practice, and downloadable guides. You can cancel anytime—no payment required during the trial.</Text>

                <View className='w-full items-start p-3  '>
                    <View className=' flex-row items-center gap-2 mt-2 mb-1'>
                        <Image source={require("../../../assets/pipyrit/ok.png")} style={{ width: 20, height: 20 }} />
                        <Text>Access all premium interview questions</Text>
                    </View>
                    <View className='flex-row items-center gap-2 mt-2 mb-1'>
                        <Image source={require("../../../assets/pipyrit/ok.png")} style={{ width: 20, height: 20 }} />
                        <Text>Download questions & answers as PDF</Text>
                    </View>
                    <View className='flex-row items-center gap-2 mt-2 mb-1'>
                        <Image source={require("../../../assets/pipyrit/ok.png")} style={{ width: 20, height: 20 }} />
                        <Text>Voice mode with feedback</Text>
                    </View>
                    <View className='flex-row items-center gap-2 mt-2 mb-1'>
                        <Image source={require("../../../assets/pipyrit/ok.png")} style={{ width: 20, height: 20 }} />
                        <Text>Mini video tips for better prep</Text>
                    </View>
                    <View className='flex-row items-center gap-2 mt-2 mb-1'>
                        <Image source={require("../../../assets/pipyrit/ok.png")} style={{ width: 20, height: 20 }} />
                        <Text>Access all premium interview questions</Text>
                    </View>
                    <View className='flex-row items-center gap-2 mt-2 mb-1'>
                        <Image source={require("../../../assets/pipyrit/ok.png")} style={{ width: 20, height: 20 }} />
                        <Text>Multilingual support</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Svg width="300" height="80" viewBox="0 0 300 80">
                        {/* Define the Gradient */}
                        <Defs>
                            <LinearGradient id="gradient1" x1="100%" y1="0%" x2="100%" y2="100%">
                                <Stop offset="0%" stopColor="#0090EA" />
                                <Stop offset="100%" stopColor="#8CD2FF" />
                            </LinearGradient>
                        </Defs>

                        {/* Apply the Gradient to the Text */}
                        <SvgText fill="url(#gradient1)" fontSize="32" fontWeight="bold" x="20" y="50">
                            Annual | $19.99
                        </SvgText>
                    </Svg>
                </View>
            </ScrollView>

            <View className='w-full items-center p-3'>
                <ExpoLinearGradient colors={["#1C75AD", "#083D70"]} style={{ width: "100%", margin: 5, borderRadius: 10 }}>
                <TouchableOpacity className='p-4 items-center' onPress={handleSbuscribe}>
                    <Text className='font-robotoBold text-white text-xl'>Subscribe</Text>
                    <Text className='font-robotoRegular text-white text-md'>No payment requred today</Text>
                </TouchableOpacity>
            </ExpoLinearGradient>
            </View>
        </SafeAreaView>
    )
}

export default Subscription