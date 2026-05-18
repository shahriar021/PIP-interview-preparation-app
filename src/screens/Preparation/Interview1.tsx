import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Progress from "react-native-progress"
import { Audio } from 'expo-av'
import { Option, Question } from 'src/types/quiz'
import { useGetInterviewQuizzesQuery } from 'src/redux/features/interview/interviewApi'

const Interview1 = () => {
    const route = useRoute()
    const { inType, level } = route.params
    
    const navigation = useNavigation()

    // ── State ────────────────────────────────────────────────────────────────
    const [currentIndex, setCurrentIndex]         = useState(0)
    const [showHint, setShowHint]                 = useState(false)
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null)
    const [isAnswered, setIsAnswered]             = useState(false)
    const [totalCorrect,setTotalCorrect]=useState(0)

    // confidenceMap: { [questionId]: 0.0–1.0 }
    // Each question starts at 0.2 (20%). Goes to 1.0 on correct, drops on wrong.
    const [confidenceMap, setConfidenceMap] = useState<Record<number, number>>({})

    // Audio
    const soundRef                    = useRef<Audio.Sound | null>(null)
    const [isPlaying, setIsPlaying]   = useState(false)
    const [audioLoading, setAudioLoading] = useState(false)

    // ── API ──────────────────────────────────────────────────────────────────
    const { data,isLoading,error, } = useGetInterviewQuizzesQuery({
        category:inType,
        level:level,
        page: 1
    })
    console.log(data?.result_id,"interview info.....",error)
    const resId=data?.result_id
    const questions: Question[] = data?.data  ?? []
    const totalQuestions        = questions.length
    const currentQuestion       = questions[currentIndex]

    const options: Option[] = (currentQuestion?.options ?? []).filter(
        (opt: any) => opt !== null && opt !== undefined
    )

    // Confidence for the current question (default 20%)
    const confidence        = confidenceMap[currentQuestion?.id] ?? 0.2
    const confidencePercent = Math.round(confidence * 100)
    const confidenceColor   = confidence >= 0.7 ? '#22C55E'
                            : confidence >= 0.4 ? '#F59E0B'
                            : '#FF0C00'

    // ── Stop audio when question changes or component unmounts ───────────────
    useEffect(() => {
        return () => { stopAndUnloadSound() }
    }, [currentIndex])

    useEffect(() => {
        return () => { stopAndUnloadSound() }
    }, [])

    // ── Audio helpers ─────────────────────────────────────────────────────────
    const stopAndUnloadSound = async () => {
        try {
            if (soundRef.current) {
                await soundRef.current.stopAsync()
                await soundRef.current.unloadAsync()
                soundRef.current = null
                setIsPlaying(false)
            }
        } catch (_) {}
    }

    const handleListenPress = async () => {
        if (!currentQuestion?.audio_file) return

        // Already playing → stop
        if (isPlaying) {
            await stopAndUnloadSound()
            return
        }

        try {
            setAudioLoading(true)
            await stopAndUnloadSound()

            // Required for iOS silent mode
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })

            const { sound } = await Audio.Sound.createAsync(
                { uri: currentQuestion.audio_file },
                { shouldPlay: true }
            )
            soundRef.current = sound
            setIsPlaying(true)

            // Auto-reset when audio finishes
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    setIsPlaying(false)
                    soundRef.current = null
                }
            })
        } catch (e) {
            console.error('Audio error:', e)
            setIsPlaying(false)
        } finally {
            setAudioLoading(false)
        }
    }

    // ── Answer selection ──────────────────────────────────────────────────────
    const handleSelectOption = (opt: Option) => {
    if (isAnswered) return

    setSelectedOptionId(opt.id)
    setIsAnswered(true)

    if (opt.is_correct) {
        setTotalCorrect(prev => prev + 1)  // ✅ only fires once, on tap
        setConfidenceMap(prev => ({ ...prev, [currentQuestion.id]: 1.0 }))
    } else {
        setConfidenceMap(prev => {
            const current = prev[currentQuestion.id] ?? 0.2
            return { ...prev, [currentQuestion.id]: Math.max(0.05, current - 0.1) }
        })
    }
}

    // ── Navigation ────────────────────────────────────────────────────────────
    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1)
            setShowHint(false)
            setSelectedOptionId(null)
            setIsAnswered(false)
        } else {
            navigation.navigate("Quick Result" as never,{totalScore:totalCorrect,rId:resId})
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
            setShowHint(false)
            setSelectedOptionId(null)
            setIsAnswered(false)
        }
    }

    // ── Loading / Error ───────────────────────────────────────────────────────
    if (isLoading) {
        return (
            <View className='flex-1 items-center justify-center bg-white'>
                <ActivityIndicator size="large" color="#1C75AD" />
                <Text className='mt-3 text-gray-500 font-robotoRegular'>Loading quiz...</Text>
            </View>
        )
    }

    if (error || !currentQuestion) {
        return (
            <View className='flex-1 items-center justify-center bg-white p-6'>
                <Text className='text-red-500 font-robotoBold text-lg text-center'>
                    Failed to load quiz. Please try again.
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()} className='mt-4 p-3 bg-[#083D70] rounded-xl'>
                    <Text className='text-white font-robotoBold'>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const progressValue = (currentIndex + 1) / totalQuestions

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <View className='flex-1 bg-white'>

            {/* ── Gradient header ── */}
            <LinearGradient
                colors={["#1C75AD", "#083D70"]}
                style={{ borderBottomLeftRadius: 30

                 }}
            >
                <SafeAreaView style={{ padding: 10 }}>

                    {/* Back + counter */}
                    <View className='flex-row justify-between items-center w-full mb-2'>
                        <TouchableOpacity onPress={() => navigation.goBack()} className='p-1 z-10'>
                            <View className='w-[35px] h-[35px] bg-[#FFFFFF1A] items-center justify-center rounded-full'>
                                <Ionicons name="arrow-back-sharp" size={24} color="white" />
                            </View>
                        </TouchableOpacity>

                        <Text className='font-robotoBold text-white text-xl'>
                            {currentIndex + 1}/{totalQuestions}
                        </Text>

                        <View className='w-[35px]' />
                    </View>

                    {/* Question text */}
                    <View className='px-3 pb-2'>
                        <Text className='text-white font-robotoBold text-xl mt-2 mb-5 leading-7'>
                            {currentQuestion.text}
                        </Text>

                        {/* Listen + Confidence row */}
                        <View className='flex-row items-center gap-x-4'>

                            {/* Listen button */}
                            <TouchableOpacity
                                onPress={handleListenPress}
                                className='flex-row items-center gap-1 p-1 px-3 rounded-full'
                                style={{ backgroundColor: isPlaying ? '#EF4444' : '#000000' }}
                            >
                                {audioLoading
                                    ? <ActivityIndicator size="small" color="white" />
                                    : <Ionicons
                                        name={isPlaying ? "stop-circle" : "volume-medium-sharp"}
                                        size={20}
                                        color="white"
                                      />
                                }
                                <Text className='text-white font-robotoRegular text-sm ml-1'>
                                    {audioLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Listen'}
                                </Text>
                            </TouchableOpacity>

                            {/* Confidence bar */}
                            <View className='flex-1 gap-2'>
                                <Text className='text-white text-sm'>
                                    Your confidence level{' '}
                                    <Text style={{ color: confidenceColor }}>
                                        ({confidencePercent}%)
                                    </Text>
                                </Text>
                                <Progress.Bar
                                    progress={confidence}
                                    width={null}
                                    height={10}
                                    color={confidenceColor}
                                    unfilledColor='#FFFFFF1A'
                                    borderColor='#1C75AD'
                                    animationType='spring'  // ← smooth animation on update
                                />
                            </View>
                        </View>

                       
                    </View>

                </SafeAreaView>
            </LinearGradient>

            {/* ── Body ── */}
            <ScrollView
                contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Options */}
                <View className='flex-col gap-3 px-4 mb-2'>
                    {options.length > 0 ? options.map((opt) => {

                        const isSelected  = selectedOptionId === opt.id
                        const showCorrect = isAnswered && opt.is_correct
                       
                        const showWrong   = isAnswered && isSelected && !opt.is_correct

                        const borderColor = showCorrect ? '#22C55E'
                                          : showWrong   ? '#EF4444'
                                          : isSelected  ? '#1C75AD'
                                          : '#D1D5DB'

                        const bgColor = showCorrect ? '#F0FDF4'
                                      : showWrong   ? '#FEF2F2'
                                      : isSelected  ? '#EBF4FB'
                                      : 'rgba(0,0,0,0.04)'

                        const textColor = showCorrect ? '#16A34A'
                                        : showWrong   ? '#DC2626'
                                        : '#1a1a1a'

                        return (
                            <TouchableOpacity
                                key={opt.id}
                                onPress={() => handleSelectOption(opt)}
                                activeOpacity={isAnswered ? 1 : 0.7}
                                style={{
                                    backgroundColor: bgColor,
                                    borderColor,
                                    borderWidth: (isSelected || showCorrect) ? 2 : 1
                                }}
                                className='p-4 rounded-xl flex-row justify-between items-center'
                            >
                                <Text
                                    className='font-robotoBold text-base flex-1'
                                    style={{ color: textColor }}
                                >
                                    {opt.text}
                                </Text>

                                {showCorrect && <Ionicons name="checkmark-circle" size={22} color="#22C55E" />}
                                {showWrong   && <Ionicons name="close-circle"     size={22} color="#EF4444" />}
                            </TouchableOpacity>
                        )
                    }) : (
                        <View className='p-5 rounded-xl border border-dashed border-gray-300 items-center'>
                            <Text className='text-gray-400 font-robotoRegular text-sm text-center'>
                                Open-ended question.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Hint + Nav row */}
                <View className='flex-row justify-between items-center px-4 mt-4'>
                    <TouchableOpacity
                        className='flex-row items-center gap-2 bg-[#F5F5F5] py-2 px-4 rounded-full'
                        onPress={() => setShowHint(!showHint)}
                    >
                        <MaterialCommunityIcons name="lightbulb-on-outline" size={22} color="#083D70" />
                        <Text className='text-[#083D70] font-robotoBold text-base'>
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </Text>
                    </TouchableOpacity>

                    <View className='flex-row items-center gap-4'>
                        {currentIndex > 0 && (
                            <TouchableOpacity className='flex-row items-center gap-1' onPress={handlePrev}>
                                <Feather name="arrow-left" size={22} color="#083D70" />
                                <Text className='text-[#083D70] font-robotoBold text-base'>Prev</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity className='flex-row items-center gap-1' onPress={handleNext}>
                            <Text className='text-[#083D70] font-robotoBold text-base'>
                                {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
                            </Text>
                            <Feather
                                name={currentIndex === totalQuestions - 1 ? "check-circle" : "arrow-right"}
                                size={22}
                                color="#083D70"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hint box */}
                {showHint && currentQuestion.hint && (
                    <View className='bg-[#FFF8E7] border border-[#F5C518] p-4 mx-4 mt-4 rounded-xl'>
                        <View className='flex-row items-center gap-2 mb-1'>
                            <MaterialCommunityIcons name="lightbulb-on" size={18} color="#E6A817" />
                            <Text className='text-[#B57C00] font-robotoBold text-sm'>Hint</Text>
                        </View>
                        <Text className='text-[#4E4E4E] font-robotoRegular leading-5'>
                            {currentQuestion.hint}
                        </Text>
                    </View>
                )}

            </ScrollView>
        </View>
    )
}

export default Interview1