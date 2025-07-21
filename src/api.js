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
