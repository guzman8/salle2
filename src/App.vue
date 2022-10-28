<script>
// Components & Views
import AppHeader from "./components/AppHeader.vue";
import Login from "./views/Login.vue"
import TasksList from "./views/TasksList.vue"
import AppFooter from "./components/AppFooter.vue";

export default {
  data() {
    return {
    };
  },
  components: {
    AppHeader,
    Login,
    TasksList,
    AppFooter,
  },
};
</script>

<template>
  <div class="grid-container">
    <header>
      <AppHeader />
    </header>

    <router-view></router-view>

    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<style>
/* Opens Sans as main font */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

html,
body {
  font-family: "Open Sans", sans-serif;
}

#app {
  font-family: 'Open Sans', sans-serif;
}

header {
  grid-area: header;
  align-items: end;
}

footer {
  grid-area: footer;
}

.grid-container {
  width: 100%;
  grid-template-rows: auto 1fr 7fr auto;
  grid-template-columns: 2fr 5fr;
  display: grid;
  grid-template-areas:
    'header header'
    'categories options'
    'categories main'
    'footer footer';
  padding: 0px;
  gap: 0px;
  background-color: #b6b8b9;
  height: 100vh;
}

.grid-container :is(section) {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;  /* Beware! It affects task's checkbox size and affects the layout of its elements */
}
</style>