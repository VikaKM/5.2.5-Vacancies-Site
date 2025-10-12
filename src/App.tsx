import './App.css'
import { AppShell } from "@mantine/core";
import  Header from './components/Header'
import MainPage from './components/MainPage'


function App() {

  return (
    <AppShell padding={0} style={{backgroundColor: '#f8f9fa'}}>
      <Header/>
      <MainPage/>
    </AppShell>
  )
}

export default App

