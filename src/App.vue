<script >
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "./stores/counter";
import "bootstrap/dist/css/bootstrap.min.css";
import { mapState, mapActions } from "pinia";
import AppMenu from "./components/AppMenu.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  components: {
    AppMenu,
    AppFooter,
  },
  methods: {
    ...mapActions(useCounterStore, ["loadData"]),
  },
  mounted() {
    this.loadData();
  },
};
</script>

<template>
  <header>
    <AppMenu></AppMenu>
  </header>
  <router-view></router-view>
  <AppFooter></AppFooter>
</template>


