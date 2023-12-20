import { createQueryKeys } from "@lukemorales/query-key-factory"
import axios from "axios"

const url = process.env.NEXT_PUBLIC_HOST_API || " "
const token = process.env.NEXT_PUBLIC_TOKEN_API || " "

export const getContents = async () => {
 try{
    const headers = {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    }
    const contents = await axios.get(`${url}api/contents?populate=*`, headers)
return contents.data
 }
 catch(error){
    console.log(error)
 }
}

export const getContent = async ({id} : {id : number}) => {
    try{
       const headers = {
           headers: {
               'Authorization' : 'Bearer ' + token
           }
       }
       const contents = await axios.get(`${url}api/contents/${id}?populate=*`, headers)
   return contents.data
    }
    catch(error){
       console.log(error)
    }
   }
   

export const contentsKey = createQueryKeys('content', {
    list: (filters) => ({
        queryKey: [{filters}],
        queryFn: (ctx) => getContents
    })
})