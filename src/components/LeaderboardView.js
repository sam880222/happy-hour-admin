import { Box, Paper, Typography } from "@mui/material";

const LeaderboardView = ({ data: users }) => {
  return (
    <Box
      width="100%"
      sx={{
        maxWidth: 800,
        height: "60%",
        overflowY: "scroll",
        px: 5,
        "&::-webkit-scrollbar": {
          display: "none",
          background: "transparent",
        },
      }}
    >
      {users.map((user) => {
        return (
          <Paper
            key={user?.name}
            sx={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              background: "transparent",
              borderRadius: 99,
              padding: "8px 32px",
              my: 2,
              boxSizing: "border-box",
              overflow: "visible !important",
            }}
            variant="outlined"
          >
            {user?.rank === 1 && (
              <Typography
                variant="h5"
                fontWeight="bold"
                position="absolute"
                top={-2}
                left={-16}
                fontSize={36}
              >
                {"👑"}
              </Typography>
            )}
            <Typography variant="h5" fontWeight="bold">
              {user?.rank}
            </Typography>
            <Typography variant="h5" width={400}>
              {user?.name}
            </Typography>
            <Typography variant="h5">{user?.score ?? "--"}</Typography>
          </Paper>
        );
      })}
    </Box>
  );
};

export default LeaderboardView;
