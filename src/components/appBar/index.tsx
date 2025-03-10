import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, { useRef,useEffect,useState } from 'react' 
import Typography from '@mui/material/Typography'; 
import IconButton from '@mui/material/IconButton';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import style from './index.module.less'
import HistoricalRecords,{HistoricalRecordsRef} from '../HistoricalRecords';
import type { InitialState } from '../../store/state';
import { useSelector,useDispatch } from 'react-redux'
import { updateHistoryIndex } from '../../store/actions';
interface BarProps {
   onCollMsgToggle : (collMsgToggle: boolean) => void
}
const Bar: React.FC<BarProps> = ({onCollMsgToggle}): JSX.Element => {
   const HistoricalDom =  useRef<HistoricalRecordsRef>(null)
   const [barTitle,setBarTitle] = useState<string>('')
   // getCollectionMsg
   const collectionMsglist = useSelector<InitialState, InitialState['massageCollection']>((state) => state.massageCollection)
   const historyIndex = useSelector<InitialState,InitialState['historyIndex']>(state => state.historyIndex)
   const dispatch = useDispatch()
   const openHistory  = () :void =>{ 
      HistoricalDom?.current?.toggleDrawer(true)()
      
   }
   const addChat  = () :void =>{ 
      onCollMsgToggle(false)
      dispatch(updateHistoryIndex())
   }
   useEffect(() =>{ 
      setBarTitle(HistoricalDom?.current?.historyList[historyIndex] ? HistoricalDom?.current?.historyList[historyIndex][0].msgData : '')
   },[HistoricalDom?.current?.historyList,historyIndex,collectionMsglist])
   return ( 
      <>
         {!!HistoricalDom?.current?.historyList.length && <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='transparent' style={style}>
               <Toolbar>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit" 
                     onClick={openHistory}
                  >
                     <ManageHistoryIcon/>
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     <div className={style.barTitle}>{`${barTitle.length >= 15 ? (barTitle.slice(0,15) + '...') : barTitle}`}</div>
                     {/* {barTitle} */}
                  </Typography>
                  <IconButton 
                     size="large"
                     edge="end"
                     color="inherit" 
                     onClick={addChat}
                  >
                     <NoteAddIcon />
                  </IconButton>
                  
               </Toolbar>
            </AppBar>
         </Box>}
         {/* 历史记录 */}
         <HistoricalRecords ref={HistoricalDom}/>
      </>
   )
}

export default Bar