import { baseApi } from "src/redux/createdApi/baseApi"

const frameApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllVideos:builder.query({
            query:()=>({
                url:"/system/app/videos/",
                method:"GET",
            })
        }),

         getVideoBasedOnId:builder.query({
            query:(id)=>({
                url:`/system/app/videos/${id}/`,
                method:"GET",
            })
        }),

        
    })
})

export const {useGetAllVideosQuery,useGetVideoBasedOnIdQuery}=frameApi




