import { Box, Card, CardMedia, Chip, Grid } from "@mui/material";

const QuestionView = ({ question, stage, showAnswer }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      justifyContent="space-around"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        {[0, 1, 2].map((index) => (
          <Card
            key={"hint " + index}
            sx={{
              scale: showAnswer ? 1 : stage === index ? 1.1 : 0.8,
              height: 300,
              width: 400,
              transition: "all 0.5s ease",
              py: 0,
            }}
            variant="outlined"
          >
            <CardMedia
              component="img"
              height="300"
              width="400"
              image={question?.hints?.[index]}
              alt={"hint " + index}
              sx={{
                objectFit: "contain",
                opacity: stage >= index ? 1 : 0,
                transition: "all 0.5s ease",
              }}
            />
            <CardMedia
              component="img"
              height="300"
              width="400"
              image="happy-hour-admin/placeholder.jpg"
              alt={"hint " + index}
              sx={{
                top: 0,
                right: 0,
                position: "absolute",
                objectFit: "cover",
                opacity: stage >= index ? 0 : 1,
                transition: "all 0.5s ease",
              }}
            />
          </Card>
        ))}
      </Box>
      <Grid container width="90%" sx={{ mt: 4 }}>
        {question?.options?.map((selection, index) => (
          <Grid size={6} key={selection}>
            <Chip
              label={String.fromCharCode(65 + index) + ". " + selection}
              sx={{
                width: "90%",
                my: 0.5,
                fontSize: 28,
                height: 54,
                borderRadius: 99,
                transition: "all 0.5s ease",
              }}
              color={
                question.answer === index && showAnswer ? "success" : "default"
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuestionView;
