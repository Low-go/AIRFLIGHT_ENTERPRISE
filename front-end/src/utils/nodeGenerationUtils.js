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
  isLoadingContacts,
  isLoadingFleets,
  fetchCompanyContacts,
  fetchCompanyFleets,
  selectedCompany
) => {
  setNodes((currentNodes) => {
    // Find the current node to get its position
    const currentNodeIndex = currentNodes.findIndex(node => node.id === nodeId);
    if (currentNodeIndex === -1) return currentNodes;
    
    const currentNode = currentNodes[currentNodeIndex];
    
    // Check if this is a Contacts node
    if (currentNode.data.name === 'Contacts') {
      // Check if we already have nodes for contacts (including loading nodes)
      const existingContactNodes = currentNodes.filter(
        node => node.id.startsWith(`${nodeId}-contact-`) || node.id === `${nodeId}-loading-contacts`
      );
      
      // If we already have contact nodes, remove them
      if (existingContactNodes.length > 0) {
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !edge.source.startsWith(`${nodeId}-contact-`) && 
            !edge.target.startsWith(`${nodeId}-contact-`) &&
            edge.target !== `${nodeId}-loading-contacts`
          )
        );
        
        // Remove the nodes
        return currentNodes.filter(node => 
          !node.id.startsWith(`${nodeId}-contact-`) &&
          node.id !== `${nodeId}-loading-contacts`
        );
      } 
      // Otherwise, initiate loading or create nodes
      else {
        // If not loading and no data, fetch the data
        if (!isLoadingContacts && !companyContacts && selectedCompany) {
          fetchCompanyContacts(selectedCompany.id);
        }
        
        // If loading, create a loading node
        if (isLoadingContacts) {
          const loadingNodeId = `${nodeId}-loading-contacts`;
          
          // Create a loading node
          const loadingNode = {
            id: loadingNodeId,
            type: 'loadingNode',
            position: { 
              x: currentNode.position.x + 250, 
              y: currentNode.position.y 
            },
            data: {
              type: 'Contacts',
            },
          };
          
          // Create an edge connecting to the loading node
          const loadingEdge = {
            id: `e${nodeId}-${loadingNodeId}`,
            source: nodeId,
            target: loadingNodeId,
            sourceHandle: 'right-handle',
            targetHandle: 'medium-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
          
          // Update edges
          setEdges(edges => [...edges, loadingEdge]);
          
          // Return with the loading node
          return [...currentNodes, loadingNode];
        }
        
        // If data is loaded, create actual nodes
        if (companyContacts) {
          const newNodes = [];
          const newEdges = [];
          
          companyContacts.forEach((contact, index) => {
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
        
        // If we get here, something went wrong - return current nodes
        return currentNodes;
      }
    }
    
    // Check if this is a Fleets node
    if (currentNode.data.name === 'Fleets') {
      // Check if we already have nodes for fleets (including loading nodes)
      const existingFleetNodes = currentNodes.filter(
        node => node.id.startsWith(`${nodeId}-fleet-`) || node.id === `${nodeId}-loading-fleets`
      );
      
      // If we already have fleet nodes, remove them
      if (existingFleetNodes.length > 0) {
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !edge.source.startsWith(`${nodeId}-fleet-`) && 
            !edge.target.startsWith(`${nodeId}-fleet-`) &&
            edge.target !== `${nodeId}-loading-fleets`
          )
        );
        
        // Remove the nodes
        return currentNodes.filter(node => 
          !node.id.startsWith(`${nodeId}-fleet-`) &&
          node.id !== `${nodeId}-loading-fleets`
        );
      } 
      // Otherwise, initiate loading or create nodes
      else {
        // If not loading and no data, fetch the data
        if (!isLoadingFleets && !companyFleets && selectedCompany) {
          fetchCompanyFleets(selectedCompany.id);
        }
        
        // If loading, create a loading node
        if (isLoadingFleets) {
          const loadingNodeId = `${nodeId}-loading-fleets`;
          
          // Create a loading node
          const loadingNode = {
            id: loadingNodeId,
            type: 'loadingNode',
            position: { 
              x: currentNode.position.x + 250, 
              y: currentNode.position.y 
            },
            data: {
              type: 'Fleets',
            },
          };
          
          // Create an edge connecting to the loading node
          const loadingEdge = {
            id: `e${nodeId}-${loadingNodeId}`,
            source: nodeId,
            target: loadingNodeId,
            sourceHandle: 'right-handle',
            targetHandle: 'medium-handle',
            animated: true,
            style: { 
              stroke: isDarkMode ? "#ffffff" : "#000000", 
              strokeWidth: 2
            }
          };
          
          // Update edges
          setEdges(edges => [...edges, loadingEdge]);
          
          // Return with the loading node
          return [...currentNodes, loadingNode];
        }
        
        // If data is loaded, create actual nodes
        if (companyFleets) {
          const newNodes = [];
          const newEdges = [];
          
          companyFleets.forEach((fleet, index) => {
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
        
        // If we get here, something went wrong - return current nodes
        return currentNodes;
      }
    }
    
    // If no matching condition, return current nodes
    return currentNodes;
  });
};
