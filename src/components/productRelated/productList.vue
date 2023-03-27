<template>
  <div style="padding-bottom: 65px;">
    <nav class='navbar navbar-expand-md navbar-light bg-white fixed-top navbarpos'>
      <div class='container-fluid'>
        <a class='navbar-brand txtcolor'>{{pageTitle}}
          <span class="fa fa-shopping-cart txtcolor"></span>
        </a>
        <div class="input-group float-right col-4 searchboxpos">
          <div class="float-right txtcolor cartpos">
          <span class="fa fa-shopping-cart"></span>
          <a    href="#/cart" class="txtcolor">{{selectedItems}}&nbsp;items</a>
          <span>, {{total | currency }} </span>
        </div>
          <input type="text" class="form-control" placeholder="Search" name="q" v-model="listFilter" v-on:keyup="searchtext" v-on:keyup.delete="delsearchtext">
          <div class="input-group-append">
            <button class="btn btn-outline-success">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class=" carouselpos">
      <div id="carousel-example-generic" class="carousel slide carouselheight" data-ride="carousel" data-interval="3000">
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="./../../../public/imgs/carousel_smart_phone.jpg" alt="First slide" style="min-width:100%;height:350px;">
          </div>

          <div class="carousel-item carouselimgpos">
            <img src="./../../../public/imgs/carousel1.jpg" alt="Second slide" style="min-width:100%;height:350px;">
          </div>

          <div class="carousel-item">
            <img src="./../../../public/imgs/tablet_blue_stylus.jpg" alt="Third slide" style="min-width:100%;height:350px;">
          </div>
        </div>

        <a class="left carousel-control-prev" href="#carousel-example-generic" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </a>
        <a class="right carousel-control-next" href="#carousel-example-generic" role="button" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
      <div class='card bg-white noborder'>
        <div class='card-header noborder bgcolor'>
          <ul class="nav nav-tabs ">
            <li class=" tabpos   ">
              <a href="#tabprimary" v-on:click="tabselect('tablet')" data-toggle="tab" class="nav-item nav-link active">
                <i class="fa fa-tablet fa-3x" aria-hidden="true"></i>
                <div>Tablets</div>
              </a>
            </li>
            <li class="tabpos" >
              <a v-on:click="tabselect('mobile')" href="#tabprimary" data-toggle="tab" class="nav-item nav-link">
                <i class="fa fa-mobile fa-3x" aria-hidden="true"></i>
                <div>Mobiles</div>
              </a>
            </li>
          </ul>
        </div>
        <div class='card-body'>
          <div class="tab-content">
            <div class="tab-pane fade in active show" id="tabprimary">
              <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary ">Filter</button>
                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown">
                  <span class="caret"></span> <span class="sr-only">Toggle Dropdown</span>
                </button>
                <ul class="dropdown-menu multi-column columns-3 noclose">
                  <div class="row vdivide">
                    <div class="col-4">
                      <ul class="multi-column-dropdown noclose">
                        <h4>Manufacturer</h4>
                        <li v-for=" manufac in manufacturers" :key="manufac.id">
                          <input type="checkbox" v-model="manufac.checked" v-on:change="filter(manufac)">
                          <label> {{manufac.id}} </label>
                        </li>
                      </ul>
                    </div>
                    <div class="col-4">
                      <ul class="multi-column-dropdown noclose">
                        <h4>OS</h4>
                        <li v-for="ostypes in os" :key="ostypes.id">
                          <input  type="checkbox" v-model="ostypes.checked" v-on:change="filter(ostypes)">
                          <label> {{ostypes.id}}</label>
                        </li>
                      </ul>
                    </div>
                    <div class="col-4">
                      <ul class="multi-column-dropdown noclose">
                        <h4>Price Range</h4>
                        <li v-for="price in price_range" :key = "price.id">
                          <input type="checkbox" v-model="price.checked" v-on:change=filter(price)>
                          <label>{{ price.id}} </label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ul>
              </div>
              <span v-if="chkmanosprice.length> 0"> {{products.length}} results</span>
              <div class="float-right">
                <select v-model="sortoption" v-on:change="onChange($event.target.value)"  class="form-control">
                  <option value="" selected disabled>Sort By</option>
                  <option value="popularity" >Popularity</option>
                  <option value="pricelh">Price - Low to High</option>
                  <option value="pricehl">Price - High to Low</option>
                </select>
              </div>
              <div v-if='products && products.length' class="row">
                <div class="col-3" v-for='product of filteredProducts' :key="product.productId">
                  <div >
                    <span class="card text-center" style="margin-bottom: 10px;">
                    <div>
                      <img class="card-img-top" :src='product.imageUrl' :title='product.productName'  v-bind:style ="{width : imageWidth + 'px', height : imageHeight+'px', margin : imageMargin+'px'}">
                    </div>
                    <div class="card-body">
                      <div class="caption card-text">
                      <div>
                        <a :href="'#/products/'+product.productId" v-on:click="getProduct(product.productId)"> {{product.productName}} </a>
                      </div>
                      <div>{{ product.price }}</div>
                      <ratings  class="ratingcolor" :rate='product.rating'></ratings>
                      <div>
                        <button v-on:click="addCart(product.productId)" class="btn btn-primary">Add to Cart</button>
                      </div>
                    </div>
                    </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rating from './rating'
export default {
  name: 'productList',
  data () {
    return {
      clickedprod: null,
      rate: null,
      pageTitle: 'mCart',
      imageWidth: 80,
      imageHeight: 120,
      imageMargin: 12,
      showImage: false,
      listFilter: null,
      manufacturers: [
        { 'id': 'Samsung', 'checked': false },
        { 'id': 'Microsoft', 'checked': false },
        { 'id': 'Apple', 'checked': false },
        { 'id': 'Micromax', 'checked': false }
      ],
      os: [
        { 'id': 'Android', 'checked': false },
        { 'id': 'Windows', 'checked': false },
        { 'id': 'iOS', 'checked': false }
      ],
      price_range: [
        { 'id': '3000-5000', 'checked': false },
        { 'id': '13000-15000', 'checked': false },
        { 'id': '19000-35000', 'checked': false },
        { 'id': '40000-70000', 'checked': false }
      ],
      errorMessage: null,
      products: [],
      selectedItems: 0,
      total: 0,
      orderId: 0,
      selectedManufacturers: [],
      selectedOStypes: [],
      selectedPrice: [],
      checkedManufacturers: [],
      checkedOS: [],
      checkedPrice: [],
      sub: null,
      i: 0,
      sortoption: '',
      chkmanosprice: [],
      sortKey: '',
      sortSettings: [
        { 'price': true },
        { 'rating': true }
      ],
      desc: true
    }
  },
  methods: {
    addCart: function (id) {
      this.selectedItems += 1
      var product = this.products.filter(products => products.productId === id)[0]
      this.total += product.price
      var sp = this.$parent.productService.selectedProducts.filter((product) => product.productId === id)[0]
      if (sp) {
        var index = this.$parent.productService.selectedProducts.findIndex((product) => product.productId === id)
        this.$parent.productService.selectedProducts[index].quantity += 1
        this.$parent.productService.selectedProducts[index].totalPrice += product.price
      } else {
        var a = {}
        a.orderId = 'ORD_' + this.orderId
        a.productId = id
        a.userId = sessionStorage.getItem('username')
        a.productName = product.productName
        a.price = product.price
        a.quantity = 1
        a.dateOfPurchase = new Date().toString()
        a.totalPrice = product.price * a.quantity
        this.$parent.productService.selectedProducts.push(a)
        sessionStorage.setItem('selectedProducts', JSON.stringify(this.$parent.productService.selectedProducts))
        this.orderId++
      }
    },
    tabselect: function (producttype) {
      this.$parent.productService.producttype = producttype
      this.getProducts(producttype)
    },
    searchtext: function () {
      this.filteredProducts = this.products.filter((products) => products.manufacturer.toLowerCase().indexOf(this.listFilter) !== -1)
    },
    delsearchtext: function () {
      this.getProducts(this.$parent.productService.producttype)
    },
    getProducts: function (producttype) {
      if (producttype === 'tablet') {
        this.$http.get('./products/tablets.json').then(
          function (response) {
            this.products = response.data
            this.filteredProducts = this.products
          }
        )
      } else if (producttype === 'mobile') {
        this.$http.get('./products/mobiles.json').then(
          function (response) {
            this.products = (response.data)
            this.filteredProducts = this.products
          }
        )
      }
    },
    getProduct: function (id) {
      var getProduct = this.products.filter(products => products.productId === id)[0]
      this.clickedprod = getProduct
      return getProduct
    },
    onChange: function (value) {
      switch (value) {
        case 'popularity':
          this.products.sort(this.orderBy('-rating'))
          break
        case 'pricelh':
          this.products.sort(this.orderBy('price'))
          break
        case 'pricehl':
          this.products.sort(this.orderBy('-price'))
          break
      }
    },
    orderBy: function (property) {
      var sortOrder = 1
      if (property[0] === '-') {
        sortOrder = -1
        property = property.substr(1)
      }
      return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0
        return result * sortOrder
      }
    },
    filter: function () {
      this.filteredProducts = this.products
      var manuList = []
      var osList = []
      // filtering based on manufacturers/ os / price selected
      var manu = this.manufacturers.filter((manufacturers) => manufacturers.checked === true)
      manuList = manu.map(a => a.id)
      var oschecked = this.os.filter((os) => os.checked === true)
      osList = oschecked.map(a => a.id)
      if (manuList.length) {
        this.filteredProducts = this.products.filter((products) => manuList.includes(products.manufacturer))
      }
      if (osList.length) {
        this.filteredProducts = this.products.filter((products) => osList.includes(products.ostype))
      }
      if (!manuList.length && !osList.length) {
        this.filteredProducts = this.products
      }
    }
  },
  created: function () {
    this.orderId++
    // this.products = this.$parent.getProducts()
    this.getProducts(this.$parent.productService.producttype)
    this.filteredProducts = this.products
  },
  mounted: function () {
    this.total = this.$parent.total
    this.selectedItems = this.$parent.selectedItems
    document.getElementById('login').style.display = ''
    document.getElementById('login').innerHTML = 'Logout'
    sessionStorage.setItem('loginTitle', 'Logout')
    document.getElementById('welcome').style.display = ''
    document.getElementById('welcome').style.color = '#ff0080'
    //  // console.log(sessionStorage.getItem('isLoggedIn'))
    this.getProducts(this.$parent.productService.producttype)
  },
  updated: function () {
    this.$parent.total = this.total
    this.$parent.selectedItems = this.selectedItems
  },
  components: {
    'ratings': rating
  }
}
</script>

<style scoped>
thead {
color: #337AB7;
}
.display{
display:'';
}
.row{
margin-top:40px;
padding: 0 10px;
}

.clickable{
cursor: pointer;
}

.head-span {
margin-top: -20px;
font-size: 15px;
}

.heading-color {
background-color: white;
color: #FF00FF;
}

.dropdown-menu.columns-3 {
min-width: 600px;
}
.dropdown-menu li a {
padding: 5px 15px;
font-weight: 300;
}
.multi-column-dropdown {
list-style: none;
}

@media (max-width: 800px) {
.dropdown-menu.multi-column {
min-width: 240px !important;
overflow-x: hidden;
}
}

.caret {
border-top:4px solid magenta;
}

.navbarpos{
background-color: white;
top: 65px;
width:100%
}

.searchboxpos{
position:relative;
top:5px;
}

.cartpos{
position:relative;
top:3px;
padding:8px
}
.carouselpos{
position:relative;
top:60px;
width:100%;
}

.carouselheight{
height:350px;
}

.noborder{
border:0;
}

.bgcolor{
background-color: white;
}

.tabpos{
width: 50%;
text-align: center;
}
</style>
