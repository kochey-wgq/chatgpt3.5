import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import React, { useRef,useEffect,useState } from 'react' 
import Typography from '@mui/material/Typography'; 
import IconButton from '@mui/material/IconButton';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import style from './index.module.less'
import HistoricalRecords,{HistoricalRecordsRef} from '../historicalRecords';
import type { InitialState } from '../../store/state';
import { useSelector } from 'react-redux'
const Bar: React.FC = (): JSX.Element => {
   const HistoricalDom =  useRef<HistoricalRecordsRef>(null)
   const [barTitle,setBarTitle] = useState<string>('')
   const historyIndex = useSelector<InitialState,InitialState['historyIndex']>(state => state.historyIndex)
   const openHistory  = () :void =>{ 
      HistoricalDom?.current?.toggleDrawer(true)()
      
   }

   useEffect(() =>{
      console.log(HistoricalDom?.current?.historyList,'historyList')
      HistoricalDom?.current?.historyList.length && setBarTitle(HistoricalDom?.current?.historyList[historyIndex][0].msgData)
   },[HistoricalDom?.current?.historyList])
   return ( 
      <>
         <Box sx={{ flexGrow: 1 }}>
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
                  >
                     <NoteAddIcon />
                  </IconButton>
                  
               </Toolbar>
            </AppBar>
         </Box>

         {/* 历史记录 */}
         <HistoricalRecords ref={HistoricalDom}/>
      </>
   )
}

export default Bar