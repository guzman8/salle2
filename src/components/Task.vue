<script>
import { useTasksStore, Task } from "../stores/tasks";

export default {
  setup() {
    const tasksStore = useTasksStore();

    return { tasksStore };
  },
  props: {
    initialTask: Task,
  },
  data() {
    return {
      task: { ...this.initialTask },
    }
  },
  computed: {
  },
  methods: {
    setEdition(isEditable) {
      //console.log(`setEdition(${this.task.id}) to '${isEditable}''`);
      if (this.completed) {
        console.log("The task is already completed, so can't be edited.")

        return;
      }

      this.task.isEditionEnabled = isEditable;

      // Enables/Disables Priority selector
      const prioritySelector = document.getElementById("priority_" + this.task.id);
      prioritySelector.disabled = !isEditable;

      // Enables/Disables Created At selector
      const createdAtSelector = document.getElementById("created_at_" + this.task.id);
      createdAtSelector.disabled = !isEditable;

      // Enables/Disables Categories selector
      const categoriesSelector = document.getElementById("categories_" + this.task.id);
      categoriesSelector.disabled = !isEditable;

      // Enables/Disables Completion checkbox
      const completionCheckbox = document.getElementById("completed_" + this.task.id);
      completionCheckbox.disabled = !isEditable;

      // Enables/Disables Title field
      const title = document.getElementById("title_" + this.task.id);
      title.disabled = !isEditable;

      // Enables/Disables Description field
      const description = document.getElementById("description_" + this.task.id);
      description.disabled = !isEditable;
    },
    save() {
      // Disabling controls
      this.setEdition(false);

      // Saving task's data to the store
      this.tasksStore.save(this.task);
    },
    selectTask(event) {
      this.tasksStore.setSelected(this.task.id, event.target.checked);
    },
    markTaskAsCompleted(event) {
      this.tasksStore.setCompleted(this.task.id, event.target.checked);
    }
  },
  mounted() {
    if (!this.task.isEditionEnabled) {
      this.setEdition(false);
    }
  }
};
</script>
    
<template>
  <form :id="'task_' + task.id"
    :class="['container-fluid', 'task', 'priority-' + task.tags[0].priority, task.isEditionEnabled && 'editable']">
    <div class="row mb-2 align-items-center">
      <!-- Task selection checkbox -->
      <div class="col-auto">
        <input class="form-check-input" type="checkbox" name="selected" :id="task.id"
          v-model="task.isSelected" @change="selectTask($event)">
      </div>

      <!-- Priority selector -->
      <div class="col-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Priority</label>
          <select class="form-select form-select-sm x-small" v-model="task.tags[0].priority"
            :id="'priority_' + task.id">
            <option selected>Choose...</option>
            <option v-for="priority in tasksStore.priorityValues" :value="priority.id">{{ priority.value }}</option>
          </select>
        </div>
      </div>

      <!-- Creation date selector -->
      <div class="col-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Created at</label>
          <input type="datetime-local" class="form-control form-control-sm x-small" v-model.lazy="task.createdAt"
            :id="'created_at_' + task.id">
        </div>
      </div>

      <!-- Categories selector (TODO made it multiselection, adapting the store to it) -->
      <div class="col-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Categories</label>
          <select class="form-select form-select-sm x-small" v-model="task.tags[1].categories"
            :id="'categories_' + task.id">
            <option selected>Choose...</option>
            <option v-for="category in this.tasksStore.categories" :value="category">{{ category }}</option>
          </select>
        </div>
      </div>

      <!-- Completion check -->
      <div class="col-auto me-auto">
        <div class="input-group flex-nowrap input-group-sm">
          <label class="input-group-text x-small">Completed</label>
          <input class="form-check-input x-small-checkbox mt-0" type="checkbox" name="selected" :id="'completed_' + task.id"
            v-model="task.completed" @change="markTaskAsCompleted($event)">
        </div>
      </div>

      <!-- Edit button -->
      <div class="col-auto">
        <div v-if="!task.isEditionEnabled">
          <button type="button" class="btn btn-light btn-sm active" data-bs-toggle="button" aria-label="Edit task"
            @click="setEdition(true)">
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
            @click="save()">
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
        <!-- Notice that this field is required! -->
        <input class="form-control form-control-sm task-title w-50" v-model.lazy="task.text" :id="'title_' + task.id"
          :placeholder="task.text" required>
        <textarea class="form-control task-description" v-model.lazy="task.description" :id="'description_' + task.id"
          :placeholder="task.description"></textarea>
      </div>
    </div>
  </form>
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

.x-small-checkbox {
  height: 1.7rem !important;
  width: 1.7rem !important;
}

.task {
  border: 1px solid #b6b8b9;
  border-radius: 15px;
}

.editable,
.editable * {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    border-color: yellow;
  }
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