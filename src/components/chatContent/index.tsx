import type { InitialState } from '../../store/state';
import MDEditor from '@uiw/react-md-editor';
import style from './index.module.less'
import { useLayoutEffect, forwardRef } from 'react';
import { useDispatch } from 'react-redux'
import { addGptMsg } from '../../store/actions';
import openAI from '../../server/chat';
import { scrollIntoView } from '../../utils'
type ForwardProps = {
   collectionMsglist: InitialState['massageCollection'],
   ChatContentDom: React.RefObject<HTMLInputElement>
}
const ChatContent = forwardRef<HTMLInputElement, ForwardProps>(({ collectionMsglist, ChatContentDom }): JSX.Element => {
   const dispatch = useDispatch()
   const gpt = new openAI
   useLayoutEffect(() => {
      if (!collectionMsglist.length) return
      scrollIntoView(ChatContentDom)
      if (collectionMsglist[collectionMsglist.length - 1].type === 'me') (async () => {
         gpt.responseMsg({
            content: collectionMsglist[collectionMsglist.length - 1].msgData,
            onMessageReceived: (delta: {
               [propsName: string]: string
            }) => {
               console.log(delta.content)
               
               
               dispatch(addGptMsg({  // 响应并同步本地
                  type: 'gpt',
                  msgData: delta.content
               }))
               
            }
         })
         
      })()
   }, [collectionMsglist])
   
   return (
      <>
         {collectionMsglist.map((t, i) => (
            <article key={i} className={t.type === 'me' ? style.ri : style.le}>
               {
                  t.type === 'me' ?
                     <p className={style.user}>
                        <div>{t.msgData}</div>
                     </p>
                     :
                     <div className={style.gptArticle}>
                        <div className={style.gpt}>AI</div>
                        <MDEditor.Markdown 
                           source={t.msgData}
                           className={style.gptContent}
                           style={{width : `${document.body.clientWidth * 0.15}px`}}
                        /> 
                     </div>
               }
            </article>
         ))}
      </>
   )
})

export default ChatContent