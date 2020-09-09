<template>
    <div id="navHeader">
        <Titlebtn type="min" class="el-icon-remove-outline">  
        </Titlebtn>
        <Titlebtn type="max" class="el-icon-circle-plus-outline">
        </Titlebtn>
        <Titlebtn type="close" class="el-icon-circle-close">
        </Titlebtn>
    </div>
</template>
 
<script>
    import Titlebtn from '@/components/navHeader/Titlebtn'

export default {
      name: 'navHeader',
      components: {
        Titlebtn
      }
    }
</script>
    
<style>
#navHeader {
    left: 0;
    position: absolute;
    width: 100%;
    height: 60px;
    background-color: #409EFF;
    -webkit-app-region: no-drag;
    padding: 0;
    margin: 0;
}
</style>