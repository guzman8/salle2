<script>
export default {
  props: {
    id: Number,
    title: String,
    description: String,
    priority: Number,
    dueDate: String,
    isCompleted: Boolean
  },
  data() {
    return {
      priorityValues: [{ id: 0, value: "(none)" }, { id: 1, value: "Low" }, { id: 2, value: "Medium" }, { id: 3, value: "High" }],
      isEditionEnabled: false
    };
  },
  methods: {
    toggleEditable(id) {
      this.isEditionEnabled = !this.isEditionEnabled;

      // Enables/Disables priority selector
      const prioritySelector = document.getElementById("priority_" + id);
      prioritySelector.disabled = !this.isEditionEnabled;
      
      // Enables/Disables due date selector
      const dueDateSelector = document.getElementById("due_date_" + id);
      dueDateSelector.disabled = !this.isEditionEnabled;

      // Enables/Disables Title field
      const title = document.getElementById("title_" + id);
      title.disabled = !this.isEditionEnabled;

      // Enables/Disables Description field
      const description = document.getElementById("description_" + id);
      description.disabled = !this.isEditionEnabled;
    }
  }
};
</script>
    
<template>
  <div :id="'task_' + id" :class="['container-fluid', 'task', 'priority-' + priority]">
    <div class="row mb-2 align-items-center">
      <!-- Task selection checkbox -->
      <div class="col-auto">
        <input class="form-check-input task-selection" type="checkbox" name="selected" :id="id">
      </div>
      <!-- Priority selector -->
      <div class="col-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <span class="input-group-text">Priority</span>
          <select class="form-select form-select-sm" v-model="priority" :id="'priority_' + id" disabled>
            <option v-for="(priority) in priorityValues" :value="priority.id">{{priority.value}}</option>
          </select>
        </div>
      </div>
      <!-- Due date selector -->
      <div class="col-auto me-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <span class="input-group-text">Due date</span>
          <input type="datetime-local" class="form-control form-control-sm" v-model="dueDate" :id="'due_date_' + id" disabled>
        </div>
      </div>
      <!-- Edit button -->
      <div class="col-auto">
        <button type="button" class="btn btn-light btn-sm active" data-bs-toggle="button" aria-label="Edit"
          @click="toggleEditable(id)">
          <div v-if="isEditionEnabled === false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
            Edit
          </div>
          <div v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save"
              viewBox="0 0 16 16">
              <path
                d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
            Save
          </div>
        </button>
      </div>
    </div>

    <div class="row mb-2">
      <!-- Title and description of the task -->
      <div class="col-12 task-body">
        <input class="form-control form-control-sm task-title" v-model="title" :id="'title_' + id" :placeholder="title"
          required disabled>
        <textarea class="form-control task-description" v-model="description" :id="'description_' + id"
          :placeholder="description" disabled></textarea>
      </div>
    </div>
  </div>
</template>

<style>
.priority-1 {
  background-color: #c0fbc0;
}

.priority-2 {
  background-color: #ffffe0;
}

.priority-3 {
  background-color: #f6b4b4;
}

.task {
  border: 1px solid #4F4F4F;
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
}

.task-title {
  font-weight: bold !important;
  margin-bottom: 3px;
}

.task-description {
  color: #4F4F4F;
  border: 1px solid #f2f2f2;
  border-radius: 3px;
}

.task-priority {
  font-size: x-small;
}

.task-priority>select {
  font-size: x-small;
}
</style>