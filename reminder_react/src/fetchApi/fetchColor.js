import { API_URL } from "../constants/apiURL";
const getColor = async () => {
  const response = await fetch(`${API_URL}/color`, {
    method: "GET",
  });
  if (response.status === 200) {
    const colorData = await response.json();
    return colorData;
  }
};

export default getColor;
