import { baseApi } from "src/redux/createdApi/baseApi"

const quizhApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getInterType: builder.query({
            query: (id) => ({
                url: `/quizzes/interview-categories/`,
                method: "GET",
            })
        }),

        getInterviewQuizzes: builder.query({
            query: ({ category, level, page }) => ({
                url: '/quizzes/interview-process/',
                method: 'GET',
                params: { category, level, page }
            })
        }),

         getIntAndAns: builder.query({
            query: (id) => ({
                url: `/quizzes/interview-results/${id}/questions-answers/`,
                method: "GET",
            })
        }),

         getIntHistory: builder.query({
            query: () => ({
                url: `/quizzes/interview-results/`,
                method: "GET", 
            })
        }),


    })
})


export const { useGetInterTypeQuery,useGetInterviewQuizzesQuery,useGetIntAndAnsQuery,useGetIntHistoryQuery } = quizhApi