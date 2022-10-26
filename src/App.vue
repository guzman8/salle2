<script>

import { useTasksStore } from "./stores/tasks";
import AppFooter from "./components/AppFooter.vue";
import Login from "./components/Login.vue"
import TasksList from "./components/TasksList.vue"

export default {
  setup() {
    const tasksStore = useTasksStore();

    return { tasksStore };
  },
  components: {
    Login,
    TasksList,
    AppFooter,
  },
};
</script>

<template>
  <div class="grid-container">
    <header id="header" v-if="tasksStore.logged">Tasks of {{ tasksStore.user }}</header>
    <header id="header" v-else>Welcome to the task manager</header>
    <!-- <main> -->
    <!-- Incompatible with grid layout -->

      <router-view class="grid_bla"></router-view>

    <!-- </main> -->
    <footer id="footer">
      <AppFooter />
    </footer>
  </div>
</template>

<style>
#header {
  grid-area: header;
}

#footer {
  grid-area: footer;
}

#options{
  grid-area: options;
}

#main{
  grid-area: main;
  overflow: scroll;
}

#folder{
  grid-area: folder;
}

.grid-container {
  width: 100%;
  grid-template-rows: 1fr 1fr 7fr 1fr;
  grid-template-columns: 2fr 5fr;
  display: grid;
  grid-template-areas:
    'header header'
    'options options'
    'folder main'
    'footer footer';
  padding: 1px;
  gap: 1px;
  background-color: #b6b8b9;
  height: 100vh;
}

.grid-container :is(header, section) {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
</style>