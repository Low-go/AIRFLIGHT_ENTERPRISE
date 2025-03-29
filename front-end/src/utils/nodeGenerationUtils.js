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



export const handleSmallNodeButtonClick = async (
  nodeId,   
  handleId,
  setNodes, 
  setEdges, 
  isDarkMode,
  fetchCompanyContacts,
  fetchCompanyFleets,
  selectedCompany,
  companyContacts,
  companyFleets
) => {
  console.log(`Small node button clicked: ${nodeId}, handle: ${handleId}`);
  
  const parentNodeType = nodeId.includes('contacts') ? 'contacts' : 'fleets';
  
  // First, check if we already have child nodes for this parent
  let childNodesExist = false;
  
  setNodes((currentNodes) => {
    const existingChildNodes = currentNodes.filter(node => 
      node.id.startsWith(`${nodeId}-item-`)
    );
    
    // If child nodes exist, remove them and their edges
    if (existingChildNodes.length > 0) {
      childNodesExist = true;
      setEdges(edges => 
        edges.filter(edge => 
          !edge.source.startsWith(`${nodeId}-item-`) && 
          !edge.target.startsWith(`${nodeId}-item-`)
        )
      );
      return currentNodes.filter(node => !node.id.startsWith(`${nodeId}-item-`));
    }
    
    // If no child nodes, continue with normal flow
    return currentNodes;
  });
  
  // If we removed nodes, we're done
  if (childNodesExist) {
    return;
  }
  
  // Fetch data if needed
  if (parentNodeType === 'contacts' && !companyContacts) {
    await fetchCompanyContacts(selectedCompany.id); // not working for some reason
  } else if (parentNodeType === 'fleets' && !companyFleets) {
    await fetchCompanyFleets(selectedCompany.id);
  }
  
  //update nodes with the data
  setNodes((currentNodes) => {
    const parentNode = currentNodes.find(node => node.id === nodeId);
    if (!parentNode) return currentNodes;
    
    const parentPosition = parentNode.position;
    const items = parentNodeType === 'contacts' ? companyContacts : companyFleets;
    
    if (!items || items.length === 0) {
      console.log(`No ${parentNodeType} data available`);
      return currentNodes;
    }
    
    // Create a medium node for each item
    const newNodes = items.map((item, index) => {
      const itemId = `${nodeId}-item-${index}`;
      
      // Get the correct name based on model type
      let displayName = '';
      if (parentNodeType === 'contacts') {
        // For contacts, use first_name + last_name
        displayName = `${item.first_name} ${item.last_name}`;
      } else {
        // For fleets, use model
        displayName = item.model;
      }
      
      // Probably want to randomize its placement later on in the future
      return {
        id: itemId,
        type: 'mediumNode',
        position: { 
          x: parentPosition.x + 200, 
          y: parentPosition.y - 150 + (index * 100) // Stack nodes vertically
        },
        data: {
          name: displayName,
          details: item,
          type: parentNodeType // Store the type for reference
        },
      };
    });
    
    // Create edges from parent to each child
    newNodes.forEach((node) => {
      const newEdge = {
        id: `e${nodeId}-${node.id}`,
        source: nodeId,
        target: node.id,
        sourceHandle: 'right-handle', 
        targetHandle: 'medium-handle',  
        animated: true,
        style: { 
          stroke: isDarkMode ? "#ffffff" : "#000000", 
          strokeWidth: 2
        }
      };
      setEdges(edges => [...edges, newEdge]);
    });
    
    return [...currentNodes, ...newNodes];
  });
};

