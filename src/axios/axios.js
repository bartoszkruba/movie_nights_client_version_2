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
  return await client.get("/api/movie/" + id, {
    headers: {
      'Content-Type': "application/json",
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Origin": "*"
    }
  })
};

export default {getUser, getMoviePage, getMovie}