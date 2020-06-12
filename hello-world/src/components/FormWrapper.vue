<template>
  <div>
    <h1>Form Entry</h1>
    <div class="row">
      <div class="col-1"></div>
      <div class="col-3">
        <guid-selector :title="'User Select'" :options="SportsList" :control-width="400" :is-single="false" :disabled="disableControl"></guid-selector>
      </div>
      <div class="col-1"></div>
      <div class="col-1">
        <button type="button" class="btn btn-outline-primary" v-on:click="changeDisabled">Disable</button>
      </div>
    </div>
    <div class="row">

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
        disableControl: false
      }
    },
    methods: {
      changeDisabled() {
        this.disableControl = !this.disableControl;
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>

</style>
