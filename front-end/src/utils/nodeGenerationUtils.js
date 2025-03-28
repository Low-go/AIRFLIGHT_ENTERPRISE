export const handleNodeButtonClick = (
    nodeId, 
    handleId,
    setEdges,
    setNodes,
    isDarkMode
    ) => {
    setNodes((currentNodes) => {

      // lets give this bad boy a shot ahhhhhhhh
      
      // instead of checking by array index number or id lets just assign an id or name. i don't know how practical this is
      const existingContactsNodeIndex = currentNodes.findIndex(
        node => node.data.name === 'Contacts'
      );
      const existingFleetsNodeIndex = currentNodes.findIndex(
        node => node.data.name === 'Fleets'
      );

      const contactsNodeId = `${nodeId}-contacts`;
      const fleetsNodeId = `${nodeId}-fleets`;
  
      // this is if we already have these existing nodes in out system
      if (handleId === 'top-right-handle') {

        //const existingNodeIndex = nodes.findIndex(node => node.id === contactsNodeId);
        // If no contacts node exists, create one
        if (existingContactsNodeIndex === -1) {
          
          const contactsNode = {
            id: contactsNodeId,
            type: 'smallNode',
            position: { 
              x: currentNodes[0].position.x + 250, 
              y: currentNodes[0].position.y - 150 
            },
            data: {
              name: 'Contacts',
            },
          };
  
          // Create a new edge connecting the original node to the contacts node
          const newEdge = {
            id: `e${nodeId}-${contactsNodeId}`,
            source: nodeId,
            target: contactsNodeId,
            sourceHandle: 'top-right-handle',
            targetHandle: 'left-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
  
          // Update both nodes and edges
          setEdges(edges => [...edges, newEdge]);
          return [...currentNodes, contactsNode];
          
        } 
        // If contacts node exists, remove it
        else {
          // Remove edges
          setEdges(edges => 
            edges.filter(edge => 
              edge.source !== currentNodes[existingContactsNodeIndex].id && 
              edge.target !== currentNodes[existingContactsNodeIndex].id
            )
          );
          return currentNodes.filter(node => node.data.name !== 'Contacts');
        }
      }
      
      // If bottom-right handle is clicked (for Fleets)
      if (handleId === 'bottom-right-handle') {
        // If no fleets node exists, create one
        if (existingFleetsNodeIndex === -1) {
         
          const fleetsNode = {
            id: fleetsNodeId,
            type: 'smallNode',
            position: { 
              x: currentNodes[0].position.x + 250, 
              y: currentNodes[0].position.y + 150 
            },
            data: {
              name: 'Fleets',
            },
          };
  
          // Create a new edge connecting the original node to the fleets node
          const newEdge = {
            id: `e${nodeId}-${fleetsNodeId}`,
            source: nodeId,
            target: fleetsNodeId,
            sourceHandle: 'bottom-right-handle',
            targetHandle: 'left-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
  
          // Update both nodes and edges
          setEdges(edges => [...edges, newEdge]);
          return [...currentNodes, fleetsNode];
          
        } 
        // If fleets node exists, remove it
        else {
          // Remove edges
          setEdges(edges => 
            edges.filter(edge => 
              edge.source !== currentNodes[existingFleetsNodeIndex].id && 
              edge.target !== currentNodes[existingFleetsNodeIndex].id
            )
          );
          return currentNodes.filter(node => node.data.name !== 'Fleets');
        }
      }
      
      // If no matching handle, return current nodes
      return currentNodes;
})}

// export default handleNodeButtonClick;



export const test = () => {
  console.log("test");
}



