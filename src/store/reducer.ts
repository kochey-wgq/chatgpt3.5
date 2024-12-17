
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
         return {
            ...state,
            massageCollection
         }
      default:
         return state
   }
}

export default reducer