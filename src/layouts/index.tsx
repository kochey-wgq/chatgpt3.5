import React, { useState, useRef,useEffect } from 'react'
import style from './index.module.less'
import { playChatResponse } from '../utils';
import MessageBtn,{ForwardRef} from '../components/messageBtn'
import ChatContent from '../components/chatContent'
import type { InitialState } from '../store/state';
import { useSelector } from 'react-redux' 
import AppBar from '../components/appBar'
const Layouts: React.FC = (): JSX.Element => {
   // getCollectionMsg
   const collectionMsglist = useSelector<InitialState, InitialState['massageCollection']>((state) => state.massageCollection)
   // 消息列表有数据转换布局模式
   const [collMsgToggle, setCollMsgToggle] = useState<boolean>(false)
   const chatContentDom = useRef<HTMLInputElement>(null) 
   const messageBtnRef = useRef<ForwardRef>(null) 
   const [tips,setTips] = useState<string>('')
   // 接收子组件的方法状态提升
   const listenFieldVal = (fieldVal: string) => {
      console.log(fieldVal,'fieldVal')
   }
   const listenCollMsgToggle = (collMsgToggle: boolean) => { 
      setCollMsgToggle(collMsgToggle)
   }
   const visibilityDom = (toggle: boolean): string => {
      return `${toggle ? 'none' : 'block'}`
   }
   useEffect(()=>{
      playChatResponse({
         response : {content : '有什么可以帮忙的？'},
         callback(str:string){ 
            setTips(prev => prev += str)
         } ,
         time : 250
      })
   },[])
   // 辅助信息事件
   const asideText = (e:React.MouseEvent<HTMLElement>) =>{ 
      messageBtnRef.current?.sendAsideText(  (e.target as HTMLElement).innerHTML  )
   } 
   const initChatCom = (): JSX.Element => { 
      return (
         <>
            <h1 style={{ display: visibilityDom(collMsgToggle) }}>{tips}</h1>
            <MessageBtn ref={messageBtnRef} onFieldVal={listenFieldVal} onCollMsgToggle={listenCollMsgToggle} />
            <br style={{ display: visibilityDom(collMsgToggle) }} />
            <aside style={{ display: visibilityDom(collMsgToggle) }}>
               <ul className={style.buttonGroup} onClick={asideText}>
                  <li className={style.iconButton}>总结文本</li>
                  <li className={style.iconButton}>代码</li>
                  <li className={style.iconButton}>构思</li>
                  <li className={style.iconButton}>制定计划</li>
                  <li className={style.iconButton}>提供建议</li>
               </ul>
            </aside>
         </>
      )
   }
   return (
      <>
         <div className={style.layouts}>
            <section className={`${collMsgToggle ? style['flex'] : ''}`}>
               {/* nav */}
               <AppBar onCollMsgToggle={listenCollMsgToggle}/>
               {/* 聊天区块 */}
               <div ref={chatContentDom} className={style.chatContent} style={{ display: visibilityDom(!collMsgToggle) }}>
                  <ChatContent ChatContentDom={chatContentDom} collectionMsglist={collectionMsglist} />
               </div>
               {/* default | communicate */}
               {initChatCom()}
            </section>
         </div>
      </>
   )
}
export default Layouts