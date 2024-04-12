import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Flow from './pages/Tree/Main';
import { Suspense } from 'react';
import UpFile from './pages/UpFile/UpFile';
import GraphChart from './components/Chart/Chart';
import Metadata from './pages/Metadata/Metadata';
import PatternTree from './components/ConditionalPatternTree/PatternTree';
import FrequentItemset from './pages/FrequentItemset/FrequentItemset';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
            <Routes>
              <Route path='/' element={<UpFile />} />
              <Route path='/tree' element={<Flow />} />
              <Route path='/meta' element={<Metadata />} />
              <Route path='/chart' element={<GraphChart />} />
              <Route path='/itemset' element={<FrequentItemset/>}/>
              <Route path='/test' element={<PatternTree />} />

            </Routes>
        </Suspense>

      </BrowserRouter>
    </div>
  );
}

export default App;
