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

export const handleSmallNodeButtonClick = (
  nodeId,
  handleId,
  setEdges,
  setNodes,
  isDarkMode,
  companyContacts,
  companyFleets,
  fetchCompanyContacts,
  fetchCompanyFleets,
  selectedCompany
) => {
  console.log(`Small node button clicked: ${nodeId}, handle: ${handleId}`);
  
  // First check if we need to fetch data
  if (nodeId.includes('contacts') && !companyContacts && selectedCompany) {
    fetchCompanyContacts(selectedCompany.id); // Not working for some reason
  }
  
  if (nodeId.includes('fleets') && !companyFleets && selectedCompany) {
    fetchCompanyFleets(selectedCompany.id);
  }
  
  setNodes((currentNodes) => {
    // Find the current node to get its position
    const currentNodeIndex = currentNodes.findIndex(node => node.id === nodeId);
    if (currentNodeIndex === -1) return currentNodes;
    
    const currentNode = currentNodes[currentNodeIndex];
    
    // Check if this is a Contacts node
    if (currentNode.data.name === 'Contacts') {
      // Check if we already have medium nodes for contacts
      const existingContactMediumNodes = currentNodes.filter(
        node => node.id.startsWith(`${nodeId}-contact-`)
      );
      
      // If we already have contact medium nodes, remove them
      if (existingContactMediumNodes.length > 0) {
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !edge.source.startsWith(`${nodeId}-contact-`) && 
            !edge.target.startsWith(`${nodeId}-contact-`)
          )
        );
        
        // Remove the medium nodes
        return currentNodes.filter(node => !node.id.startsWith(`${nodeId}-contact-`));
      } 
      // Otherwise, create new medium nodes for contacts
      else {
        // Create dummy data if no contacts available yet
        const contacts = companyContacts || [
          { id: 1, first_name: 'Test Contact 1' },
          { id: 2, first_name: 'Test Contact 2' },
          { id: 3, first_name: 'Test Contact 3' }
        ];
        
        const newNodes = [];
        const newEdges = [];
        
        contacts.forEach((contact, index) => {
          const contactNodeId = `${nodeId}-contact-${contact.id}`;
          
          // Create a medium node for the contact
          const contactNode = {
            id: contactNodeId,
            type: 'mediumNode',
            position: { 
              x: currentNode.position.x + 250, 
              y: currentNode.position.y - 150 + (index * 100) 
            },
            data: {
              name: contact.first_name || `Contact ${index + 1}`,
            },
          };
          
          // Create an edge connecting the small node to the medium node
          const newEdge = {
            id: `e${nodeId}-${contactNodeId}`,
            source: nodeId,
            target: contactNodeId,
            sourceHandle: 'right-handle',
            targetHandle: 'medium-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
          
          newNodes.push(contactNode);
          newEdges.push(newEdge);
        });
        
        // Update edges
        setEdges(edges => [...edges, ...newEdges]);
        
        // Return updated nodes
        return [...currentNodes, ...newNodes];
      }
    }
    
    // Check if this is a Fleets node
    if (currentNode.data.name === 'Fleets') {
      // Check if we already have medium nodes for fleets
      const existingFleetMediumNodes = currentNodes.filter(
        node => node.id.startsWith(`${nodeId}-fleet-`)
      );
      
      // If we already have fleet medium nodes, remove them
      if (existingFleetMediumNodes.length > 0) {
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !edge.source.startsWith(`${nodeId}-fleet-`) && 
            !edge.target.startsWith(`${nodeId}-fleet-`)
          )
        );
        
        // Remove the medium nodes
        return currentNodes.filter(node => !node.id.startsWith(`${nodeId}-fleet-`));
      } 
      // Otherwise, create new medium nodes for fleets
      else {
        // Create dummy data if no fleets available yet
        const fleets = companyFleets || [
          { id: 1, model: 'Test Fleet 1' },
          { id: 2, model: 'Test Fleet 2' },
          { id: 3, model: 'Test Fleet 3' }
        ];
        
        const newNodes = [];
        const newEdges = [];
        
        fleets.forEach((fleet, index) => {
          const fleetNodeId = `${nodeId}-fleet-${fleet.id}`;
          
          // Create a medium node for the fleet
          const fleetNode = {
            id: fleetNodeId,
            type: 'mediumNode',
            position: { 
              x: currentNode.position.x + 250, 
              y: currentNode.position.y - 150 + (index * 100) 
            },
            data: {
              name: fleet.model || `Fleet ${index + 1}`,
            },
          };
          
          // Create an edge connecting the small node to the medium node
          const newEdge = {
            id: `e${nodeId}-${fleetNodeId}`,
            source: nodeId,
            target: fleetNodeId,
            sourceHandle: 'right-handle',
            targetHandle: 'medium-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
          
          newNodes.push(fleetNode);
          newEdges.push(newEdge);
        });
        
        // Update edges
        setEdges(edges => [...edges, ...newEdges]);
        
        // Return updated nodes
        return [...currentNodes, ...newNodes];
      }
    }
    
    // If no matching condition, return current nodes
    return currentNodes;
  });
};


// export const handleSmallNodeButtonClick = async (
//   nodeId,   
//   handleId,
//   setNodes, 
//   setEdges, 
//   isDarkMode,
//   fetchCompanyContacts,
//   fetchCompanyFleets,
//   selectedCompany,
//   companyContacts,
//   companyFleets
// ) => {
//   console.log(`Small node button clicked: ${nodeId}, handle: ${handleId}`);
  
//   const parentNodeType = nodeId.includes('contacts') ? 'contacts' : 'fleets';
  
//   // First, check if we already have child nodes for this parent
//   let childNodesExist = false;
  
//   setNodes((currentNodes) => {
//     const existingChildNodes = currentNodes.filter(node => 
//       node.id.startsWith(`${nodeId}-item-`)
//     );
    
//     // If child nodes exist, remove them and their edges
//     if (existingChildNodes.length > 0) {
//       childNodesExist = true;
//       setEdges(edges => 
//         edges.filter(edge => 
//           !edge.source.startsWith(`${nodeId}-item-`) && 
//           !edge.target.startsWith(`${nodeId}-item-`)
//         )
//       );
//       return currentNodes.filter(node => !node.id.startsWith(`${nodeId}-item-`));
//     }
    
//     // If no child nodes, continue with normal flow
//     return currentNodes;
//   });
  
//   // If we removed nodes, we're done
//   if (childNodesExist) {
//     return;
//   }
  
//   // Fetch data if needed
//   if (parentNodeType === 'contacts' && !companyContacts) {
//     await fetchCompanyContacts(selectedCompany.id); // not working for some reason
//   } else if (parentNodeType === 'fleets' && !companyFleets) {
//     await fetchCompanyFleets(selectedCompany.id);
//   }
  
//   //update nodes with the data
//   setNodes((currentNodes) => {
//     const parentNode = currentNodes.find(node => node.id === nodeId);
//     if (!parentNode) return currentNodes;
    
//     const parentPosition = parentNode.position;
//     const items = parentNodeType === 'contacts' ? companyContacts : companyFleets;
    
//     if (!items || items.length === 0) {
//       console.log(`No ${parentNodeType} data available`);
//       return currentNodes;
//     }
    
//     // Create a medium node for each item
//     const newNodes = items.map((item, index) => {
//       const itemId = `${nodeId}-item-${index}`;
      
//       // Get the correct name based on model type
//       let displayName = '';
//       if (parentNodeType === 'contacts') {
//         // For contacts, use first_name + last_name
//         displayName = `${item.first_name} ${item.last_name}`;
//       } else {
//         // For fleets, use model
//         displayName = item.model;
//       }
      
//       // Probably want to randomize its placement later on in the future
//       return {
//         id: itemId,
//         type: 'mediumNode',
//         position: { 
//           x: parentPosition.x + 200, 
//           y: parentPosition.y - 150 + (index * 100) // Stack nodes vertically
//         },
//         data: {
//           name: displayName,
//           details: item,
//           type: parentNodeType // Store the type for reference
//         },
//       };
//     });
    
//     // Create edges from parent to each child
//     newNodes.forEach((node) => {
//       const newEdge = {
//         id: `e${nodeId}-${node.id}`,
//         source: nodeId,
//         target: node.id,
//         sourceHandle: 'right-handle', 
//         targetHandle: 'medium-handle',  
//         animated: true,
//         style: { 
//           stroke: isDarkMode ? "#ffffff" : "#000000", 
//           strokeWidth: 2
//         }
//       };
//       setEdges(edges => [...edges, newEdge]);
//     });
    
//     return [...currentNodes, ...newNodes];
//   });
// };

