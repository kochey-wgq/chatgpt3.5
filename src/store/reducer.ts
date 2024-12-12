
import initialState, { InitialState } from './state';

const reducer = (state: InitialState = initialState, { type, data }: any) => {
   switch (type) {
      case 'ADD_USER_MSG':
         return {
            ...state,
            massageCollection: [
               ...state.massageCollection,
               data
            ]
         }
      case 'ADD_GPT_MSG':
         let massageCollection : InitialState['massageCollection'] = []
         massageCollection = [
            ...state.massageCollection 
         ]
         if(state.massageCollection[state.massageCollection.length - 1]?.type !== 'gpt'){
            massageCollection = massageCollection.concat(data)
         }else{ 
            state.massageCollection[state.massageCollection.length - 1].msgData += data.msgData
         }
         return {
            ...state,
            massageCollection
         }
      default:
         return state
   }
}

export default reducer