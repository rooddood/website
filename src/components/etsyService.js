import axios from "axios";

const API_KEY = "";
const BASE_URL = "https://openapi.etsy.com/v3/application";

export const getShopDetails = async (shopId) => {
  try {
    const response = await axios.get(`${BASE_URL}/shops/${shopId}`, {
      headers: {
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shop details:", error);
  }
};

export const getListings = async (shopId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/shops/${shopId}/listings/active`,
      {
        headers: {
          "x-api-key": API_KEY,
        }
      }
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};
