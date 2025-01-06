import React,{useState,forwardRef,useImperativeHandle} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NoteIcon from '@mui/icons-material/Note';
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux'
import type { InitialState } from '../../store/state';
export interface HistoricalRecordsRef {
   toggleDrawer : (toggle:boolean) => Function,
   historyList : InitialState['historyList']
}


const HistoricalRecords  = forwardRef<HistoricalRecordsRef,{}>((props,ref) => {
   const [open, setOpen] = useState(false);
   const historyList = useSelector<InitialState,InitialState['historyList']>(state => state.historyList)
   const toggleDrawer  = (toggle:boolean) => () => {
      console.log(toggle)
      setOpen(toggle)
   }

   useImperativeHandle(ref,()=>({
      toggleDrawer,
      historyList
   }))
   return (
      <>
         <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
               <List>
                  {historyList.map((text, index) => (
                     <ListItem key={index} disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              <NoteIcon />
                           </ListItemIcon>
                           <ListItemText primary={`${text[0].msgData.length >= 18 ? (text[0].msgData.slice(0,18) + '...') : text[0].msgData}`} />
                        </ListItemButton>
                     </ListItem>
                  ))}
               </List>
            </Box>
         </Drawer>
      </>
   )
})
export default HistoricalRecords