<template>
  <div>
    <guid-selector :title="'User Select'" :options="[]"></guid-selector>
  </div>
</template>

<script>
  import GuidSelector from './GuidSelector'
  import {mapGetters} from 'vuex'
  export default {
    name: 'FormWrapper',
    components: {
      GuidSelector
    }
  }
</script>

<style scoped>

</style>
