export interface MassageObj {
   type : string,
   msgData : string
}
export interface InitialState {
   massageCollection : MassageObj[],
   historyList : Array<MassageObj[]>,
   historyIndex : number
}


const initialState : InitialState = {
   historyIndex : 0, //历史索引
   historyList : [], //历史记录
   massageCollection : [
      // {
      //    type : 'me',
      //    msgData : 'hello'
      // }
   ] // 消息集合
}
export default initialState