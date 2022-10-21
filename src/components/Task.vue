<script>
import { useTasksStore } from "../stores/tasks";

export default {
  setup() {
    const tasksStore = useTasksStore();

    return { tasksStore };
  },
  props: {
    initialTask: {
      id: {
        type: Number,
        required: true
      },
      author: { // User
        type: String,
        required: true
      },
      text: { // Title
        type: String,
        required: true
      },
      description: String,
      tags: Array,
      createdAt: String,
      completed: Boolean  // if not defined: false
    }
  },
  computed: {
  },
  methods: {
    toggleEdition(id) {
      this.isEditionDisabled = !this.isEditionDisabled;

      // Enables/Disables Priority selector
      const prioritySelector = document.getElementById("priority_" + id);
      prioritySelector.disabled = this.isEditionDisabled;

      // Enables/Disables Created At selector
      const createdAtSelector = document.getElementById("created_at_" + id);
      createdAtSelector.disabled = this.isEditionDisabled;

      // Enables/Disables Categories selector
      const categoriesSelector = document.getElementById("categories_" + id);
      categoriesSelector.disabled = this.isEditionDisabled;

      // Enables/Disables Title field
      const title = document.getElementById("title_" + id);
      title.disabled = this.isEditionDisabled;

      // Enables/Disables Description field
      const description = document.getElementById("description_" + id);
      description.disabled = this.isEditionDisabled;
    },
    save(task) {
      // Disabling controls of the given task
      this.toggleEdition(task.id);

      // Saving task's data to the store
      this.tasksStore.save(task);
    },
    add(task) {
      // Enabling controls of the given task
      this.toggleEdition(task.id);

      // Saving the new task to the store
      this.tasksStore.add(task);
    }
  },
  data() {
    return {
      task: {
        id: this.initialTask.id,
        author: this.initialTask.author.trim(),
        text: this.initialTask.text.trim(),
        description: this.initialTask.description.trim(),
        tags: this.initialTask.tags,
        createdAt: this.initialTask.createdAt,  // It must be in local date time format
        completed: this.initialTask.completed,
      },
      isEditionDisabled: true, // Initial state: tasks can't be edited
    }
  }
};
</script>
    
<template>
  <div :id="'task_' + task.id" :class="['container-fluid', 'task', 'priority-' + task.tags[0].priority]">
    <div class="row mb-2 align-items-center">
      <!-- Task selection checkbox -->
      <div class="col-auto">
        <input class="form-check-input task-selection" type="checkbox" name="selected" :id="task.id">
      </div>

      <!-- Priority selector -->
      <div class="col-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Priority</label>
          <select class="form-select form-select-sm x-small" v-model="task.tags[0].priority" :id="'priority_' + task.id"
            disabled>
            <option selected>Choose...</option>
            <option v-for="priority in this.tasksStore.priorityValues" :value="priority.id">{{priority.value}}</option>
          </select>
        </div>
      </div>

      <!-- Creation date selector -->
      <div class="col-auto me-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Created at</label>
          <input type="datetime-local" class="form-control form-control-sm x-small" v-model.lazy="task.createdAt"
            :id="'created_at_' + task.id" disabled>
        </div>
      </div>

      <!-- Categories selector -->
      <div class="col-auto me-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Categories</label>
          <select class="form-select form-select-sm x-small" v-model="task.tags[1].categories"
            :id="'categories_' + task.id" disabled>
            <option selected>Choose...</option>
            <option v-for="category in this.tasksStore.categories" :value="category">{{category}}</option>
          </select>
        </div>
      </div>

      <!-- Edit button -->
      <div class="col-auto">
        <div v-if="isEditionDisabled">
          <button type="button" class="btn btn-light btn-sm active" data-bs-toggle="button" aria-label="Edit task"
            @click="toggleEdition(task.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
            Edit
          </button>
        </div>
        <div v-else>
          <button type="button" class="btn btn-light btn-sm" data-bs-toggle="button" aria-label="Save task"
            @click="save(task)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save"
              viewBox="0 0 16 16">
              <path
                d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
            Save
          </button>
        </div>
      </div>
    </div>

    <div class="row mb-2">
      <!-- Title and description of the task -->
      <div class="col-12 task-body">
        <input class="form-control form-control-sm task-title" v-model.lazy="task.text" :id="'title_' + task.id"
          :placeholder="task.text" required disabled>
        <textarea class="form-control task-description" v-model.lazy="task.description" :id="'description_' + task.id"
          :placeholder="task.description" disabled></textarea>
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

.x-small {
  font-size: 0.7rem !important;
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
</style>