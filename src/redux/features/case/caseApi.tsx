import { baseApi } from "src/redux/createdApi/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getCaseTypes:builder.query({
            query:()=>({
                url:"/cases/types/",
                method:"GET",
            })
        }),

         getAllCase:builder.query({
            query:()=>({
                url:"/cases/my-cases/",
                method:"GET",
            }),
            providesTags:['Case']
        }),

        postAllCase:builder.mutation({
            query:(body)=>({
                url:"/cases/my-cases/",
                method:"POST",
                body,
                 formData: true,
            }),
            invalidatesTags:['Case']
        }),

        getCaseBasedOnId:builder.query({
            query:(id)=>({
                url:`/cases/my-cases/${id}/`,
                method:"GET",
            })
        }),

        editCaseBasedOnId:builder.mutation({
            query:({id,body})=>({
                url:`/cases/my-cases/${id}/`,
                method:"PATCH",
                body
            }),
            invalidatesTags:['Case']
        }),
       
    })
})

export const {useGetCaseTypesQuery,useGetAllCaseQuery,useGetCaseBasedOnIdQuery,useEditCaseBasedOnIdMutation,usePostAllCaseMutation}=authApi




