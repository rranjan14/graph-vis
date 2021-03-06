# Shortest distance between two nodes in a graph.

## Before you proceed to check the task, please take note of the following points:
* Please don't enter duplicate edge values. For e.g., 0 --- 1(2) and 1 --- 0(2). This algorithm works on **undirected** graph.
* Overwrites are not accepted. For e.g., if one has entered 0 --- 1(2), then 0 --- 1(4) **won't replace** the previous value.
* This application follows **Djikstra's** algorithm for calculating optimised(minimum) cost of travelling between any two entered nodes.
    * *Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks.*
    * However, this algorithm is an optimisation over **Dijkstra's**. This optimization not only gives minimum cost to reach from one point to another, but also with minimum number of edges if there are multiple paths with minimum cost.
* The result displayed is in the format **(cost) || (path)**
* For disconnected nodes the distance returned will be 10,000 (considering this as infinity).
* Please fill in all of the text boxes for creating graph as well as calculating distance between two specified nodes.
* Proper feedback has been implemented for any sort of unexpected behaviour.
* Please enter integers to mark nodes and cost between the nodes and keep the number of nodes continuous. Attaching few snapshots for example.
![alt text](https://github.com/rranjan14/graph-vis/blob/main/images/image1.png "Image 1")
![alt text](https://github.com/rranjan14/graph-vis/blob/main/images/image2.png "Image 3")
![alt text](https://github.com/rranjan14/graph-vis/blob/main/images/image3.png "Image 2")

### Click [here](https://rranjan14.github.io/graph-vis/) to check it out.

## If you want to run the project locally:
* Clone the repository.
* run `npm install` in the root of the project.
* Install redux-dev-tools extension in **Google Chrome** browser from [here](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* run `npm start` in the root of the project.
