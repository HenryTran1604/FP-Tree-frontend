import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Flow from './pages/Tree/CompleteTree';
import { Suspense } from 'react';
import UpFile from './pages/UpFile/UpFile';
import GraphChart from './components/Chart/Chart';
import Metadata from './pages/Metadata/Metadata';
import PatternTree from './pages/ConditionalPatternTree/PatternTree';
import FrequentItemset from './pages/FrequentItemset/FrequentItemset';
import Rule from './pages/Rule/Rule';
import Compare from './pages/Compare/Compare';

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
              <Route path='/rule' element={<Rule/>}/>
              <Route path='/pattern' element={<PatternTree />} />
              <Route path='/compare' element={<Compare />} />
            </Routes>
        </Suspense>

      </BrowserRouter>
    </div>
  );
}

export default App;
