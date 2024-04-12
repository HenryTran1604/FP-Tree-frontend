import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';


const PatternTree = (props) => {
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
      axios.get(`http://localhost:8080/conditional-pattern?fileName=${file.storedName}&minSup=${file.minSup}&item=${'e'}`)
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
      <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
        <Tree orientation='vertical'
          pathFunc={'step'}
          data={tree.nodeDTO} 
          
          />
      </div>
    </div>

  );
};

export default PatternTree;
