const initialState = {
  nodes: [],
  edgesAndCost: [],
};

function searchForArray(haystack, needle) {
  var i, j, current;
  for (i = 0; i < haystack.length; ++i) {
    if (needle.length === haystack[i].length) {
      current = haystack[i];
      for (j = 0; j < needle.length-1 && needle[j] === current[j]; ++j);
      if (j === needle.length-1) return i;
    }
  }
  return -1;
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_NODE":
      let newNodes = [...state.nodes];
      if (!newNodes.includes(action.node1)) {
        newNodes.push(action.node1);
      }
      if (!newNodes.includes(action.node2)) {
        newNodes.push(action.node2);
      }
      return {
        ...state,
        nodes: newNodes,
      };
    case "ADD_EDGES_AND_COST":
      let newEdgesAndCost = [...state.edgesAndCost];
      if (searchForArray(newEdgesAndCost, action.edge) === -1) {
        newEdgesAndCost.push(action.edge);
        return {
          ...state,
          edgesAndCost: newEdgesAndCost,
        };
      } else {
        return {
          ...state,
          edgesAndCost: newEdgesAndCost,
        };
      }
    default:
      return state;
  }
}
