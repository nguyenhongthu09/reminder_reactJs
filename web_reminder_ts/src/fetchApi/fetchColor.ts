import apiClient from "../config/axios";
import { Color } from "../types/color.type";

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
    console.error("Error fetching color data:");
    throw error;
  }
};

export default getColor;
