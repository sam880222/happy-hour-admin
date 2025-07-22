import "./App.css";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getLeaderboard, getQuestion, proceedGame, restartGame } from "./api";
import QuestionView from "./components/QuestionView";
import LeaderboardView from "./components/LeaderboardView";
import UserList from "./components/UserList";

const Stage = {
  hint1: 0,
  hint2: 1,
  hint3: 2,
  answer: 3,
  leaderboard: 4,
};

function App() {
  const [qid, setQid] = useState(null);
  const [stage, setStage] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

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
      console.log("onUpdateQuestion: ", qid, stage);
      setQid(qid);
      setStage(stage);
      switch (stage) {
        case Stage.hint1:
          updateQuestion(qid);
          break;
        case Stage.hint2:
        case Stage.hint3:
        case Stage.answer:
          if (question === null) {
            updateQuestion(qid);
          }
          break;
        case Stage.leaderboard:
          updateLeaderboard();
          setQuestion(null);
          break;
        default:
          setQuestion(null);
          setLeaderboard([]);
      }
    }

    function onRestarted() {
      console.log("Game restarted");
      setQid(null);
      setStage(null);
      setUsers([]);
      setQuestion(null);
      setLeaderboard([]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);
    socket.on("updateUsers", onUpdateUsers);
    socket.on("updateQuestion", onUpdateQuestion);
    socket.on("restarted", onRestarted);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
      socket.off("updateUsers", onUpdateUsers);
      socket.off("updateQuestion", onUpdateQuestion);
      socket.off("restarted", onRestarted);
    };
  });

  const updateLeaderboard = async () => {
    let leaderboard = await getLeaderboard();
    console.log(leaderboard);
    setLeaderboard(leaderboard);
  };

  const updateQuestion = async (id) => {
    let question = await getQuestion(id);
    setQuestion(question);
  };

  const onClickNext = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await proceedGame();
    setIsLoading(false);
  };

  const onClickRestart = async () => {
    if (isLoading) {
      return;
    }
    const userConfirmed = window.confirm("Are you sure you want to restart?");
    if (userConfirmed) {
      console.log("Restarting...");
      setIsLoading(true);
      await restartGame();
      setIsLoading(false);
    } else {
      console.log("Restart canceled.");
    }
  };

  const getTitle = () => {
    if (qid === null) {
      return "Waiting to start...";
    }
    switch (stage) {
      case Stage.answer:
        return question?.name + " is sharing...";
      case Stage.leaderboard:
        return "Leaderboard";
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
          width: "90%",
          minHeight: "80%",
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
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            {getTitle()}
          </Typography>
          {qid === null && (
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Box sx={{ flexGrow: 1 }}>
                <UserList users={users} />
              </Box>
              <Card sx={{ m: 2, minWidth: 320 }}>
                <CardMedia
                  component="img"
                  height="320"
                  width="320"
                  image="/qr-code.png"
                  alt="QR Code"
                />
              </Card>
            </Box>
          )}
          {question !== null &&
            stage !== null &&
            stage !== Stage.leaderboard && (
              <QuestionView
                question={question}
                stage={stage}
                showAnswer={stage === Stage.answer}
              />
            )}
          {stage === Stage.leaderboard && leaderboard !== null && (
            <LeaderboardView data={leaderboard} />
          )}
          <Button
            variant="outlined"
            onClick={onClickNext}
            sx={{ mt: 2, maxWidth: "40%" }}
            fullWidth
            disabled={users.length === 0 || isLoading}
          >
            {qid === null ? "Start" : "Next"}
          </Button>
        </Box>
      </Paper>
      {qid !== null && (
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 4, position: "fixed", top: "0.5%", right: "2%" }}
          onClick={onClickRestart}
        >
          Restart
        </Button>
      )}
    </Box>
  );
}

export default App;
