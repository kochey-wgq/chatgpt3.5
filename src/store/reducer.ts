
import initialState, { InitialState } from './state';

const reducer = (state: InitialState = initialState, { type, data }: any) => {
   let historyList :InitialState['historyList'] = state.historyList
   let historyIndex :InitialState['historyIndex'] = state.historyIndex
   let massageCollection :InitialState['massageCollection'] = state.massageCollection
   let openAIKeyState :InitialState['openAIKeyState'] = state.openAIKeyState
   switch (type) {
      case 'UPDATE_HISTORY_INDEX': 
         // 访问其他会话之前先更新当前会话（当前会话存在时,而不是新开会话）
         if(massageCollection?.length) historyList[historyIndex] = massageCollection 
         if(data === undefined || data === null){ //如果新增会话
            // 一定是所有会话数 + 1
            historyIndex = (historyList.length + 1) - 1
            massageCollection = []
         }else{   //否则访问会话 
            // 后更新 会话 索引
            historyIndex = data 
            massageCollection = historyList[historyIndex]
         } 
         return {
            ...state, 
            massageCollection,
            historyIndex 
         }
      case 'ADD_USER_MSG':
         massageCollection = [
            ...state.massageCollection,
            data,
            {
               type: 'gpt-loading'
            }
         ]
         // 如果历史记录为空则添加当前聊天记录
         if(!massageCollection.some(t => t.type === 'gpt')){
            historyList.push(massageCollection) 
         }
         return {
            ...state,
            massageCollection,
            historyList
         }
      case 'ADD_GPT_MSG':

         massageCollection = [
            ...state.massageCollection,
         ]
         if (state.massageCollection[state.massageCollection.length - 1].type === 'gpt-loading') {
            massageCollection.pop()
            massageCollection = massageCollection.concat({
               type: 'gpt',
               msgData: ''
            })
         }
         state.massageCollection[state.massageCollection.length - 1].msgData += data.msgData

         return {
            ...state,
            massageCollection
         }
      case 'CHECK_OPENAIROUTER_KEY':
         openAIKeyState = data 
         return {
            ...state,
            openAIKeyState
         }
      default:
         return state
   }
}

export default reducer