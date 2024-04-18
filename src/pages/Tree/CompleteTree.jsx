import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import Header from '../../components/Header/Header';

// This is a simplified example of an org chart with a depth of 2.
// Note how deeper levels are defined recursively via the `children` property.


export default function OrgChartTree() {
  const [file, setFile] = useState(null)
  const [tree, setTree] = useState(null)
  useEffect(() => {
    const savedFile = localStorage.getItem('file')
    if (savedFile) {
      const foundFile = JSON.parse(savedFile)
      console.log(foundFile)
      setFile(foundFile);
    }
  }, [])
  useEffect(() => {
    if (file) {
      axios.get(`http://localhost:8080/v1/api/tree/create?fileName=${file.storedName}&minSup=${file.minSup}`)
        .then(res => setTree(res.data))
        .catch(err => console.log(err))
    }

  }, [file])
  console.log(tree)
  
  if (!tree) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div>
      <Header />
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
        <Tree orientation='vertical'
          pathFunc={'diagonal'}
          data={tree.nodeDTO} 
          
          />
      </div>
    </div>

  );
}