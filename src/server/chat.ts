/**
 * 使用时必须切换
 * 
 */

import OpenAI from "openai"
import type { InitialState } from '../store/state';
interface ResponseMsg {
   content: InitialState['massageCollection'],
   onMessageReceived: (delta: { [propsName: string]: string }) => void
}
class ChatGpt {
   openAi: any
   constructor() {
      this.openAi = this.initGPT() 
   }
   initGPT() {
      const openai = new OpenAI({
         baseURL: "https://openrouter.ai/api/v1",
         apiKey: import.meta.env.VITE_APP_CAHT_GPT_KEY
,
         dangerouslyAllowBrowser: true,
         defaultHeaders: {
            //   "HTTP-Referer": $YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
            //   "X-Title": $YOUR_APP_NAME, // Optional. Shows in rankings on openrouter.ai.
         }
      })
      return openai
   }
   async responseMsg({ content, onMessageReceived }: ResponseMsg) {
      const openAi = this.openAi
      const res = await openAi.chat.completions.create({
         model: "openai/gpt-3.5-turbo",
         stream: true,
         messages: content.map(t => {
            return {
               role: t.type === 'me' || t.type === 'gpt-loading' ? 'user' : 'assistant',
               content: t.msgData || ''
            }
         }).filter(t => t.role !== 'gpt-loading')

      })
      try {
         for await (const chunk of res) {
            console.log(chunk, 'chunk.choices')
            // 处理每个数据块
            onMessageReceived(chunk.choices[0].delta)
         }
      } catch (error) { //如果错误就查询key状态
         fetch("https://openrouter.ai/api/v1/auth/key", {
            method: "GET",
            headers: {
               Authorization: `Bearer ${import.meta.env.VITE_APP_CAHT_GPT_KEY
}`,
            },
         }).then(async res => {
            console.log(await res.json())
         })
      }
   }
}


export default ChatGpt