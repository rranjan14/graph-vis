function makeGraph(V, E) {
  // V - Number of vertices in graph
  // E - Number of edges in graph (u,v,w)
  const adjacencyList = []; // Adjacency list
  for (let i = 0; i < V; i++) {
    let a = new Array(V).fill(10000);
    adjacencyList.push(a);
  }
  for (let i = 0; i < E.length; i++) {
    adjacencyList[E[i][0]][E[i][1]] = E[i][2];
    adjacencyList[E[i][1]][E[i][0]] = E[i][2];
  }
  return adjacencyList;
}

function djikstra(graph, V, src, target) {
  const path = [];
  let dist = new Array(V).fill(10000);
  let blackened = new Array(V).fill(0);
  let pathLength = new Array(V).fill(0);
  let parent = new Array(V).fill(-1);
  parent[src] = -1;
  dist[src] = 0;
  for (let i = 0; i < V - 1; i++) {
    let u = minDistance(dist, blackened);
    if (u === 10000) break;
    else blackened[u] = 1;
    for (let index = 0; index < V; index++) {
      if (
        blackened[index] === 0 &&
        graph[u][index] &&
        dist[u] + graph[u][index] < dist[index]
      ) {
        parent[index] = u;
        pathLength[i] = pathLength[parent[index]] + 1;
        dist[index] = dist[u] + graph[u][index];
      } else if (
        blackened[index] === 0 &&
        graph[u][index] &&
        dist[u] + graph[u][index] === dist[index] &&
        pathLength[u] + 1 < pathLength[index]
      ) {
        parent[index] = u;
        pathLength[index] = pathLength[u] + 1;
      }
    }
  }
  if (dist[target] !== 10000) {
    printPath(parent, target, path);
    return {
      distance: dist[target],
      path,
    };
  } else {
    return {
      distance: 10000,
      path: [],
    };
  }
}

function printPath(parent, target, path) {
  if (parent[target] === -1) {
    path.push(target);
    return;
  }
  printPath(parent, parent[target], path);
  path.push(parseInt(target));
}

function minDistance(dist, blackened) {
  let min = 10000;
  let min_idx = -1;
  for (let i = 0; i < dist.length; i++) {
    if (!blackened[i] && dist[i] < min) {
      min = dist[i];
      min_idx = i;
    }
  }
  if (min === 10000) return 10000;
  else return min_idx;
}

export default function (Nodes, Edges, Source, Target) {
  const V = Nodes.length;
  const E = Edges;
  const graph = makeGraph(V, E);
  const result = djikstra(graph, V, Source, Target);
  return result;
}
