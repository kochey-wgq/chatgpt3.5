import React from "react"
var timer: null | number | NodeJS.Timeout = null
let current = 0
let chatStr = ''
interface DisplayChatResponse {
   response: {
      content: string | null
   },
   callback: Function,
   time?: number
}
const displayChatResponse = ({ response, callback }: DisplayChatResponse): void => {
   const { content } = response
   if (current < (content as string).length) {
      chatStr = (content as string).charAt(current); // 只获取当前字符
      current++
      callback(chatStr, timer)
   } else {
      clearInterval(timer as number); // 确保清除定时器
      timer = null;
   }
}
// 打印机
export const playChatResponse = ({ response, callback ,time}: DisplayChatResponse) => {
   current = 0
   chatStr = ''
   timer = setInterval(() => {
      displayChatResponse({ response, callback })
   }, time ? time : 50);
}


// window chat active
export const scrollIntoView = (ChatContentDom: React.RefObject<HTMLInputElement>) => {
   
   if (ChatContentDom.current) {
      // 滚动到最底部 
      const chatWindow = ChatContentDom.current;
      if (chatWindow) { 
          chatWindow.scrollTo({
            top : chatWindow.scrollHeight, 
         })
      }
   }
   
}