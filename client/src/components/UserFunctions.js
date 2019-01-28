import axios from "axios";

export const register = newUser => {
  return axios
    .post("register", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password
    })
    .then(res => {
      console.log(res.data.error);
      if (res.data.error !== "User already exists") {
        this.push("/users/login");
      } else {
        this.push("/users/profile");
      }
    });
};

export const login = user => {
  return axios
    .post("login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
