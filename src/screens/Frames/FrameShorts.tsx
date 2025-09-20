import { View, Text, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Video from 'react-native-video'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const FrameShorts = () => {
    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const videoRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [progress, setProgress] = useState(0); // Progress 0-1
    const handleProgress = ({ currentTime, playableDuration }) => {
        if (playableDuration > 0) {
            setProgress(currentTime / playableDuration);
        }
    };
    return (
        <View className='flex-1 bg-black relative'>
            <TouchableOpacity className='p-1 absolute z-10' onPress={() => navigation.goBack()}>
                <View className='w-[35px] h-[35px]  bg-[#1D35571A] items-center justify-center rounded-full'>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <Video
                ref={videoRef}
                source={require("../../../assets/video/videocase1.mp4")}
                style={{ height: "100%", width: '100%', position: 'relative' }}
                resizeMode="cover"
                controls
                paused={false} // Handle pause/play on scroll
                onProgress={handleProgress}
            />
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: 'absolute',
                    top: 40,
                    left: 20,
                    backgroundColor: 'rgba(29, 53, 87, 0.1)',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10
                }}
            >
                <Ionicons name="arrow-back-sharp" size={24} color="white" />
            </TouchableOpacity>

            <Text className='absolute bottom-4 left-3 font-robotoBold text-white text-xl '>Top Mistakes to Avoid in the Marriage Interview...</Text>
        </View>
    )
}

export default FrameShorts