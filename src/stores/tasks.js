import { defineStore } from "pinia";
import * as Util from "../globals.js";

export const useTasksStore = defineStore("tasks", {
    state: () => ({
        user: "",
        tasks: [],
        categories: ["Home", "Work", "Social"], // Temporal hardcoded values
        prioritySortType: Util.SortType.DESC,
        priorityValues: [{ id: 1, value: "Low" }, { id: 2, value: "Medium" }, { id: 3, value: "High" }],
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getTaskById: (state) => {
            return (id) => {
                return state.tasks.find((item) => item.id === id);
            };
        },
    },
    actions: {
        toggleSortByPriority() {
            this.prioritySortType = (this.prioritySortType + 1) % Util.SortType.length;
            console.log(`Sorting ${this.prioritySortType == Util.SortType.ASC ? "ASC" : "DESC"}`);

            switch (this.prioritySortType) {
                case Util.SortType.ASC:
                    this.tasks.sort((a, b) => a.tags[0].priority - b.tags[0].priority);
                    break;
                case Util.SortType.DESC:
                    this.tasks.sort((a, b) => b.tags[0].priority - a.tags[0].priority);
                    break;
            }
        },
        save(task) {
            // Saving the task to the API
            // But first of all, 'createdAt' date must be converted again to API's format (ISO 8601)
            // In order to not modify the original object, let's make a deep copy
            let detachedTask = JSON.parse(JSON.stringify(task)); // Deep copy
            detachedTask.createdAt = Util.toISO8601(detachedTask.createdAt);

            // Decide whether the task is new or not
            if (task.id) {
                this.updateTask(detachedTask);
            }
            else {
                this.createTask(detachedTask);
            }
        },
        preProcess(data) {
            console.log(`Raw tasks data from user '${this.user}':`);
            console.log(data);

            data.forEach(task => {
                // Converting ISO date format to local date time for a proper visualization
                task.createdAt = Util.toLocalDateTime(task.createdAt);

                // Giving format to 'tags' array
                // Priority object
                if (!task.tags.includes("priority")) {
                    task.tags[0] = { priority: 1 };    // The lowest priority
                }
                // Categories object
                if (!task.tags.includes("categories")) {
                    task.tags[1] = { categories: [] };
                }
                else {
                    // Aggregating any new category to the main array
                    task.tags[1].categories.forEach(category => {
                        if (!this.categories.includes(category)) {
                            this.categories.push(category);
                        }
                    });
                }

                // Adding tasks to the main tasks array
                this.tasks.push(task);
            });

            // Descending priority order by default
            this.tasks.sort((a, b) => b.tags[0].priority - a.tags[0].priority);

            console.log("Initial tasks data after preprocessing:");
            console.log(this.tasks);
        },
        /** CRUD operations */
        createTask(task) {
            console.log("Create task:")
            console.log(task);
            // POST /users/:username/todos
            try {
                fetch(`${Util.URL}/users/${this.user}/todos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    // Reload of data from the API to ensure the BackEnd has updated data properly
                    // and, in this case, also to get the ID of the new task.
                    .then(() => this.readTasksFromUser(this.user));
            } catch (error) {
                console.log(error);
            }
        },
        updateTask(task) {
            console.log("Update task:")
            console.log(task);
            // PATCH /users/:username/todos/:id
            try {
                fetch(`${Util.URL}/users/${this.user}/todos/${task.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data));
            } catch (error) {
                console.log(error);
            }
        },
        readTasksFromUser(user) {
            // Storing the user into the state
            this.user = user;
            this.task = []; // Emptying the task list

            // GET /users/:username/todos
            try {
                fetch(`${Util.URL}/users/${user}/todos`)
                    .then((response) => response.json())
                    .then((data) => this.preProcess(data));
            } catch (error) {
                console.log(error);
            }
        },
        deleteTasksById(...taskIds) {
            taskIds.forEach((id) => {
                // DELETE /users/:username/todos/:id
                try {
                    fetch(`${Util.URL}/users/${this.user}/todos/${id}`, {
                        method: 'DELETE'
                    })
                        .then((response) => response.json())
                        .then((data) => console.log(data));
                } catch (error) {
                    console.log(error);
                }
            });
        },
    }
});
