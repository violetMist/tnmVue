<template>
    <div></div>
</template>
<script>
    require('../assets/less/iconfont/iconfont.css');
    require('../assets/less/CV.less');

    export default {
        ready () {
            setTimeout(() => {
                this.$route.router.go({name: 'line'});
            }, 0);
        }
    }
</script>