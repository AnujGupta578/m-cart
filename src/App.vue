<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <div class="container-fluid">
        <ul class="social-network social-circle iconpos">
          <li>
            <a href="#" class="icoFacebook" title="Facebook">
              <i class="fa fa-facebook fa-1x"></i>
            </a>
          </li>
          <li class="divider-vertical"></li>
          <li>
            <a href="#" class="icoTwitter" title="Twitter">
              <i class="fa fa-twitter fa-1x"></i>
            </a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <div
              class="panel-heading text-right"
              style="display:none;padding:0px;position:relative;top:10px;"
              id="welcome"
            >Welcome {{ userName }}</div>
          </li>
          <li class="divider-vertical"></li>
          <li>
            <div class="btn-nav" style="padding-right:7%">
              <a
                id="login"
                class="btn btn-primary btn-small navbar-btn"
                v-on:click="login"
                href="#/login"
              >{{loginTitle}}</a>
            </div>
          </li>
          <li class="divider-vertical"></li>
          <!-- <li>
            <div class="btn-nav" style="padding-right:7%">
              <a
                id="course"
                class="btn btn-primary btn-small navbar-btn"
                v-on:click="loadVueCourse"
                href="#/practices"
              >{{courseTitle}}</a>
            </div>
          </li>-->
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import Router from "./router/index";

export default {
  name: "App",
  data() {
    return {
      pageTitle: "mCart",
      loginTitle: "Login",
      userName: null,
      courseTitle: "VueCourse"
    };
  },
  methods: {
    login: function() {
      var value = document.getElementById("login").innerHTML;
      if (value === "Login") {
        Router.push({ name: "login" });
      } else if (value === "Logout") {
        sessionStorage.clear();
        document.getElementById("login").innerHTML = "Login";
        document.getElementById("welcome").style.display = "none";
        Router.push({ name: "welcome" });
      }
    }
  },
  updated: function() {
    //  // console.log(sessionStorage)
    this.userName = sessionStorage.getItem("username");
    //  // console.log(this.userName)
  },

  loadVueCourse: function() {
    var value = document.getElementById("course").innerHTML;
    // console.log(value, "load-vue examoles");
    if (value === "VueCourse") {
      Router.push({ name: "coursePractices" });
    }
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
.iconpos {
  position: relative;
  top: 10px;
}

.footertxtpos {
  position: relative;
  top: 20px;
  left: 520px;
}
</style>

