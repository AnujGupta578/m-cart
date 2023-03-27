<template>
  <div>
       <div class="container col-8 offset-2 panelpos">
        <div class="card " v-if="submit">
            <div class="card-header" style="font-weight:bold">{{pageTitle}}</div>
            <div class="card-body ">
                <div>
                    <table class="table table-bordered " v-if= "selectedProducts && selectedProducts.length" style="margin-bottom: 0px; margin-right: 0px">
                      <thead class="thead-light text-center">
                        <tr >
                          <th class="center">Product</th>
                          <th class="center">Quantity</th>
                          <th class="center">Price</th>
                          <th class="center">Total Price</th>
                          <th></th>
                        </tr>
                      </thead>
                        <tr v-for='(product, index) of selectedProducts' :key="product.dateOfPurchase" class="text-center">
                          <td class="align-middle">{{product.productName}}</td>
                          <td class="align-middle">
                            <input type="number" id="quant" class="form-control" v-model=product.quantity min="1" max="100" v-on:change="(product.totalPrice = product.price * product.quantity)">
                          </td>
                          <td class="align-middle">{{ product.price | currency }}</td>
                          <td class="align-middle">{{ product.totalPrice | currency}}</td>
                          <td class="align-middle">
                            <a v-on:click="remove(index)">
                              <span title="Delete" class="fa  fa-trash-o"></span>
                            </a>
                          </td>
                        </tr>
                        <tr class="table-secondary">
                          <th class="text-right " colspan="3">Total</th>
                          <td class="text-center" colspan="2"><strong>{{ grandTotal | currency }}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='card-footer'>
                <a class='btn btn-outline-secondary ' v-on:click='onBack()'>
                    <i class='fa fa-shopping-cart'></i> Continue Shopping
                </a>
                <a class='btn btn-outline-secondary  float-right' v-on:click='checkout()'>
                    Checkout  <i class='fa fa-arrow-right'></i>
                </a>
            </div>
        </div>
        <div class="card " v-if="!submit">
          <div class="card-header" style="font-weight:bold">{{pageTitle}}</div>
            <div class="card-body ">
                <div>
                  You have purchased following items. Thank you for making the payment.
                  <br/>Your order will be shipped soon...<br />
                    <table class="table table-bordered " v-if= "selectedProducts && selectedProducts.length" style="margin-bottom: 0px; margin-right: 0px">
                      <thead class="thead-light text-center">
                        <tr >
                          <th class="center">Order Id</th>
                          <th class="center">Product</th>
                          <th class="center">Quantity</th>
                          <th class="center">Price</th>
                          <th class="center">Total Price</th>
                        </tr>
                      </thead>
                        <tr v-for='(product) of selectedProducts' :key="product.dateOfPurchase" class="text-center">
                          <td>{{product.orderId}}</td>
                          <td class="center">{{product.productName}}</td>
                          <td class="center">
                            {{product.quantity }}
                          </td>
                          <td class="center">{{ product.price | currency }}</td>
                          <td class="center">{{ product.totalPrice | currency}}</td>
                        </tr>
                        <tr class="table-secondary">
                          <th class="text-right " colspan="3">Total</th>
                          <td class="text-center" colspan="2"><strong>{{ grandTotal | currency }}</strong></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class='card-footer'>
                <a class='btn btn-outline-secondary  float-right' v-on:click='goBack()'>
                    Go to Products Page  <i class='fa fa-arrow-left'></i>
                </a>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import Router from '../../router/index'

export default {
  name: 'cart',
  data () {
    return {
      pageTitle: 'My Cart',
      selectedProducts: [],
      imageWidth: 50,
      imageMargin: 2,
      grandTotal: 0,
      quantity: 0,
      submit: false
    }
  },
  methods: {
    goBack: function () {
      this.selectedProducts = []
      this.$parent.total = 0
      this.$parent.selectedItems = 0
      Router.push({path: '/products'})
    },
    onBack: function () {
      this.$parent.productService.selectedProducts = this.selectedProducts
      Router.push({path: '/products'})
    },
    remove: function (i) {
      this.selectedProducts.splice(i, 1)
      this.grandTotal = 0
      this.quantity = 0
      for (let i = 0; i < this.selectedProducts.length; i++) {
        this.grandTotal += this.selectedProducts[i].totalPrice
        this.quantity += this.selectedProducts[i].quantity
      }
      sessionStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts))
      sessionStorage.setItem('grandTotal', this.grandTotal)
      sessionStorage.setItem('selectedItems', this.quantity)
    },
    checkout: function () {
      this.submit = false
      this.$parent.productService.selectedProducts = []
      sessionStorage.removeItem('selectedProducts')
    }
  },
  mounted: function () {
    this.submit = true
    this.selectedProducts = this.$parent.productService.selectedProducts
    for (let i = 0; i < this.selectedProducts.length; i++) {
      this.grandTotal += this.selectedProducts[i].totalPrice
      this.quantity += this.selectedProducts[i].quantity
    }
    sessionStorage.setItem('grandTotal', this.grandTotal)
    sessionStorage.setItem('selectedItems', this.quantity)
  },
  beforeDestroy: function () {
  }
}
</script>

<style scoped>
.panelpos{
    position: relative; top: 100px;
}

.paymentpanelpos{
    position: relative;
    top: 150px;
    left: 380px;
    text-align: center;
    width: 43%;
}

</style>
