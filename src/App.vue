<script>
import Task from "./components/Task.vue";
import AppFooter from "./components/AppFooter.vue";

import { useTasksStore } from "./stores/Tasks";

export default {
  setup() {
    const tasksStore = useTasksStore();

    return { tasksStore };
  },
  data() {
    return {
      user: "aleh",
      SortType: { ASC: 0, DESC: 1 },   // Enum
    };
  },
  components: {
    Task,
    AppFooter,
},
  methods: {
    toggleSortBy() {
      // Change button icon
      const button = document.getElementById("sortByInputGroup").getElementsByTagName("button")[0];
      button.title = this.tasksStore.prioritySortType === this.SortType.ASC ? "Sort ascending" : "Sort descending";

      // Call proper sorting methods
      // TODO: Do it not only by priority
      this.tasksStore.toggleSortByPriority();
    }
  },
  // Livecycle events
  created() {
    console.log("Retrieving data from API or DB");
    this.tasksStore.readTasksFromUser(this.user);
  },
};
</script>

<template>
  <div class="grid-container">
    <header>Tasks of {{ user }}</header>
    <!-- <main> -->
    <!-- Incompatible with grid layout -->
    <section id="categories">Categories</section>
    <section id="options">
      <div class="btn-toolbar btn-toolbar-sm" role="toolbar" aria-label="Toolbar of options">
        <div class="btn-group ms-3 me-2" role="group" aria-label="Add or Delete">
          <button type="button" class="btn btn-success" title="Add task" @click="tasksStore.createTask()">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-plus"
              viewBox="0 0 16 16">
              <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
              <path
                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
            </svg>
          </button>
          <button type="button" class="btn btn-danger" title="Delete task">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-trash"
              viewBox="0 0 16 16">
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path fill-rule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>
          </button>
        </div>

        <div id="searchByInputGroup" class="input-group input-group-sm me-auto w-50">
          <label class="input-group-text" aria-label="Search by">Search by</label>
          <select class="form-select" aria-label="Select field to search by">
            <option selected>Title</option>
          </select>
          <input type="text" class="w-50 form-control" placeholder="Type something & press Enter"
            aria-label="Type something and press Enter">
        </div>

        <div id="sortByInputGroup" class="input-group input-group-sm me-3" role="group" aria-label="Sort by">
          <label class="input-group-text">Sort by</label>
          <select class="form-select" aria-label="Select field to sort by">
            <option selected>Priority</option>
          </select>
          <button type="button" class="btn btn-warning" @click="toggleSortBy()" title="Sort ascending">
            <svg v-if="tasksStore.prioritySortType === SortType.ASC" xmlns="http://www.w3.org/2000/svg" width="16"
              height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-caret-up-fill" viewBox="0 0 16 16">
              <path
                d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
    <section id="tasks">
      <Task v-for="task in tasksStore.tasks" :key="task.id" :initialTask="task" />
    </section>
    <!-- </main> -->
    <footer>
      <AppFooter />
    </footer>
  </div>
</template>

<style>
/* Opens Sans as main font */
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
html, body {
  font-family: "Open Sans", sans-serif;
}
#app {
  font-family: 'Open Sans', sans-serif;
}

header {
  grid-area: header;
}

#categories {
  grid-area: categories;
}

#options {
  grid-area: options;
}

#tasks {
  grid-area: main;
  overflow: scroll;
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
    'categories footer';
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