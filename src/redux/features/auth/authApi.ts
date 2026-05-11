import { baseApi } from "src/redux/createdApi/baseApi"

const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(loginData)=>({
                url:"/users/login/",
                method:"POST",
                body:loginData
            })
        }),
        signUp:builder.mutation({
            query:(signData)=>({
                url:"/users/register/",
                method:"POST",
                body:signData
            })
        }),
        verifyOtp:builder.mutation({
            query:(verifyOtp)=>({
                url:"/users/verify-otp/",
                method:"POST",
                body:verifyOtp
            })
        }),
        forgetPass:builder.mutation({
            query:(verifyEmail)=>({
                url:"/users/forgot-password/",
                method:"POST",
                body:verifyEmail
            })
        }),
        resetPass:builder.mutation({
            query:(resetPass)=>({
                url:"/users/forgot-password/",
                method:"POST",
                body:resetPass,
                formData: true,
            })
        })
    })
})

export const {useLoginMutation,useSignUpMutation,useVerifyOtpMutation,useForgetPassMutation,useResetPassMutation}=authApi