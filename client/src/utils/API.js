import axios from "axios";

export default {
  getAll: function(type) {
    console.log(`api/${type}s/`);
    return axios.get(`/api/${type}s/`);
  },
  // Gets the example with the given id
  getOne: function(type, id) {
    return axios.get(`/api/${type}s/${id}`);
  },

  getByUserID: function(type, userID) {
    return axios.get(`/api/${type}s/user/${userID}`);
  },

  getByProject: function(type, project) {
    return axios.get(`/api/${type}s/project/${project}`);
  },

  getById: function(type, id) {
    return axios.get(`/api/${type}s/${id}`)
  },

  signupUser: function(userData) {
    return axios.post("/api/users/signup", userData);
  },

  loginUser: function(userData) {
    return axios.post("/api/users/login", userData);
  },

  logoutUser: function() {
    return axios.post("/api/users/logout");
  },

  saveNew: function(type, data) {
    console.log(data);
    return axios.post(`/api/${type}/`, data);
  },

  getAny: function() {
    return axios.get("/api");
},

  saveCheckIn: function(id, checkIn) {
    return axios.put(`/api/students/${id}`, checkIn);
  },

  saveCheckOut: function(id, checkOut) {
    return axios.put(`/api/students/${id}`, checkOut);
  },

  checkIn: function(data) {
    return axios.post(`/api/checkins/`, data);
  }
};
