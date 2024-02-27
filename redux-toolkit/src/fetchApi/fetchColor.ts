import apiClient from "../config/axios";
import { IColor } from "../types/color.type";

const getColor = async (): Promise<IColor[]> => {
  try {
    const response = await apiClient.get("/color");

    if (response.status === 200) {
      const colorData: IColor[] = response.data;
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
