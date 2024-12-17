export interface MassageObj {
   type : string,
   msgData : string
}
export interface InitialState {
   massageCollection : MassageObj[]
}


const initialState : InitialState = {
   massageCollection : [
      // {
      //    type : 'me',
      //    msgData : 'hello'
      // }
   ] // 消息集合
}
export default initialState