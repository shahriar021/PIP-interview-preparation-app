import { baseApi } from "src/redux/createdApi/baseApi"

const profileApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getTermOrPrivacyOrAbout:builder.query({
            query:(key)=>({
                url:`/system/legal/${key}/`,
                method:"GET",
            })
        }),

         

        
    })
})

export const {useGetTermOrPrivacyOrAboutQuery}=profileApi




