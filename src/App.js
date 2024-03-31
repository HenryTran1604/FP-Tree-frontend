import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Flow from './pages/Main';
import { Suspense } from 'react';
import UpFile from './pages/UpFile/UpFile';
import GraphChart from './components/Chart/Chart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path='/tree' element={<Flow />} />
            <Route path='/upfile' element={<UpFile/>} />
            <Route path='/chart' element={<GraphChart/>} />
          </Routes>
        </Suspense>

      </BrowserRouter>
    </div>
  );
}

export default App;
