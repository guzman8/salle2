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
    <div class="task">
      <div>{{tasks[0].title}}</div>
      <div>{{tasks[0].description}}</div>
      <div>{{tasks[0].priority}}</div>
    </div>
    <div class="task">
      <div>{{tasks[1].title}}</div>
      <div>{{tasks[1].description}}</div>
      <div>{{tasks[1].priority}}</div>
    </div>
    <div class="task">
      <div>{{tasks[2].title}}</div>
      <div>{{tasks[2].description}}</div>
      <div>{{tasks[2].priority}}</div>
    </div>
  </div>
</template>

<style>
  
</style>