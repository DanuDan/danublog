import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getContent, getContents, searchContent } from "../services/contents";

  export const contentsKeys = createQueryKeyStore({
    users: null,
    contents: {
      detail: (slug : string) => ({
        queryKey: ['contents'],
        queryFn: () => getContent({slug}),
      }),
      list: () => ({
        queryKey: ['contents'],
        queryFn: getContents,
      }),
      search: (title:string) => ({
        queryKey: ['contents'],
        queryFn: () => searchContent(title),
      }),
    },
    action: {
      updateView: (title:string) => ({
        queryKey: ['contents'],
        queryFn: () => searchContent(title),
      }),
    }
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
