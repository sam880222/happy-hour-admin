import "./App.css";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { proceedGame } from "./api";

const Stage = {
  hint1: 0,
  hint2: 1,
  hint3: 2,
  answer: 3,
  leaderboard: 4,
};

function App() {
  const [qid, setQid] = useState(0);
  const [stage, setStage] = useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function onConnect() {
      socket.emit("admin");
      console.log("Connected from the server");
    }

    function onDisconnect() {
      console.log("Disconnected from the server");
    }

    function onMessage(data) {
      console.log("Message from server:", data);
    }

    function onUpdateUsers(data) {
      console.log("update users: ", data);
      setUsers(Object.values(data));
    }

    function onUpdateQuestion(qid, stage) {
      setQid(qid);
      setStage(stage);
      console.log(qid, stage);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("updateUsers", onUpdateUsers);
    socket.on("updateQuestion", onUpdateQuestion);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("updateUsers", onUpdateUsers);
      socket.off("updateQuestion", onUpdateQuestion);
    };
  });

  const onClickNext = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await proceedGame();
    setIsLoading(false);
  };

  const getUserList = () => {
    return users.map((user) => (
      <Chip
        key={user}
        label={user}
        sx={{
          fontSize: 20,
          p: 1,
          height: "fit-content",
          m: 1,
          maxWidth: 180,
        }}
      />
    ));
  };

  const getTitle = () => {
    if (qid === null) {
      return "Waiting to start...";
    }
    switch (stage) {
      case Stage.answer:
        break;
      case Stage.leaderboard:
        break;
      default:
        return `#${qid + 1} - Hint ${stage + 1}`;
    }
  };

  return (
    <Box
      className="App"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "content-box",
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          width: "80%",
          height: "80%",
          p: 4,
          background: "rgba(255, 255, 255, 0.2)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          height="90%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {getTitle()}
          </Typography>
          {qid === null && getUserList()}
          <Button variant="outlined" onClick={onClickNext}>
            {qid === null ? "Start" : "Next"}
          </Button>
        </Box>
      </Paper>
      {qid !== null && (
        <Button variant="outlined" color="error" sx={{ mt: 2 }}>
          Restart
        </Button>
      )}
    </Box>
  );
}

export default App;
