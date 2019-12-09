import axios from 'axios'

const client = axios.create({
  baseURL: "http://localhost:8080"
});

const getUser = async (token) => {

  return await client.get("/api/user/me", {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

export default {getUser}