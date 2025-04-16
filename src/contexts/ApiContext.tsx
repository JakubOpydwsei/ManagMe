import React, { createContext, useContext } from 'react'
import {ProjectApi} from '../api/projectApi'
import {StoryApi} from '../api/storyApi'
import {TaskApi} from '../api/taskApi'

type ApiContextType = {
  projectApi: typeof ProjectApi
  storyApi: typeof StoryApi
  taskApi: typeof TaskApi
}

const ApiContext = createContext<ApiContextType | undefined>(undefined)

function ApiProvider({children}: {children: React.ReactNode}) {
    const api = {
        projectApi: ProjectApi,
        storyApi: StoryApi,
        taskApi: TaskApi,
      }
    
      return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
    }

export default ApiProvider;

export const useApi = (): ApiContextType => {
    const context = useContext(ApiContext)
    if (!context) {
      throw new Error('useApi must be used within an ApiProvider')
    }
    return context
  }