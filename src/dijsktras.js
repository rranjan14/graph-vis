function makeGraph(V, E) {
  // V - Number of vertices in graph
  // E - Number of edges in graph (u,v,w)
  const adjacencyList = []; // Adjacency list
  for (let i = 0; i < V; i++) {
    adjacencyList.push([]);
  }
  for (let i = 0; i < E.length; i++) {
    adjacencyList[E[i][0]].push([E[i][1], E[i][2]]);
    adjacencyList[E[i][1]].push([E[i][0], E[i][2]]);
  }
  return adjacencyList;
}

function djikstra(graph, V, src) {
  const visited = Array(V).fill(0);
  const distance = [];
  for (let i = 0; i < V; i++) distance.push([10000, -1]);
  distance[src][0] = 0;

  for (let i = 0; i < V - 1; i++) {
    let temp = -1;
    for (let j = 0; j < V; j++) {
      if (visited[j] === 0) {
        if (temp === -1 || distance[j][0] < distance[temp][0]) temp = j;
      }
    }

    visited[temp] = 1;
    for (let j = 0; j < graph[temp].length; j++) {
      const edge = graph[temp][j];
      if (
        visited[edge[0]] === 0 &&
        distance[edge[0]][0] > distance[temp][0] + edge[1]
      ) {
        distance[edge[0]][0] = distance[temp][0] + edge[1];
        distance[edge[0]][1] = temp;
      }
    }
  }

  return distance;
}

export default function (Nodes, Edges, Source) {
  const V = Nodes.length;
  const E = Edges;

  const graph = makeGraph(V, E);
  const distances = djikstra(graph, V, Source);

  return distances;
}
