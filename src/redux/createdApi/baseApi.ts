// import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import { RootState } from "../store"
// import { useAppDispatch } from "../hooks"

// const DynamicBaseQRY=async (args:any,api:any,extraOption:any)=>{
//   const baseUrl:string = process.env.EXPO_PUBLIC_BASE_URL
//   console.log(baseUrl,"base url..")

//   const rawBaseQry = fetchBaseQuery({
//     baseUrl,
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token
//       console.log(token,"---")

//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`)
//       }

//       return headers
//     }
//   })

//   return rawBaseQry(args,api,extraOption)
// }

// export const baseApi =createApi({
//   reducerPath:"baseApi",
//   baseQuery:DynamicBaseQRY,
//   endpoints:()=>({})
// })

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../store"

// ✅ Created ONCE — not inside the function
const rawBaseQry = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    return headers
  }
})

// Wrapper only for re-auth / retry logic if needed later
const DynamicBaseQRY = async (args: any, api: any, extraOption: any) => {
  return rawBaseQry(args, api, extraOption)
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: DynamicBaseQRY,
  endpoints: () => ({})
})