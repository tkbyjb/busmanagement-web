<template>
    <div>
        <el-container>
            <keep-alive>
            <Menu />
            </keep-alive>
            <el-container direction="vertical">
                <keep-alive>
                <Top />
                </keep-alive>
                <keep-alive include="HomeContent">
                    <router-view></router-view>
                </keep-alive>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import Top from '../components/Top.vue'


export default {
    name: 'Home',
    components: {
        Menu,
        Top
    },
    mounted() {
        if(window.name == 1){
            window.name = 0;
            this.$router.go(0);
        }
    }
}
</script>

<style scoped>

</style>
