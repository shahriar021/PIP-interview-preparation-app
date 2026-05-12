import { View, Text, useWindowDimensions, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { verticalScale } from 'react-native-size-matters';
import { useGetAllVideosQuery } from 'src/redux/features/Frames/frameApi';

const Frames = () => {
    const navigation = useNavigation()
    const { height } = useWindowDimensions()
    const {data:getAllVideos}=useGetAllVideosQuery(undefined)

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


    return (
        <View className='flex-1 items-center justify-center bg-white p-3'>


            <ScrollView>
                <View className='flex-row flex-wrap gap-2'>
                    {getAllVideos?.results?.map(item => <TouchableOpacity key={item?.id} style={{ width: "49%", height: verticalScale(247), borderRadius: 9, overflow: "hidden",position:'relative' }} onPress={() => navigation.navigate("Frame Shorts",{id:item.id})}>
                        <Image source={{uri:item?.thumbnail}} style={{ width: "100%", height: "100%" }} />
                            <Text className='absolute bottom-2 m-2 text-white font-robotoRegular'>{item?.description}</Text>
                    </TouchableOpacity>)}
                </View>
            </ScrollView>
        </View>
    )
}

export default Frames