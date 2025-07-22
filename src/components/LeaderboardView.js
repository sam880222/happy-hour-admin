import { Box, Paper, Typography } from "@mui/material";

const LeaderboardView = ({ data: users }) => {
  return (
    <Box
      width="100%"
      sx={{ maxWidth: 750, height: "60%", overflowY: "scroll" }}
    >
      {users.map((user) => {
        return (
          <Paper
            key={user?.name}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              background: "transparent",
              borderRadius: 99,
              padding: "8px 32px",
              my: 2,
            }}
            variant="outlined"
          >
            <Typography variant="h5" fontWeight="bold">
              {(user?.rank === 1 ? "👑 " : "") + user?.rank}
            </Typography>
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="h5">{user?.score ?? "--"}</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default LeaderboardView;
