<template>
  <div>
    <h1>Form Entry</h1>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-3">
        <guid-selector :title="'User Select'" :options="SportsList" :control-width="400"></guid-selector>
      </div>
    </div>
  </div>
</template>

<script>
  import GuidSelector from './GuidSelector'
  import {mapGetters} from 'vuex'
  export default {
    name: 'FormWrapper',
    computed: {
      ...mapGetters(['SportsList'])
    },
    components: {
      GuidSelector
    },
    data() {
      return {

      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>

</style>
