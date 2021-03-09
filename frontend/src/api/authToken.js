import axios from "axios";

// verify if auth token axist or not (if not logout)
export const verifyAuthToken = async (token, dispatch, userLogout, API) => {
  try {
    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`${API}/user/auth`, config);
    console.log(data);
  } catch (error) {
    const err =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (err === "jwt expired") {
      dispatch(userLogout());
    }
  }
};
