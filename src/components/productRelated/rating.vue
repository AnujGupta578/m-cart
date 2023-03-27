<template>
  <div>
    <span v-for=" r of range" :key="r">
      <i class="fa" :class=" (r <= rate) ? 'fa fa-star' : 'fa fa-star-o'"> </i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'rating',
  props: ['rate'],
  data: function () {
    return {
      counter: this.rate,
      range: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    round: function () {
      return Math.round(this.counter)
    }
  }
}
</script>

<style>
</style>
