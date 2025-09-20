import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';

const Frames = () => {
    const navigation = useNavigation()
    const {height}=useWindowDimensions()

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
            headerTitleAlign: "center",


            headerLeft: null

        });
    }, [navigation]);
  return (
    <View className='flex-1 items-center justify-center bg-white'>
     <TouchableOpacity className='items-center justify-center w-full' onPress={()=>navigation.navigate("Frame Shorts")}>
        <Text>touch</Text>
     </TouchableOpacity>
    </View>
  )
}

export default Frames