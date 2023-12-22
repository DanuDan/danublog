import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getContent, getContents } from "../services/contents";


export const queryKeys = createQueryKeyStore({
    users: null,
    contents: {
      detail:  null,
      list: (slug : string) => ({
        queryKey: ['content'],
        queryFn: () => getContent({slug}),
      }),
    },
  })

  export const contentsKeys = createQueryKeyStore({
    users: null,
    contents: {
      detail:  null,
      list: () => ({
        queryKey: ['contents'],
        queryFn: () => getContents(),
      }),
    },
  })
