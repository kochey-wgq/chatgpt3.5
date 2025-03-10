
import './App.css'
import Layouts from './layouts'
import KeyPanel from './components/KeyPanel'
import { useSelector } from 'react-redux'
import type { InitialState } from './store/state';
function App() {
  const openAIKeyState = useSelector<InitialState, InitialState['openAIKeyState']>((state) => state.openAIKeyState)
  console.log(openAIKeyState,'openAIKeyState')
  return (
    <>
      {!openAIKeyState ? <KeyPanel /> : <Layouts />} 
    </>
  )
}

export default App
