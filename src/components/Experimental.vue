<template>
<div>
    <span>Hello World</span>
    <div v-if="showOptions">Options</div>
    <div v-if="!showOptions">Not Options</div>
</div>
</template>

<script>
    import {
        mapGetters
    } from 'vuex';
    export default {
        name: 'Experimental',
        computed: {
            ...mapGetters(['DataList'])
        },
        data() {
            return {
                showOptions: false
            }
        },
        created() {
            this.$store.dispatch('setData', ['hello', 'world', 'thing', 'anotherThing'])
        }
    }
</script>

<style scoped lang="scss">

</style>
