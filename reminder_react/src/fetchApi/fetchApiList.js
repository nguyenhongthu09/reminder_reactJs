import { API_URL } from "../constants/apiURL";
 const getAllList = async () =>{
    try {
        
            const response = await fetch(`${API_URL}/listNote`, {
                method: "GET",
              });

              if (response.status === 200) {
                const listData = await response.json();
                return listData;
              }

    } catch (error) {
        console.error("Error fetching list:", error);
    }
}

export default getAllList