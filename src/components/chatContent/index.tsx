import type { InitialState, MassageObj } from '../../store/state';
import MDEditor from '@uiw/react-md-editor';
import style from './index.module.less'
import { useLayoutEffect, forwardRef } from 'react';
import { useDispatch } from 'react-redux'
import { addGptMsg } from '../../store/actions';
import openAI from '../../server/chat';
import { scrollIntoView } from '../../utils'
import gptImg from '../../assets/img/gpt-loading.png'
import gptStatic from '../../assets/img/gpt.png'
import gptLoading from '../../assets/img/gpt-loading.gif'
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
      // if (true) return
      if (collectionMsglist[collectionMsglist.length - 1].type === 'gpt-loading') (async () => {
         
         gpt.responseMsg({
            content: collectionMsglist,
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
   // gpt加载模块
   const gpLoading = (): JSX.Element => {
      return  (
         <>
            <div className={style.gptLoading}>
               <img src={gptLoading} alt="gpt-loading" title='gpt-loading'/>
            </div>
         </>
      )
   }
   // gpt响应模块
   const gptModule = (t: MassageObj): JSX.Element => {
      return (
         <>
            <MDEditor.Markdown
               source={t.msgData}
               className={style.gptContent}
               style={{ width: `${document.body.clientWidth * 0.15}px` }}
            />
         </>
      )
   }
   return (
      <>
         {collectionMsglist.map((t, i,o) => (
            <article key={i} className={t.type === 'me' ? style.ri : style.le}>
               {
                  t.type === 'me' ?
                     <p className={style.user}>
                        <div>{t.msgData}</div>
                     </p>
                     :
                     <div className={style.gptArticle}>
                        <div className={style.gpt}>
                           <img src={i === o.length - 1 ? gptImg : gptStatic} alt="gpt" title='gpt' />
                        </div>
                        {
                           t.type === 'gpt-loading' ? gpLoading() : gptModule(t)
                        }
                     </div>
               }
            </article>
         ))}
      </>
   )
})

export default ChatContent