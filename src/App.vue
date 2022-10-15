<script>
import Task from "./components/task.vue";
import { useTasksStore } from "./stores/tasks";

export default {
  setup() {
    const tasksStore = useTasksStore();

    return { tasksStore };
  },
  data() {
    return {      
      add: false
    };
  },
  components: {
    Task,
  },

  created() {
    console.log("Retrieving data from API or DB (not implemented)");
  },
};
</script>

<template>
  <div class="grid-container">
    <div class="header">My tasks</div>
    <div class="menu">Task folders</div>
    <div class="tasks">
      <task v-for="task in tasksStore.tasks" :key="task.id" :id="task.id" :title="task.title" :description="task.description"
        :priority="task.priority" :dueDate="task.dueDate" :isCompleted="task.isCompleted" />
    </div>
    <div class="users">users</div>
    <div class="footer">@Salle limited inc</div>
    <div class="options">
      <button>add</button>
      <button>delete</button>
      <button>search</button>
      <input placeholder="criteria">
      <button @click="tasksStore.changeSortType()">sort</button>
    </div>
  </div>
</template>

<style>
.header {
  grid-area: header;
}

.menu {
  grid-area: menu;
}

.tasks {
  grid-area: main;
  overflow: scroll;
}

.users {
  grid-area: right;
}

.footer {
  grid-area: footer;
}

.options {
  grid-area: options;
}

.grid-container {
  width: 100%;
  grid-template-rows: 1fr 1fr 7fr 1fr;
  grid-template-columns: 1.5fr 3fr 2fr;
  display: grid;
  grid-template-areas:
    'header header header'
    'menu options right'
    'menu main right'
    'menu footer footer';
  gap: 10px;
  background-color: #b6b8b9;
  padding: 10px;
  height: 100vh;
}

.grid-container>div {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  font-size: 30px;
}
</style>