const baseURL = process.env.REACT_APP_API_BASE_URL;

export const proceedGame = async () => {
  try {
    const response = await fetch(baseURL + "/next", {
      method: "POST",
    });

    if (response.ok) {
      console.log("Submission successful");
    } else {
      console.error("Submission failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error submitting data:", error);
  }
};

export const getQuestion = async (id) => {
  try {
    const response = await fetch(baseURL + `/question/${id}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response as JSON
      console.log("Get question successful");
      return data;
    } else {
      console.error("Get question failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await fetch(baseURL + `/leaderboard/30`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json(); // Parse the response as JSON
      console.log("Get question successful");
      return data;
    } else {
      console.error("Get question failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const restartGame = async () => {
  try {
    const response = await fetch(baseURL + `/restart`, {
      method: "POST",
    });

    if (response.ok) {
      console.log("Restart game successful");
    } else {
      console.error("Restart game failed:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
