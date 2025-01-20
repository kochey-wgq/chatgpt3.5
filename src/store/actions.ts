// 驱动reducer添加消息集合(user)
export const updateHistoryIndex = (data?: number) =>{
   return {
      type : 'UPDATE_HISTORY_INDEX',
      data
   }
}
export const addUserMsg = (data : any) =>{
   return {
      type : 'ADD_USER_MSG',
      data
   }
}
// 驱动reducer添加消息集合(gpt)
export const addGptMsg = (data : any) =>{
   return {
      type : 'ADD_GPT_MSG',
      data
   }
}