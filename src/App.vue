<script>
export default {
  data() {
    return {
      tasks: [
        { title: "Title 1", description: "Description 1", priority: "high", completed: false },
        { title: "Title 2", description: "Description 2", priority: "medium", completed: false },
        { title: "Title 3", description: "Description 3", priority: "low", completed: false }]
    };
  },

  beforeMount() {
    console.log("Retrieving data from API or DB");
  },
};
</script>
    
<template>
  <div id="header"></div>
  <div id="body">
    <div class="task" v-for="(task, index) in tasks" :key="index">
      <span>
        <input type="checkbox" name="selected" class="task-selection">
      </span>
      <span class="task-body">
        <input v-model="task.title" placeholder="{{task.title}}" class="task-title">
        <input v-model="task.description" placeholder="{{task.description}}" class="task-description">
      </span>
      <span>
        <select v-model="task.priority" class="task-priority" title="Priority">
          <option>(none)</option>
          <option>low</option>
          <option>medium</option>
          <option>high</option>
        </select>
      </span>
    </div>
  </div>
</template>

<style>
body {
  display: flex;
  align-items: center;
}

span {
  margin: 3px;
}

.task {
  border: 1px solid black;
  border-radius: 10px;
  /*width: 300px;*/
  display: flex;
  margin-bottom: 2px;
}

.task-body {
  width: 300px;
}

.task-title {
  display: block;
  font-weight: bold;
  font-size: x-small;
  font-style: italic;
  margin-top: 5px;
  margin-bottom: 3px;
  width: 100%;
}

.task-description {
  display: block;
  color: #4F4F4F;
  width: 100%;
}

.task-priority {
  /*float: right;*/
  font-size: x-small;
}

.task-selection {
  border-radius: 50%;
  border: 1px solid #ddd;
  /* outline: none;
  appearance: none; */
  width: 2em;
  height: 2em;
  cursor: pointer;
  margin: 10px;
}

input {
  border: 0;
}
</style>