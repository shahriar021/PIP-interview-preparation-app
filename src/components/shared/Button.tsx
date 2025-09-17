import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

interface ButtonProps {
    title: string
    , colors: readonly string[]
    , labelSize: number
    , labelFont: string
    , labelColor: string
    , onPress: () => void
}

const Button = ({ title, colors, labelSize, labelFont, labelColor, onPress }: ButtonProps) => {
    return (
        <LinearGradient colors={colors as readonly [string, string, ...string[]]} style={{ width: "100%", margin: 5, borderRadius: 40 }}>
            <TouchableOpacity className='p-4 items-center' onPress={onPress}>
                <Text style={{ fontSize: labelSize, fontFamily: labelFont, color: labelColor }}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default Button