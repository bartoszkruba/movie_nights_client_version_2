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

  queryParams += "&title=" + encodeURI(title);
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

const getMovieWatchings = async (token) => {
  return await client.get("/api/calendar/me/movieWatching", {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const getPossibleTimes = async (token, attendees, movieId, startTime, weekdays) => {
  let query = "?movieId=" + movieId + "&startTime=" + startTime + "&attendees=";
  for (let attendee of attendees) {
    query += attendee.id;
    if (attendees.indexOf(attendee) !== attendees.length - 1) {
      query += ",";
    }
  }

  if (weekdays.length > 0) {
    query += "&weekdays="
  }

  for (let day of weekdays) {
    query += day;
    if (weekdays.indexOf(day) !== weekdays.length - 1) {
      query += ","
    }
  }

  return await client.get("/api/calendar/me/movieWatching/possibleTimes" + query, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

const createMovieWatching = async (token, attendees, movieId, startTime, location) => {

  attendees = attendees.map(attendee => attendee.id);

  return await client.post("/api/calendar/me/movieWatching", {
    attendees,
    movieId,
    startTime,
    location
  }, {
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
  removeFriend,
  getMovieWatchings,
  getPossibleTimes,
  createMovieWatching
}