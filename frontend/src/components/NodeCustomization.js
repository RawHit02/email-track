import React, { useState, useEffect } from 'react';
import './NodeCustomization.css';

const NodeCustomization = ({ selectedNode, onUpdateNode }) => {
  // Initialize nodeData with a default state
  const [nodeData, setNodeData] = useState({ emailContent: '', duration: '', condition: '', value: '' });

  // Update nodeData when selectedNode changes
  useEffect(() => {
    if (selectedNode) {
      setNodeData(selectedNode.data || {});
    }
  }, [selectedNode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateNode(selectedNode.id, nodeData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNodeData({ ...nodeData, [name]: value });
  };

  const renderFormFields = () => {
    if (!selectedNode) return null;

    switch (selectedNode.type) {
      case 'email':
        return (
          <textarea
            name="emailContent"
            value={nodeData.emailContent || ''}
            onChange={handleInputChange}
          />
        );
      case 'wait':
        return (
          <input
            type="number"
            name="duration"
            value={nodeData.duration || ''}
            onChange={handleInputChange}
          />
        );
      case 'decision':
        return (
          <div>
            <label>
              Condition:
              <input
                type="text"
                name="condition"
                value={nodeData.condition || ''}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Value:
              <input
                type="text"
                name="value"
                value={nodeData.value || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  if (!selectedNode) return null;

  return (
    <div>
      <h2>Edit Node: {selectedNode.type}</h2>
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default NodeCustomization;
