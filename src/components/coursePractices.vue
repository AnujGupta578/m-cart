<template>
  <div style="text-align:center;padding-top: 96px;">
    <p>{{products}}</p>
    <p>{{products[1]}}</p>
    <p v-text="location"></p>
    <p>
      Unit:
      <a v-bind:href="link">{{unit}}</a>
      <br />Event Handling
      <a v-bind:href="link" v-on:click.prevent="openLink">{{unit}}</a>
      <br />Using : prefix instead v-bind directive
      <a :href="link">{{unit}}</a>
    </p>
    <p>Invokes method only once</p>
    <button v-on:click.once="handleClick(5)">Click -{{count1}}</button>

    <p>Invokes method only once useing @ prefix instead of v-on</p>
    <button @click="handleClick(10)">Click -{{count2}}</button>
    <br />
    <br />
    <hr />
    <p>Invokes method on every click</p>
    <button v-on:click="handleClick(15)">Click - {{count2}}</button>

    <div
      style="width:200px;
                 padding: 20px 20px;
                 text-align: center;
                 border: 1px solid #333;"
      v-on:mousemove="update"
    >Mouse move on the text</div>
    <br />
    Event type: {{x}}
    <h3>Event handling demo</h3>
    <hr />
    <a v-on:click.prevent="click" href="http://www.google.com">Google - navigation prevented</a>
    <br />
    <br />
    <a v-on:click="click1" href="http://www.google.com">Google</a>

    <input type="text" v-on:keyup.enter="notify" />

    <label>Count is: {{count}}</label>
    <button v-on:click="count++">Increment</button>
    <h3>Conditional rendering demo</h3>
    <hr />
    <img :src="imgUrl" />
    <h3>Vue complete guide</h3>
    <button v-on:click="show = !show">View details</button>
    <div v-if="show">
      <h3>Vue complete guide</h3>Rs. 560
      <strike>Rs. 1120</strike>50% Off
      <br />Offers: Special price
    </div>
    <div v-show="show">
      <h3>Vue complete guide</h3>Rs. 560
      <strike>Rs. 1120</strike>50% Off
      <br />Offers: Special price
    </div>
    <button v-on:click="inStock = !inStock">View details</button>
    <p v-if="inStock">In stock</p>
    <p v-else>Out of stock</p>

    <button v-on:click="seats++">Increase Seat</button>
    <button v-on:click="seats--">Decrease Seat</button>
    <h3>Registration for Vue session</h3>Mode: VCR
    <br />Date: 25th June
    <p>Available Seats: {{seats}}</p>
    <p v-if="seats>10">20 slots available</p>
    <p v-else-if="seats>0 && seats<10">Filling fast</p>
    <p v-else>Seats are full</p>

    <h3>V-for - array of items</h3>
    <hr />
    <h4>Course details</h4>
    <button @click="courses.push('Backbone')">Add New</button>
    <ul>
      <li v-for="(course, index) in courses" v-bind:key="`${course}${index}c`">{{course}}</li>
    </ul>

    <div
      v-for="(author, index) in authors"
      v-bind:key="author.id"
      style="text-align: left;padding:10px; border:1px solid black;"
    >
      <div
        v-for="(key, value) in author"
        v-bind:key="`${key}${index}a`"
      >index:{{index}} value:{{value}} - key: {{key}}</div>
      <span>
        <img :src="author.imgUrl" style="width:50px; height:50px;" />
      </span>
      {{author.name}}
    </div>
    <h3>V-for - Range</h3>
    <hr />
    <h4>Repeating the template</h4>
    <p v-for="(i, index) in 50" v-bind:key="`${i}${index}t`">{{i}} times repeated</p>
    <hr />
    <button v-on:click="inStock = !inStock">View details</button>
    <h3>Vue complete guide</h3>Rs. 560
    <strike>Rs. 1120</strike>50% Off
    <br />Offers: Special price
    <p v-if="inStock">Available</p>
    <p v-else v-bind:class="{content:!inStock}">Sold out</p>
    <div>
      <h3>Applying styles</h3>
      <hr />
      <h4>Binding inline style</h4>
      <div v-bind:style="{color:'red', fontFamily:'arial'}">Inline styles applied</div>
    </div>
    <div>
      <h3>Lifecycle hooks</h3>
      <hr />
      <br />
      <button @click="newHandleClick">Increment</button>
      <h3>Updated: {{count}}</h3>
      <p>Once the destroy button is clicked, Increment will not happen</p>
      <button @click="clear">Destroy</button>
    </div>

    <div :style="{marginLeft:'3%'}">
      <h2>Component global registration</h2>
      <hr />
      <first-cmp></first-cmp>
    </div>
  </div>
</template>
<script>
export default {
  name: "coursePractices",
  data() {
    return {
      show: false,
      inStock: true,
      imgUrl: "../../logo.png",
      products: ["Apple", "Mango", "PineApple"],
      courses: ["Vue", "React", "Angular"],
      location: "Mysore",
      unit: "ETA - UI",
      link: "http://www.google.com",
      count1: 0,
      count2: 0,
      count: 0,
      seats: 0,
      x: "",
      authors: [
        {
          id: 0,
          name: "roopashri_muthaiah",
          imgUrl:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=beautiful-beauty-blue-bright-414612.jpg&fm=jpg"
        },
        {
          id: 1,
          name: "prajila",
          imgUrl:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=beautiful-beauty-blue-bright-414612.jpg&fm=jpg"
        },
        {
          id: 2,
          name: "khalid_hussain",
          imgUrl:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=beautiful-beauty-blue-bright-414612.jpg&fm=jpg"
        },
        {
          id: 3,
          name: "prabhakar_mishra",
          imgUrl:
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=beautiful-beauty-blue-bright-414612.jpg&fm=jpg"
        }
      ]
    };
  },
  methods: {
    handleClick: function(step) {
      // this.x = event.type;
      this.count2 += step;
      this.count1 += step;
    },

    update: function(event) {
      this.x = event.type;
    },
    openLink: function() {
      // console.log("open link");
    },
    click: function() {
      alert("Navigation prevented");
    },

    click1: function() {
      alert("Navigating...");
    },
    // eslint-disable-next-line no-unused-vars
    notify: function(e) {
      // console.log(e);
    },
    newHandleClick: function() {
      this.count++;
    },
    clear: function() {
      this.$destroy();
    }
  },
  beforeCreate() {
    alert("beforeCreate");
  },
  created() {
    alert("Created");
    // console.log("Created", this.count);
  },
  beforeMount() {
    alert("beforeMount");
    // console.log("beforeMount", this.count);
  },
  mounted() {
    alert("mounted");
    // console.log("Mounted", this.count);
  },
  beforeUpdate() {
    alert("beforeUpdate");
  },
  updated() {
    alert("Updated");
  },
  beforeDestroy() {
    alert("beforeDestroy");
  },
  destroyed() {
    alert("destroyed");
  }
};
</script>
<style scoped>
.content {
  color: red;
  font-family: verdana;
  size: 14px;
}
</style>