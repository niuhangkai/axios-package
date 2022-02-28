<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about"> About </router-link>
  </div>

  <router-view />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { getList, login, remove } from "./api/menu/lists";
export default defineComponent({
  setup() {
    // get和post传递参数一致
    // 重复请求自动取消
    // 可配置重试次数和重试间隔时间
    // 配置请求token相关
    // 支持form-data
    /**
     * TODO:
     * 1.路由切换取消全部请，需要写路由拦截取消
     */
    // getList({ pageIndex: 1, pageSize: 10 }).then((res) => {
    //   console.log(res, "res");
    // });
    // remove({ pageIndex: 1, pageSize: 10 }).then((res) => {
    //   console.log(res, "res");
    // });
    login({
      username: "123",
      password: "12323"
    }).then((res) => {
      console.log(res);
    });
    login({
      username: "123",
      password: "12323"
    }).then((res) => {
      console.log(res);
    });
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
