import React,{useState,forwardRef,KeyboardEvent,useEffect,useImperativeHandle,useRef} from 'react'
import style from './index.module.less'
import TextField from '@mui/material/TextField'; 
import type {InitialState} from '../../store/state'; 
import { addUserMsg } from '../../store/actions';
import {useSelector,useDispatch} from 'react-redux'
type ForwardProps = {
   onFieldVal : (value: string) => void
   onCollMsgToggle : (collMsgToggle: boolean) => void
}
export type ForwardRef = {
   sendAsideText : (content: string) => void
}
const MessageBtn = forwardRef<ForwardRef,ForwardProps>(({onFieldVal,onCollMsgToggle},ref) => {  
   const dispatch = useDispatch() 
   // 消息列表有数据转换布局模式
   const [collMsgToggle,setCollMsgToggle] = useState<boolean>(false)

   // filed content
   const [fieldVal,setFiledVal] = useState<string>('')

   // getCollectionMsg
   const collectionMsglist = useSelector<InitialState, InitialState['massageCollection']>((state) => state.massageCollection)
  
   // 判断访问的设备
   const isMobile = () :string[] | null => {
      const userAgent = navigator.userAgent;
      return userAgent.match(/(iPhone|iPod|Android|ios|iPad|AppleWebKit.*Mobile.*)/i);
   }
   // 暴露方法
   useImperativeHandle(ref,() => ({
      sendAsideText(content : string){   
         // if(!fieldVal) return
         // // 分发
         // dispatch(addUserMsg({
         //    type : 'me',
         //    msgData : `${fieldVal}=> ${content}`
         // })) 
         sendBtn(content) 
      }
   }))
   useEffect(() => {
      setCollMsgToggle(!!collectionMsglist.length)
      collectionMsglist.length && onCollMsgToggle(!!collectionMsglist.length);   //使用状态提升让父组件接收filed内容
      // 当 collectionMsglist 有数据以后
      console.log(collectionMsglist,collMsgToggle, 'useSelector');
   }, [collectionMsglist]);  

 

   // filed send btn 
   const sendBtn = (asideContent?: string) :void => {
      console.log(fieldVal,'fieldVal')
      if(!fieldVal) return
      onFieldVal(fieldVal);   //使用状态提升让父组件接收filed内容
      // 分发
      dispatch(addUserMsg({
         type : 'me',
         msgData : asideContent ? `${fieldVal} => ${asideContent}` : fieldVal
      }))  
      setFiledVal('')
   }
   // filed key事件
   const msgKeyDown = (event : KeyboardEvent<HTMLElement>) :void =>{
      
      console.log('Key Up:', event.key);
      if(isMobile()){ //则不阻止任何事件

         return
      }
      if(event.key === 'Enter' && !event.shiftKey){
         event.preventDefault()
         sendBtn()
      } 
   }


   // filed 内容变化
   const textFieldChange =  (event:React.ChangeEvent<HTMLInputElement>) :void  =>{
      const newValue = event.target.value;
      setFiledVal(newValue)
      
   } 

   return (
      <>
         <div className={style.messageWrap}> 
            <div className={style.left}> 
               <TextField
                  className={style.field}
                  id="outlined-multiline-flexible" 
                  multiline 
                  maxRows="6"
                  InputProps={{
                     style: { fontSize: '1.0625rem' }
                  }}
                  value={fieldVal}
                  onKeyDown={msgKeyDown}
                  onChange={textFieldChange}
                  placeholder="给“ChatGPT”发送消息" 
               />
            </div>
            <div className={style.right} onClick={() => sendBtn}></div>
         </div>   
      </>
   )
})
export default MessageBtn