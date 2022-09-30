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
    <div class="task" v-for="task in tasks">
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
.task {
  border: 1px dotted black;
  border-radius: 10px;
  /*width: 300px;*/
  display: flex;
  margin-bottom: 2px;
  padding: 5px;
}

.task-title {
  display: block;
  font-weight: bold;
  font-size: x-small;
  font-style: italic;
}

.task-description {
  display: block;
  color: darkgrey;
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