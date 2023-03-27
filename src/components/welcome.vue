<template>
  <div class="container container-styles">
    <div class="card text-center">
      <div class="card-header">{{pageTitle}}</div>
      <div class="card-body">
        <div>
          <span class="img-responsive logo-styles">
            <i class="fa fa-shopping-cart"></i>
          </span>
          <div id="div1" class="shadow title-styles">mCart</div>
        </div>
        <br />
        <div>
          <div class="text-center text-styles">An online app to purchase mobile gadgets</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return {
      pageTitle: "Welcome"
    };
  },
  mounted: function() {
    document.getElementById("login").style.display = "";
  }
};
</script>

<style>
.shadow {
  text-shadow: 3px 3px 2px rgba(150, 150, 150, 1);
}

.logo-styles {
  width: 50px;
  font-size: 50px;
  color: #ff0080;
}

.title-styles {
  color: #ff0080;
  font-size: 40px;
}

.text-styles {
  color: #337ab7;
  font-size: 15px;
}

.container-styles {
  position: relative;
  top: 180px;
  width: 50%;
}
</style>
