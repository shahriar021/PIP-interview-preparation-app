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

        submitMarksnPoints: builder.mutation({
            query: (body) => ({
                url: `/quizzes/quick-quiz/save-score/`,
                method: "POST",
                body
            })
        }),

        getQuizHistory: builder.query({
            query: (id) => ({
                url: `/quizzes/quiz-results/`,
                method: "GET", 
            })
        }),

    })
})

export const {useGetQuizInfoQuery ,useGetQuizAndAnsQuery,useSubmitMarksnPointsMutation,useGetQuizHistoryQuery} = quizhApi