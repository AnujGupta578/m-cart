<template>
  <div class="container container-styles">
    <div class="col-8 offset-2">
      <div class="card text-center">
        <div class="card-header">Login</div>

        <div class="card-body padding">
          <form class name="loginForm" v-on:submit="onSubmit">
            <div class="form-group row">
              <label for="name" class="col-3 control-label col-form-label">User Name</label>
              <div class="col-9">
                <input
                  type="text"
                  placeholder="Username"
                  class="form-control"
                  name="username"
                  v-model="login.userName"
                  v-validate="'required'"
                />
                <div v-if="errors.has('username')" style="color:red">UserName is required</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="password" class="col-3 control-label col-form-label">Password</label>
              <div class="col-9">
                <input
                  type="password"
                  placeholder="Password"
                  class="form-control"
                  name="password"
                  v-model="login.password"
                  v-validate="'required'"
                />
                <div v-if="errors.has('password')" style="color:red">Password is required</div>
              </div>
            </div>
            <div v-if="!valid" class="error">Invalid Credentials...Please try again...</div>
            <br />

            <div class="form-group row">
              <div class="col-3 offset-3">
                <button class="btn btn-outline-secondary">Login</button>
              </div>
              <span class="col-3" style="top:8px">
                <a href="#/" style="color:#337ab7;text-decoration: underline;">Cancel</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Router from "../router/index";

export default {
  name: "login",
  data() {
    return {
      pageTitle: "Welcome",
      valid: true,
      isLoggedIn: "false",
      users: [],
      login: { userName: null, password: null }
    };
  },
  methods: {
    Login: function() {
      var Login = { username: null, password: null };
      return Login;
    },
    onSubmit: function(e) {
      this.valid = true;
      var name = this.login.userName;
      var password = this.login.password;
      // // console.log(name+" "+ password)
      sessionStorage.setItem("username", this.login.userName);
      var user = this.users.filter(
        user => user.userName === name && user.password === password
      )[0];
      if (user) {
        this.isLoggedIn = "true";
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        Router.push({ path: "/products" });
      } else {
        this.isLoggedIn = "false";
        sessionStorage.setItem("isLoggedIn", this.isLoggedIn);
        this.valid = false;
      }
      e.preventDefault();
    }
  },
  created: function() {
    let style = document.getElementById("login").style;
    if (style) {
      style.display = "none";
    }
    this.$http.get("./users/users.json").then(function(response) {
      // // console.log("data"+response.data);
      this.users = response.data;
      // // console.log(this.users);
    });
  }
};
</script>

<style scoped>
.container-styles {
  top: 180px;
}

.padding {
  padding-bottom: 0px;
  margin-bottom: 0px;
}

.link-underline {
  color: #337ab7;
  text-decoration: underline;
}

.error {
  color: red;
  position: relative;
  left: 50px;
}
</style>
