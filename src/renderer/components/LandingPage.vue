<template>
  <div>
      <div class="top"><targetList/></div>
      <div class="bottom"><browser/></div>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import TargetList from './TargetList/TargetList'
  import Browser from './Browser/Browser'

  export default {
    name: 'landing-page',
    components: {
      SystemInformation,
      TargetList,
      Browser
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  body { font-family: 'Source Sans Pro', sans-serif; }

  * {
  margin:0;
  padding:0;
  }
  .top {
    height: 30%;
    width: 100%;
    background-color:azure;
  }

  .bottom {
    height: 70%;
    width: 100%;
    background-color:azure;
  }
</style>
