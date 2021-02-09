import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as graphActions from "./store/graphAction";
import { TextField, Button, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import dijkstras from "./dijkstras";
import SnackBar from "./components/SnackBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function App({ graph, graphActions }) {
  const classes = useStyles();

  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [cost, setCost] = useState("");
  const [srcVertex, setSrcVertex] = useState("");
  const [targetVertex, setTargetVertex] = useState("");
  const [answer, setAnswer] = useState("");
  const [toggleSnack, setToggleSnack] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [path, setPath] = useState([]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "source") setSource(value);
    if (name === "target") setTarget(value);
    if (name === "cost") setCost(value);
    if (name === "srcVertex") setSrcVertex(value);
    if (name === "targetVertex") setTargetVertex(value);
  };

  const toShow = [];

  graph.edgesAndCost.forEach((element, index) =>
    toShow.push(
      <Typography key={index}>
        {`${element[0]} --- ${element[1]}(${element[2]})`}
      </Typography>
    )
  );

  const calculateDistance = async () => {
    if (!srcVertex || !targetVertex) {
      await setMessage("Please fill all the fields.");
      await setSeverity("error");
      await setToggleSnack(true);
      return;
    }
    if (parseInt(srcVertex) >= graph.nodes.length) {
      await setMessage(
        "Source vertex cannot be greater than or equal the highest node value in the graph"
      );
      await setSeverity("error");
      await setToggleSnack(true);
      return;
    }
    if (parseInt(targetVertex) >= graph.nodes.length) {
      await setMessage(
        "Target vertex cannot be greater than or equal to the highest node value in the graph"
      );
      await setSeverity("error");
      await setToggleSnack(true);
      return;
    }
    const ans = await dijkstras(
      graph.nodes,
      graph.edgesAndCost,
      srcVertex,
      targetVertex
    );
    setAnswer(ans.distance);
    setPath(ans.path);
    if (ans.distance >= 10000) {
      await setMessage(
        "Please check the graph. Source and target might be disconnected"
      );
      await setSeverity("warning");
      await setToggleSnack(true);
    }
    setTargetVertex("");
    setSrcVertex("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!source || !target || !cost) {
      await setMessage("Please fill all the fields.");
      await setSeverity("error");
      await setToggleSnack(true);
      return;
    }
    graphActions.addNode(source, target);
    graphActions.addEdge([parseInt(source), parseInt(target), parseInt(cost)]);
    setSource("");
    setTarget("");
    setCost("");
    await setMessage("Node added in the graph.");
    await setSeverity("success");
    await setToggleSnack(true);
  };

  const close = () => {
    setToggleSnack(false);
  };
  let showPath = "";
  if (path) {
    for (let index = 0; index < path.length; index++) {
      showPath += path[index] + " -> ";
    }
    showPath = showPath.substring(0, showPath.length - 3);
  }

  return (
    <div className="App">
      <span className="heading">Find Shortest Distance Between Two Nodes</span>
      <div className="container-div">
        <div className="left-container">
          <Typography variant="h4">Create Graph</Typography>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            method="GET"
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                required
                id="outlined"
                label="Source"
                variant="outlined"
                name="source"
                value={source}
                onChange={handleChange}
              />
              <TextField
                required
                id="outlined"
                label="Target"
                variant="outlined"
                value={target}
                onChange={handleChange}
                name="target"
              />
              <TextField
                required
                id="outlined"
                label="Cost"
                variant="outlined"
                value={cost}
                onChange={handleChange}
                name="cost"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "5%",
              }}
            >
              <Button variant="contained" color="secondary" type="submit">
                Add to Graph
              </Button>
            </div>
          </form>
        </div>
        <div className="right-container">
          <Typography variant="h5">
            The graph will be displayed as (source) --- (target)(cost)
          </Typography>
          <div>{toShow}</div>
        </div>
      </div>
      <div
        style={{
          marginTop: "15%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%",
          }}
        >
          <TextField
            required
            id="outlined"
            label="Source Vertex"
            variant="outlined"
            name="srcVertex"
            value={srcVertex}
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined"
            label="Target Vertex"
            variant="outlined"
            value={targetVertex}
            onChange={handleChange}
            name="targetVertex"
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={calculateDistance}
          >
            {" "}
            Calculate Optimized Path
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "20%",
            fontSize: "20px",
            fontWeight: "bolder",
          }}
        >
          {answer}
          {showPath ? `  || ${showPath}` : ""}
        </div>
      </div>
      <SnackBar
        open={toggleSnack}
        message={message}
        severity={severity}
        closeSnackBar={close}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    graph: state.graph,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    graphActions: bindActionCreators(graphActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
