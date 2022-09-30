<script>
export default {
  data() {
    return {
      tasks: [{ title: "Title 1", description: "Description 1", priority: "high" },
      { title: "Title 2", description: "Description 2", priority: "medium" },
      { title: "Title 3", description: "Description 3", priority: "low" }]
    };
  },

  beforeMount() {
    console.log("The app has NOT BEEN MOUNTED yet and the name is: ");
  },
};
</script>
    
<template>
  <div id="header"></div>
  <div id="body">
    <div class="task" v-for="(task, index) in tasks" :key="index">
      <span><input type="checkbox" name="selected" class="selection"></span>
      <span>
        <input v-model="task.title" placeholder="{{task.title}}" class="task-title">
        <input v-model="task.description" placeholder="{{task.description}}" class="task-description">
      </span>
      <span>
        <select v-model="task.priority" placeholder="{{task.priority}}" class="task-priority"></select>
      </span>
    </div>
  </div>
</template>

<style>
body {
  width: 300px;
  margin: 0 auto;
}

.task {
  border: 1px solid black;
  border-radius: 10px;
  /*width: 300px;*/
  display: flex;
  margin-bottom: 2px;

}

.task-title {
  display: block;
  font-weight: bold;
  font-size: x-small;
  font-style: italic;
}

.task-description {
  display: block;
  color: #4F4F4F;
}

.task-priority {
  /*float: right;*/
}

.selection {
  border-radius: 50%;
  border: 1px solid #ddd;
  outline: none;
  appearance: none;
  width: 2em;
  height: 2em;
  cursor: pointer;
  margin: 5px;
}

input {
  border: 0;
}
</style>