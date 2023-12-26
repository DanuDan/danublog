import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getContent, getContents, searchContent } from "../services/contents";

  export const contentsKeys = createQueryKeyStore({
    users: null,
    contents: {
      detail: (slug : string) => ({
        queryKey: ['contents'],
        queryFn: () => getContent({slug}),
        refetchOnWindowFocus: false,
        staleTime: 5000,
      }),
      list: () => ({
        queryKey: ['contents'],
        queryFn: () => getContents(),
        staleTime: 5000
      }),
      search: (title:string) => ({
        queryKey: ['contents'],
        queryFn: () => searchContent(title),
        
      }),
    },
  },
)

  export const contentSearchKeys = createQueryKeyStore({
    users: null,
    contents: {
      list: (title:string) => ({
        queryKey: ['contentSearch'],
        queryFn: () => searchContent(title),
      }),
    },
  })
