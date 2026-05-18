import { baseApi } from "src/redux/createdApi/baseApi"

const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTermOrPrivacyOrAbout: builder.query({
            query: (key) => ({
                url: `/system/legal/${key}/`,
                method: "GET",
            })
        }),


        getProfile: builder.query({
            query: (id) => ({
                url: `/users/profile/${id}/`,
                method: "GET",
            }),
            providesTags:['Profile']
        }),

        editProfile: builder.mutation({
            query: ({ id, body }) => ({
                url: `/users/profile/${id}/`,
                method: "PATCH",
                body,                   
            }),
            invalidatesTags: ['Profile'] 
        }),

        changePass: builder.mutation({
            query: (body) => ({
                url: `/users/profile/change-password/`,
                method: "POST",
                body
            })
        }),


    })
})

export const { useGetTermOrPrivacyOrAboutQuery, useGetProfileQuery, useEditProfileMutation,useChangePassMutation } = profileApi




