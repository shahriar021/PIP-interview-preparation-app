import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';

const Frames = () => {
    const navigation = useNavigation()
    const { height } = useWindowDimensions()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Frames",
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


            headerLeft: null

        });
    }, [navigation]);

    const [videoArray] = useState(Array.from({ length: 20 }, (_, i) => i + 1))

    return (
        <View className='flex-1 items-center justify-center bg-white p-3'>


            <ScrollView>
                <View className='flex-row flex-wrap gap-2'>
                    {videoArray.map(item => <TouchableOpacity style={{ width: "49%", height: verticalScale(247), borderRadius: 9, overflow: "hidden",position:'relative' }} onPress={() => navigation.navigate("Frame Shorts")}>
                        <Image source={require("../../../assets/pipyrit/framesImage.png")} style={{ width: "100%", height: "100%" }} />
                            <Text className='absolute bottom-2 m-2 text-white font-robotoRegular'>Top Mistakes to Avoid in the Marriage Interview</Text>
                    </TouchableOpacity>)}
                </View>
            </ScrollView>
        </View>
    )
}

export default Frames