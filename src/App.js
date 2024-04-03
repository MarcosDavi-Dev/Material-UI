import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import ListarTarefa from './pages/tarefa/ListarTarefa';
import EditarTarefa from './pages/tarefa/EditarTarefa';
import CriarTarefa from './pages/tarefa/CriarTarefa';

function App() {
  return (
    <Router>
       <Header />
      <Routes>
        <Route path="/" element={<ListarTarefa />} />
        <Route path='/editar-tarefa/:idTarefa' element={<EditarTarefa />} />
        <Route path='/criar-tarefa' element={<CriarTarefa />} />
      </Routes>
    </Router>
  );
}

export default App;
