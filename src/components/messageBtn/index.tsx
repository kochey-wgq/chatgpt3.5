import React, { useState, forwardRef, KeyboardEvent, useEffect, useImperativeHandle } from 'react'
import style from './index.module.less'
import TextField from '@mui/material/TextField';
import type { InitialState } from '../../store/state';
import { addUserMsg } from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux'
import Snackbar  from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Fade from '@mui/material/Fade';
import SendIcon from '@mui/icons-material/Send';
import {isMobile} from '../../utils'
interface SnackbarTs{
   open: boolean,
   Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
   >;
}
type ForwardProps = {
   onFieldVal: (value: string) => void
   onCollMsgToggle: (collMsgToggle: boolean) => void
}
export type ForwardRef = {
   sendAsideText: (content: string) => void
}
const MessageBtn = forwardRef<ForwardRef, ForwardProps>(({ onFieldVal, onCollMsgToggle }, ref) => {
   const dispatch = useDispatch()
   // 消息框配置
   const [snackbar, setSnackbar] = useState<SnackbarTs>({
      open: false,
      Transition: Fade,
   });
   const { Transition, open :snackbarOpen } = snackbar;
   // 消息提示 


   function transition(props: SlideProps ) {
      return  <Slide {...props} direction="up" />;
   }
   const handleSnackbar = (newState:SnackbarTs) => { 
      setSnackbar(newState)
   };
   
   // 消息列表有数据转换布局模式
   const [collMsgToggle, setCollMsgToggle] = useState<boolean>(false)

   // filed content
   const [fieldVal, setFiledVal] = useState<string>('')

   // getCollectionMsg
   const collectionMsglist = useSelector<InitialState, InitialState['massageCollection']>((state) => state.massageCollection)


   // 暴露方法
   useImperativeHandle(ref, () => ({
      sendAsideText(content: string) {
         sendBtn(content)
      }
   }))
   useEffect(() => {
      setCollMsgToggle(!!collectionMsglist.length)
      collectionMsglist.length && onCollMsgToggle(!!collectionMsglist.length);   //使用状态提升让父组件接收filed内容
      // 当 collectionMsglist 有数据以后
      console.log(collectionMsglist, collMsgToggle, 'useSelector');
   }, [collectionMsglist]);



   // filed send btn 
   const sendBtn = (asideContent?: string): void => {
      console.log(fieldVal, 'fieldVal')
      if (!fieldVal) { 
         handleSnackbar({
            open: true, 
            Transition : transition
         })
         return
      } 
      onFieldVal(fieldVal);   //使用状态提升让父组件接收filed内容
      // 分发
      dispatch(addUserMsg({
         type: 'me',
         msgData: asideContent ? `${fieldVal} => ${asideContent}` : fieldVal
      }))
      setFiledVal('')
   }
   // filed key事件
   const msgKeyDown = (event: KeyboardEvent<HTMLElement>): void => {

      console.log('Key Up:', event.key);
      if (isMobile()) { //则不阻止任何事件

         return
      }
      if (event.key === 'Enter' && !event.shiftKey) {
         event.preventDefault()
         sendBtn()
      }
   }


   // filed 内容变化
   const textFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
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
            <div className={style.right} onClick={() => sendBtn()}>
               <SendIcon style={{ color: 'white', fontSize: '18px' }}/>
            </div>
         </div>
         <Snackbar
            open={snackbarOpen}
            onClose={() => {
               handleSnackbar({
                  ...snackbar,
                  open: false,
               })}
            }
            TransitionComponent={Transition}
            message='内容不能为空'
            key={Transition.name}
            autoHideDuration={1000}
         />
      </>
   )
})
export default MessageBtn