<script>
import Task from "./components/task.vue";

export default {
  components: {
    Task,
  },
  data() {
    return {
      tasks: [
        { id: 0, title: "Title 1", description: "Description 1", priority: "3", dueDate: "2018-06-12T07:30", isCompleted: false },
        { id: 1, title: "Title 2", description: "Description 2", priority: "2", dueDate: "2018-07-12T19:30", isCompleted: false },
        { id: 2, title: "Title 3", description: "Description 3", priority: "1", dueDate: "2018-07-12T19:30", isCompleted: false },
        { id: 5, title: "Title 6", description: "Description 6", priority: "3", dueDate: "2018-08-12T19:30", isCompleted: false },
        { id: 3, title: "Title 4", description: "Description 4", priority: "1", dueDate: "2018-09-12T19:30", isCompleted: false },
        { id: 4, title: "Title 5", description: "Description 5", priority: "0", dueDate: "2018-12-12T19:30", isCompleted: false }],
    };
  },

  beforeMount() {
    console.log("Retrieving data from API or DB (not implemented)");
  },
};
</script>

<template>
  <div class="grid-container">
    <div class="header">My tasks</div>
    <div class="menu">Task folders</div>
    <div class="tasks">
      <task v-for="task in tasks" :key="task.id" :id="task.id" :title="task.title" :description="task.description"
        :priority="task.priority" :dueDate="task.dueDate" :isCompleted="task.isCompleted" />
    </div>
    <div class="users">users</div>
    <div class="footer">@Salle limited inc</div>
    <div class="options">Add task / Delete selected tasks</div>
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
  grid-template-rows: 50px 50px 1fr 50px;
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