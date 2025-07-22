import { Chip } from "@mui/material";

function UserList({ users }) {
  return users.map((user) => (
    <Chip
      key={user}
      label={user}
      sx={{
        fontSize: 24,
        p: 1,
        height: "fit-content",
        m: 1,
        maxWidth: 160,
        backgroundColor: `hsl(${hashNameToHue(user)}, 72%, 80%)`,
        transition: "all 0.5s ease",
        translate: getRandomTranslation(3),
      }}
    />
  ));
}

function getRandomTranslation(max = 3) {
  return `${Math.floor(Math.random() * max * 2) - max}px ${
    Math.floor(Math.random() * max * 2) - max
  }px`;
}

// Hash function to convert name to a hue (0-360)
function hashNameToHue(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash % 360); // Ensure the result is between 0 and 360
}

export default UserList;
