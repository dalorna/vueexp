<template>
  <div>
    Let's do some reveal
  </div>
</template>

<script>
  import Reveal from 'reveal.js/js/reveal.js';
  // import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
  export default {
    name: 'Reveal',
    data() {
      return {};
    },
    methods: {
    },
    created() {
    },
    mounted() {
      Reveal.initialize({});
    }

  }
</script>

<style lang="scss" scoped>
@import '../../node_modules/reveal.js/dist/reveal.css';
@import '../../node_modules/reveal.js/dist/theme/white.css';
</style>
