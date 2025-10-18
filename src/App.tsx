import './App.css'
import { AppShell } from "@mantine/core";
import { Routes, Route, Navigate } from 'react-router-dom';
import  Header from './components/Header'
import MainPage from './components/pages/MainPage'
import VacancyPage from './components/pages/VacancyPage';


function App() {

  return (
    <AppShell padding={0} style={{backgroundColor: '#f8f9fa'}}>
      <Header/>
      <Routes>
        <Route path="/" element={<Navigate to="/vacancies" replace />} />
        <Route path='/vacancies' element={< MainPage />}/>
        <Route path='/vacancies/:id' element={< VacancyPage />}/>
      </Routes>
    </AppShell>
  )
}

export default App

