export const handleNodeButtonClick = (
  nodeId, 
  handleId,
  setEdges,
  setNodes,
  isDarkMode
  ) => {
  setNodes((currentNodes) => {

    // lets give this bad boy a shot ahhhhhhhh
    
    // Helper function to recursively find all descendant node IDs - this one is fancy
    const findAllDescendantNodeIds = (parentId, allNodes) => {
      // Find direct children first
      const directChildren = allNodes.filter(node => 
        node.id.startsWith(`${parentId}-`)
      );
      
      let allDescendants = directChildren.map(node => node.id);
      
      // For each direct child, find their descendants recursively
      // recursion is like inception but with code lol
      directChildren.forEach(childNode => {
        const childDescendants = findAllDescendantNodeIds(childNode.id, allNodes);
        allDescendants = [...allDescendants, ...childDescendants];
      });
      
      return allDescendants;
    };

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
            y: currentNodes[0].position.y - 120
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
      // If contacts node exists, remove it and all its children - scorched earth policy
      else {
        const contactsNode = currentNodes[existingContactsNodeIndex];
        
        // Get all descendant node IDs - the whole family tree
        const descendantIds = findAllDescendantNodeIds(contactsNode.id, currentNodes);
        
        // All node IDs to remove (contacts node + all descendants)
        const allNodesToRemove = [contactsNode.id, ...descendantIds];
        
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !allNodesToRemove.includes(edge.source) && 
            !allNodesToRemove.includes(edge.target)
          )
        );
        
        // Remove the nodes - poof gone
        return currentNodes.filter(node => 
          !allNodesToRemove.includes(node.id)
        );
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
      // If fleets node exists, remove it and all its descendants - full house cleaning
      else {
        const fleetsNode = currentNodes[existingFleetsNodeIndex];
        
        // Get all descendant node IDs
        const descendantIds = findAllDescendantNodeIds(fleetsNode.id, currentNodes);
        
        // All node IDs to remove (fleets node + all descendants)
        const allNodesToRemove = [fleetsNode.id, ...descendantIds];
        
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !allNodesToRemove.includes(edge.source) && 
            !allNodesToRemove.includes(edge.target)
          )
        );
        
        // Remove the nodes - delete delete delete
        return currentNodes.filter(node => 
          !allNodesToRemove.includes(node.id)
        );
      }
    }
    
    // If no matching handle, return current nodes
    return currentNodes;
  });
}
// export default handleNodeButtonClick;

export const handleSmallNodeButtonClick = (
  nodeId,
  handleId,
  setEdges,
  setNodes,
  isDarkMode,
  companyContacts,
  companyFleets,
  // companyParts,
  isLoadingContacts,
  isLoadingFleets,
  // isLoadingParts,
  fetchCompanyContacts,
  fetchCompanyFleets,
  // fetchFleetParts,
  selectedCompany
  ) => {
  setNodes((currentNodes) => {

    // Find the current node to get its position. Basically the parent
    const currentNodeIndex = currentNodes.findIndex(node => node.id === nodeId);
    if (currentNodeIndex === -1) return currentNodes;
    
    const currentNode = currentNodes[currentNodeIndex];
    
    // Helper function to recursively find all descendant node IDs
    // lets give this bad boy a shot ahhhhhhhh
    const findAllDescendantNodeIds = (parentId, allNodes) => {
      // Find direct children first
      const directChildren = allNodes.filter(node => 
        node.id.startsWith(`${parentId}-`)
      );
      
      let allDescendants = directChildren.map(node => node.id);
      
      // For each direct child, find their descendants recursively
      // this is where the recursion magic happens wooooo
      directChildren.forEach(childNode => {
        const childDescendants = findAllDescendantNodeIds(childNode.id, allNodes);
        allDescendants = [...allDescendants, ...childDescendants];
      });
      
      return allDescendants;
    };
    
    // Check if this is a Contacts node
    if (currentNode.data.name === 'Contacts') {
      // Check if we already have nodes for contacts (including loading nodes)
      const existingContactNodes = currentNodes.filter(
        node => node.id.startsWith(`${nodeId}-contact-`) || node.id === `${nodeId}-loading-contacts`
      );
      
      // If we already have contact nodes, remove them and their descendants
      if (existingContactNodes.length > 0) {
        // Get all node IDs to remove (including descendants)
        // this should nuke all child nodes recursively
        const nodeIdsToRemove = existingContactNodes.flatMap(node => 
          [node.id, ...findAllDescendantNodeIds(node.id, currentNodes)]
        );
        
        // Remove all edges connected to these nodes and their descendants
        setEdges(edges => 
          edges.filter(edge => 
            !nodeIdsToRemove.includes(edge.source) && 
            !nodeIdsToRemove.includes(edge.target)
          )
        );
        
        // Remove the nodes and their descendants
        return currentNodes.filter(node => 
          !nodeIdsToRemove.includes(node.id)
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
                x: currentNode.position.x + 250 + (Math.random() * 80 - 40),
                y: currentNode.position.y - 150 + (index * 118) 
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
      
      // If we already have fleet nodes, remove them and their descendants
      if (existingFleetNodes.length > 0) {
        // Get all node IDs to remove (including descendants)
        // same nuke strategy as contacts - BOOM gone
        const nodeIdsToRemove = existingFleetNodes.flatMap(node => 
          [node.id, ...findAllDescendantNodeIds(node.id, currentNodes)]
        );
        
        // Remove all edges connected to these nodes and their descendants
        setEdges(edges => 
          edges.filter(edge => 
            !nodeIdsToRemove.includes(edge.source) && 
            !nodeIdsToRemove.includes(edge.target)
          )
        );
        
        // Remove the nodes and their descendants
        return currentNodes.filter(node => 
          !nodeIdsToRemove.includes(node.id)
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
                x: currentNode.position.x + 250 + (Math.random() * 80 - 40),
                y: currentNode.position.y - 150 + (index * 118) 
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

    //checks if this is a Parts node
    if (currentNode.data.name === 'Parts'){
      
      // Check if we already have nodes for parts (including loading nodes)
      const existingPartNodes = currentNodes.filter(
        node => node.id.startsWith(`${nodeId}-part-`) || node.id === `${nodeId}-loading-parts`
      );


      if (existingPartNodes.length > 0) {
        // Get all node IDs to remove (including descendants)
        const nodeIdsToRemove = existingPartNodes.flatMap(node => 
          [node.id, ...findAllDescendantNodeIds(node.id, currentNodes)]
        );


        setEdges(edges => 
          edges.filter(edge => 
            !nodeIdsToRemove.includes(edge.source) && 
            !nodeIdsToRemove.includes(edge.target)
          )
        );
        
        // Remove the nodes and their descendants
        return currentNodes.filter(node => 
          !nodeIdsToRemove.includes(node.id)
        );
      }
      
      // load and create nodes
      else {

        // if not loading fetch data
        // if (!isLoadingParts && !companyParts && fleetId) {
        //   fetchFleetParts(fleetId); // Fetch parts for this specific fleet
        // }

        // return currentNodes
      }


    }
    
    // If no matching condition, return current nodes
    return currentNodes;
  });
};

// I am legit just copying handleNodeButtonClick to mimic its functionality
// I don't even remember how I built it at this point
export const handleFleetButtonClick = (
  nodeId,
  handleId,
  setEdges,
  setNodes,
  isDarkMode
) => {
  setNodes((currentNodes) => {

    // whoops contacts should not make parts so lets do a check
    // to see if they are a part
    if (nodeId.includes('-contact-')){
      return currentNodes;
    }

    // Find the current node to get its position. Basically the parent
    const currentNodeIndex = currentNodes.findIndex(node => node.id === nodeId);
    if (currentNodeIndex === -1) return currentNodes;
    
    const currentNode = currentNodes[currentNodeIndex];

    // Helper function to recursively find all descendant node IDs 
    const findAllDescendantNodeIds = (parentId, allNodes) => {
      // Find direct children first
      const directChildren = allNodes.filter(node => 
        node.id.startsWith(`${parentId}-`)
      );
      
      let allDescendants = directChildren.map(node => node.id);
      
      // For each direct child, find their descendants recursively
      // recursion strikes again!
      directChildren.forEach(childNode => {
        const childDescendants = findAllDescendantNodeIds(childNode.id, allNodes);
        allDescendants = [...allDescendants, ...childDescendants];
      });
      
      return allDescendants;
    };

    // Find existing parts node by name
    const existingPartsNodeIndex = currentNodes.findIndex(
      node => node.id.startsWith(`${nodeId}-parts`)
    );

    const partsNodeId = `${nodeId}-parts`;

    // Handle the medium-handle-right click
    if (handleId === 'medium-handle-right') {
      
      // If no parts node exists, create one
      if (existingPartsNodeIndex === -1) {
        
        const partsNode = {
          id: partsNodeId,
          type: 'smallNode',
          position: {
            x: currentNode.position.x + 310,
            y: currentNode.position.y 
          },
          data: {
            name: 'Parts',
          },
        };

        // Create a new edge connecting the original node to the parts node
        const newEdge = {
          id: `e${nodeId}-${partsNodeId}`,
          source: nodeId,
          target: partsNodeId,
          sourceHandle: 'medium-handle-right',
          targetHandle: 'left-handle',
          animated: true,
          style: { 
            stroke: isDarkMode ? "#ffffff" : "#000000", 
            strokeWidth: 2
          }
        };

        // Update both nodes and edges
        setEdges(edges => [...edges, newEdge]);
        return [...currentNodes, partsNode];
        
      } 
      // If parts node exists, remove it and all its descendants - cleanup crew
      else {
        const partsNode = currentNodes[existingPartsNodeIndex];
        
        // Get all descendant node IDs - the whole branch
        const descendantIds = findAllDescendantNodeIds(partsNode.id, currentNodes);
        
        // All node IDs to remove (parts node + all descendants)
        const allNodesToRemove = [partsNode.id, ...descendantIds];
        
        // Remove all edges connected to these nodes
        setEdges(edges => 
          edges.filter(edge => 
            !allNodesToRemove.includes(edge.source) && 
            !allNodesToRemove.includes(edge.target)
          )
        );
        
        // Remove the nodes - bye bye!
        return currentNodes.filter(node => 
          !allNodesToRemove.includes(node.id)
        );
      }
    }
    
    // If no matching handle, return current nodes unchanged
    return currentNodes;
  });
};