
import initialState, { InitialState } from './state';

const reducer = (state: InitialState = initialState, { type, data }: any) => {
   switch (type) {
      case 'ADD_USER_MSG':
         return {
            ...state,
            massageCollection: [
               ...state.massageCollection,
               data,
               {
                  type : 'gpt-loading' 
               }
            ]
         }
      case 'ADD_GPT_MSG':
         let massageCollection : InitialState['massageCollection'] = []
         let historyList :InitialState['historyList'] = []
         massageCollection = [
            ...state.massageCollection,
         ]
         if(state.massageCollection[state.massageCollection.length - 1].type === 'gpt-loading'){
            massageCollection.pop()
            massageCollection = massageCollection.concat({
               type : 'gpt',
               msgData : '' 
            })
         }
         state.massageCollection[state.massageCollection.length - 1].msgData += data.msgData
         // 如果历史记录为空则添加当前聊天记录
         !historyList.length && historyList.push(massageCollection)
         return {
            ...state,
            massageCollection,
            historyList
         }
      default:
         return state
   }
}

export default reducer