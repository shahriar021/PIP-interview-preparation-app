import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { useGetQuizHistoryQuery } from 'src/redux/features/quiz/quizApi'
import { useGetIntAndAnsQuery, useGetIntHistoryQuery } from 'src/redux/features/interview/interviewApi'

// ── Type ──────────────────────────────────────────────────────────────────────
type QuizHistoryItem = {
    id: number
    correct_answers: number
    total_questions: number
    total_points_earned: number
    created_at: string
}

const History = () => {
    const [isQuiz, setIsQuiz] = useState("quiz")
    const navigation = useNavigation()

    const { data: getQuizHist, isLoading } = useGetQuizHistoryQuery(undefined)
    const { data: getIntHistory, isLoading:interviewLoading } = useGetIntHistoryQuery(undefined)

    // API: { count, results: [...] }
    const quizList: QuizHistoryItem[]      = getQuizHist?.results   ?? []
const interviewList: QuizHistoryItem[] = getIntHistory?.results  ?? []  // ← add this

// Then switch based on active tab
const activeList    = isQuiz === "quiz" ? quizList    : interviewList
const activeLoading = isQuiz === "quiz" ? isLoading   : interviewLoading

    // ── Format date: "2026-05-18 16:12:43" → "18 May 2026" ───────────────────
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr.replace(' ', 'T'))
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    // ── Header ────────────────────────────────────────────────────────────────
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "History",
            headerTitleStyle: { fontFamily: 'open-sans' },
            headerStyle: {
                backgroundColor: "white",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            },
            headerTintColor: "#305FA1",
            headerTitleAlign: "left",
            headerLeft: () => (
                <TouchableOpacity className='p-1' onPress={() => navigation.navigate("BottomScreen", { screen: "Profile" })}>
                    <View className='w-[35px] h-[35px] bg-[#1D35571A] items-center justify-center rounded-full'>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            )
        })
    }, [navigation])

    return (
        <View className='flex-1 p-1'>

            {/* Tabs */}
            <View className='flex-row gap-2 p-3 mt-2 mb-2'>
                <TouchableOpacity onPress={() => setIsQuiz("quiz")}>
                    <Text className={`${isQuiz === "quiz" ? "underline text-[#305FA1]" : ""} font-robotoBold text-lg`}>
                        Quizzes
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsQuiz("interview")}>
                    <Text className={`${isQuiz !== "quiz" ? "underline text-[#305FA1]" : ""} font-robotoBold text-lg`}>
                        Interview
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Loading */}
           {/* Loading */}
{activeLoading ? (                                    // ← was isLoading
    <View className='flex-1 items-center justify-center'>
        <ActivityIndicator size="large" color="#1C75AD" />
    </View>
) : activeList.length === 0 ? (                       // ← was quizList.length
    <View className='flex-1 items-center justify-center'>
        <Text className='text-gray-400 font-robotoRegular text-base'>No history yet.</Text>
    </View>
) : (
    <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
    >
        {activeList.map((item) => (                   // ← was quizList.map
            <View
                key={item.id}
                className='flex-row justify-between items-center border border-[#0000000D] rounded-2xl p-2 overflow-hidden mt-1 mb-2 gap-1 m-4'
                style={{ borderLeftColor: "#305FA1", borderLeftWidth: 4 }}
            >
                <View className='flex-col gap-1 py-3 flex-1'>
                    <Text className='text-[#000000] text-xl font-robotoBold' numberOfLines={1}>
                        {isQuiz === "quiz" ? "Quiz" : "Interview"}
                    </Text>
                    <Text className='text-[#33363F]' numberOfLines={1}>
                        Result:{' '}
                        <Text className='text-[#000000] font-robotoBold'>
                            {item.correct_answers}/{item.total_questions}
                        </Text>
                    </Text>
                    <Text className='text-[#33363F]' numberOfLines={1}>
                        Points:{' '}
                        <Text className='text-[#305FA1] font-robotoBold'>
                            {item.total_points_earned}
                        </Text>
                    </Text>
                </View>
                <View className='items-center p-2 rounded-full'>
                    <Text className='text-[#4D4D55]'>{formatDate(item.created_at)}</Text>
                </View>
            </View>
        ))}
    </ScrollView>
)}
        </View>
    )
}

export default History