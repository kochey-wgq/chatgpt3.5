import OpenAI from "openai"
import type { InitialState } from '../store/state';
interface ResponseMsg {
   content : InitialState['massageCollection'] ,
   onMessageReceived : (delta : {[propsName : string]: string}) => void 
}
class ChatGpt {
   openAi: any
   constructor() {
      this.openAi = this.initGPT()
   }
   initGPT() {
      const openai = new OpenAI({
         baseURL: "https://openrouter.ai/api/v1",
         apiKey: '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',
         dangerouslyAllowBrowser: true,
         defaultHeaders: {
            //   "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
            //   "X-Title": $YOUR_APP_NAME, // Optional. Shows in rankings on openrouter.ai.
         }
      })
      return openai
   }
   async responseMsg({content,onMessageReceived}:ResponseMsg) {
      const openAi = this.openAi
      const res = await openAi.chat.completions.create({
         model: "openai/gpt-3.5-turbo",
         stream: true,
         messages: content.map(t =>{
            return {
               role : t.type === 'me' || t.type === 'gpt-loading' ? 'user' : 'assistant',
               content : t.msgData || ''
            }
         }).filter(t => t.role !== 'gpt-loading')
         
      }) 
      for await (const chunk of res) {
         console.log(chunk,'chunk.choices')
         // 处理每个数据块
         onMessageReceived(chunk.choices[0].delta)
      }   
   }
}


export default ChatGpt