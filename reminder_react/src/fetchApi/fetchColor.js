import apiClient from "../config/axios";
const getColor = async () => {
  try {
    const response = await apiClient.get("/color");

    if (response.status === 200) {
      const colorData = response.data;
      return colorData;
    }
  } catch (error) {
    console.error("Error fetching color data:", error.message);
  }
};

export default getColor;
