<template>
    <div >
       <div class="container col-6 offset-3" style="top: 120px">
        <div class="card  ">
            <div class="card-header" style="font-weight:bold">{{pageTitle}}</div>
            <div class="card-body text-center">
                <div>
                    <table class="table table-striped tablebgcolor" v-if= "product">
                        <tr>
                            <td align="center">
                                <img :src="product.imageUrl" v-bind:style ="{width : imageWidth + 'px',  margin : imageMargin+'px'}" class='img-thumbnail'/>
                            </td>
                            <td>
                                <div class="txtsize txtcolor">{{product.productName}}</div>
                                    <div>by {{product.manufacturer}}</div>
                                <div>
                                    <ratings class="ratingcolor" :rate='product.rating'></ratings>
                                </div>
                                <hr class="hrcolor">
                                <div>Price: {{product.price}}</div>
                                <div>Description: {{product.description}}</div>
                            </td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='card-footer'>
                <a class='btn btn-outline-secondary backbtnpos' v-on:click='onBack()'>
                    <i class='fa fa-arrow-left'></i> Back
                </a>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Router from '../../router/index'
import rating from './rating'
export default {
  name: 'productDetail',
  props: ['id'],
  data () {
    return {
      pageTitle: 'Product Detail',
      imageWidth: 100,
      imageMargin: 2,
      prodId: this.id,
      prod: [],
      product: {}
    }
  },
  methods: {
    getProducts: function (producttype) {
      var id = Number(this.prodId)
      if (producttype === 'tablet') {
        this.$http.get('./products/tablets.json').then(
          function (response) {
            this.prod = response.data
            this.product = this.prod.filter(prod => prod.productId === id)[0]
          }
        )
      } else if (producttype === 'mobile') {
        this.$http.get('./products/mobiles.json').then(
          function (response) {
            this.prod = (response.data)
            this.product = this.prod.filter(prod => prod.productId === id)[0]
          }
        )
      }
    },
    onBack: function () {
      Router.push({path: '/products'})
    }
  },
  mounted: function () {
    this.getProducts(this.$parent.productService.producttype)
  },
  components: {
    'ratings': rating
  }
}
</script>

<style scoped>
.tablebgcolor{
    background-color: none;
}

.txtsize{
    font-size: 20px;
}

.hrcolor{
    background-color: #ff0080;
}

.backbtnpos{
    width: 90px;
}
</style>
