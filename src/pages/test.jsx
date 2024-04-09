import React from 'react';
import Tree from 'react-d3-tree';

const treeData = {
  name: 'Root',
  children: [
    {
      name: 'Node A',
      id: 'nodeA', // Unique identifier for Node A
      children: [{ name: 'Node A1', id: 'nodeA1' }],
    },
    {
      name: 'Node B',
      id: 'nodeB', // Unique identifier for Node B
      children: [{ name: 'Node B1', id: 'nodeB1' }],
    },
  ],
  links: [
    { source: 'nodeA1', target: 'nodeB1' }, // Custom link between A1 and B1
  ],
};

const CustomTree = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 200, y: 200 }}
        nodeSize={{ x: 100, y: 100 }}
        collapsible={false}
        zoom={0.8}
        separation={{ siblings: 1, nonSiblings: 1.5 }}
        pathFunc="diagonal" // Use diagonal link paths
        linkData={treeData.links} // Pass custom link data
      />
    </div>
  );
};

export default CustomTree;
