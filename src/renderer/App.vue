<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "my-project",
    created() {
        // this.$http.get('/api/hello').then(res => {
        //     console.log(22222);
        //     console.log(res);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    }
}
</script>

<style>
/* CSS */
html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
</style>
