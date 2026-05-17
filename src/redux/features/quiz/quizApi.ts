import { baseApi } from "src/redux/createdApi/baseApi"

const quizhApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getQuizInfo: builder.query({
            query: (id) => ({
                url: `/quizzes/quick-quiz/`,
                method: "GET",
                params: { case_type: id },  
            })
        }),

        getQuizAndAns: builder.query({
            query: (id) => ({
                url: `/quizzes/quiz-results/${id}/questions-answers/`,
                method: "GET",
            })
        }),

    })
})

export const {useGetQuizInfoQuery ,useGetQuizAndAnsQuery} = quizhApi