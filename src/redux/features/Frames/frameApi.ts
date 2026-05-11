import { baseApi } from "src/redux/createdApi/baseApi"

const frameApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllVideos:builder.query({
            query:()=>({
                url:"/system/app/videos/",
                method:"GET",
            })
        }),

        
    })
})

export const {useGetAllVideosQuery}=frameApi




