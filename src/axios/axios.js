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

const getMoviePage = async (token, title, type, year, page) => {

  let queryParams = "?";
  queryParams += "page=" + page;

  if (title) queryParams += "&title=" + encodeURI(title);
  if (type) queryParams += "&type=" + encodeURI(type);
  if (year) queryParams += "&year=" + encodeURI(year);


  return await client.get("/api/movie/many" + queryParams, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })

};

const getMovie = async (token, id) => {
  return await client.get("/api/movie/" + id + "?plot=full", {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const getFriends = async (token) => {
  return await client.get("/api/user/me/friend", {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const getCreatedFriendRequests = async (token) => {
  return await client.get("/api/user/me/createdFriendRequest", {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const getPendingFriendRequests = async (token) => {
  return await client.get("/api/user/me/pendingFriendRequest", {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const sendFriendRequest = async (token, email) => {
  return await client.post("/api/user/friendRequest?email=" + encodeURI(email), {}, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const acceptFriendRequest = async (token, id) => {
  return await client.post("/api/user/me/friendRequest/" + id, {}, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const discardFriendRequest = async (token, id) => {
  return await client.delete("/api/user/me/friendRequest/" + id, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const removeFriend = async (token, id) => {
  return await client.delete("/api/user/me/friend/" + id, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

export default {
  getUser,
  getMoviePage,
  getMovie,
  getFriends,
  getCreatedFriendRequests,
  getPendingFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  discardFriendRequest,
  removeFriend
}