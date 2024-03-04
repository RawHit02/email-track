import React, { useState, useCallback, useEffect } from 'react';
import './EmailFlowchart.css';
import ReactFlow, { addEdge, MiniMap, Controls } from 'react-flow-renderer';
import NodeCustomization from './NodeCustomization';
import { saveSequence, loadSequences } from '../apiService';

const EmailFlowchart = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const onElementsRemove = useCallback((elementsToRemove) => {
    setNodes((nds) => nds.filter((node) => !elementsToRemove.some((element) => element.id === node.id)));
    setEdges((eds) => eds.filter((edge) => !elementsToRemove.some((element) => element.id === edge.id)));
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const updateNode = useCallback((nodeId, newProperties) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...newProperties } } : node))
    );
  }, []);

  useEffect(() => {
    const fetchSequences = async () => {
      const sequences = await loadSequences();
      if (sequences.length > 0) {
        setNodes(sequences[0].nodes);
        setEdges(sequences[0].edges);
      }
    };

    fetchSequences();
  }, []);

  const handleSave = async () => {
    await saveSequence({ nodes, edges });
  };

  return (
    <div style={{ height: '100vh' }}>
      <button onClick={handleSave}>Save Sequence</button>
      <NodeCustomization selectedNode={selectedNode} onUpdateNode={updateNode} />
      <ReactFlow
        elements={[...nodes, ...edges]}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onLoad={(instance) => console.log("React Flow instance loaded:", instance)} // If you decide to use it, replace this line accordingly
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default EmailFlowchart;
