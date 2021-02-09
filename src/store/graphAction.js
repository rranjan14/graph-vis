
export const addNode = (node1, node2) => {
  return {
    type: "ADD_NODE",
    node1: parseInt(node1),
    node2: parseInt(node2),
  };
};

export const addEdge = (edge) => {
  return {
    type: "ADD_EDGES_AND_COST",
    edge,
  };
};
