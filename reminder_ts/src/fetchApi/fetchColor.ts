import apiClient from "../config/axios.ts";
import { Color } from "../types/color.type.ts";

const getColor = async (): Promise<Color[]> => {
  try {
    const response = await apiClient.get("/color");

    if (response.status === 200) {
      const colorData: Color[] = response.data;
      return colorData;
    } else {
      throw new Error("Failed to fetch color data");
    }
  } catch (error) {
    console.error("Error fetching color data:", error.message);
    throw error;
  }
};

export default getColor;
