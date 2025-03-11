import React,{useRef, useState} from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField' 
import {useDispatch} from 'react-redux'
import { checkOpenAiRouterKey } from '../../store/actions'; 
// 输入有效的opai-router key 以便正常使用
const KeyPanel: React.FC = (): JSX.Element => { 
   let keyRef:React.RefObject<HTMLInputElement> = useRef(null)
   let [errorText,setRrrorText] = useState('')
   let [error,setRrror] = useState(false)
   let dispatch = useDispatch()
   const wrapStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'space-around'
   }
   // 检测openairouter key状态  import.meta.env.VITE_APP_CAHT_GPT_KEY  | import.meta.env.VITE_APP_CAHT_GPT_KEY
   const playChat = async ()  => {

      let res = await fetch("https://openrouter.ai/api/v1/auth/key", {
         method: "GET",
         headers: {
            Authorization: `Bearer ${keyRef?.current?.value}`,
         },
      })
      let {data,error} = await res.json()
      let check = error && error.code === 401
      data && sessionStorage.setItem('openaiApiKey',keyRef?.current?.value as string)
      // 入口toggle
      dispatch(checkOpenAiRouterKey(!check))

      // 错误的key将爆红 filed
      setRrror(check)
      setRrrorText(check ? '错误的key' : '')
      console.log(data,error,'openairouter key') 
   }
   return <>
      <section style={wrapStyle}>
         <Stack spacing={2} direction="row">
            <TextField helperText={errorText} error={error} inputRef={keyRef} id="outlined-basic" label="输入openAiRouter key" variant="outlined" />
            <Button style={{height:'56px'}} variant="contained" onClick={playChat}>开始</Button>
         </Stack>
      </section>
   </>
}

export default KeyPanel