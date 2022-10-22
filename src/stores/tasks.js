import { defineStore } from "pinia";

const SortType = { ASC: 0, DESC: 1 };   // Enum
// The enum-like types in JS has no length property, so: Object.keys(SortType).length
SortType.length = Object.keys(SortType).length;

const URL = "https://todos-mpwar.herokuapp.com";

export const useTasksStore = defineStore("tasks", {
    state: () => ({
        tasks: [],
        filteredTasks: [],
        sortType:0,
        categoria: "tot",
        categories: ["tot","casa", "trabajo", "universidad"],
        prioritySortType: SortType.DESC,
        priorityValues: [{ id: 1, value: "Low" }, { id: 2, value: "Medium" }, { id: 3, value: "High" }],
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getTaskById: (state) => {
            return (id) => {
                return state.tasks.find((item) => item.id === id);
            };
        },
        getCategories: (state) => state.categories,
    },
    actions: {
        changeCategoria(cat){
            this.categoria=cat;
            this.sortCategoria();
        },
        sortCategoria(){

            this.filteredTasks = this.tasks.filter(task => task.tags[1].categories == this.categoria || this.categoria=="tot");

            

        },
        toggleSortByPriority() {
            this.prioritySortType = (this.prioritySortType + 1) % SortType.length;
            console.log(`Sorting ${this.prioritySortType == 0 ? "ASC" : "DESC"}`);

            switch (this.prioritySortType) {
                case SortType.ASC:
                    this.tasks.sort((a, b) => a.tags[0].priority - b.tags[0].priority);
                    this.filteredTasks.sort((a, b) => a.tags[0].priority - b.tags[0].priority);
                    break;
                case SortType.DESC:
                    this.tasks.sort((a, b) => b.tags[0].priority - a.tags[0].priority);
                    this.filteredTasks.sort((a, b) => b.tags[0].priority - a.tags[0].priority);
                    break;
            }
            
        },
        deleteTaskByIds(...taskIds) {
            let filteredTasks = this.tasks.filter(task => !taskIds.includes(task.id));
            this.tasks = filteredTasks;
        },
        changeSortType(){
            this.sortType = (this.sortType+1)%3;
            console.log(this.sortType);
            switch (this.sortType){
              case 0:
                break;
              case 1:
                this.nonFilteredTasks.sort((a,b) => {
                  return a.priority.localeCompare(b.priority);
                });
                break;
              case 2:
                this.nonFilteredTasks.sort((a,b) => {
                  return b.priority.localeCompare(a.priority);
                });
                break;
            }
        },
        save(task) {
            // Saving the task to the API
            // But first of all, 'createdAt' date must be converted again to API's format (ISO 8601)
            // In order to not modify the original object, let's make a deep copy
            let detachedTask = JSON.parse(JSON.stringify(task)); // Deep copy
            detachedTask.createdAt = this.toISO8601(detachedTask.createdAt);

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
                task.createdAt = this.toLocalDateTime(task.createdAt);

                // Giving format to 'tags' array
                // Priority object
                if (!task.tags.includes("priority")) {
                    task.tags[0] = { priority: 1 };    // The lowest priority
                }
                // Categories object
                if (!task.tags.includes("categories")) {
                    task.tags[1] = { categories: "tot" };
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
                fetch(`${URL}/users/${this.user}/todos`, {
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
                fetch(`${URL}/users/${this.user}/todos/${task.id}`, {
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
                fetch(`${URL}/users/${user}/todos`)
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
                    fetch(`${URL}/users/${this.user}/todos/${id}`, {
                        method: 'DELETE'
                    })
                        .then((response) => response.json())
                        .then((data) => console.log(data));
                } catch (error) {
                    console.log(error);
                }
            });
        },
        /** Utility methods */
        toLocalDateTime(stringISO8601) {
            // Input format is ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
            let dateToConvert = new Date(stringISO8601);
            let tzOffset = (new Date()).getTimezoneOffset() * 60000; // Time zone offset in millis
            let localISOTime = (new Date(dateToConvert.getTime() - tzOffset)).toISOString().slice(0, -1); // Removes the 'Z'ulu char

            //console.log(`localISOTime: ${localISOTime}`);
            return localISOTime;
        },
        toISO8601(stringLocalDateTime) {
            console.log(stringLocalDateTime);
            // Input format is YYYY-MM-DDTHH:mm:ss.sss in local time
            let dateToConvert = new Date(stringLocalDateTime + 'Z'); // Adding 'Z'ulu char to be a valid ISO8601, but includes the TZ offset
            let tzOffset = (new Date()).getTimezoneOffset() * 60000; // Time zone offset in millis
            let isoTime = (new Date(dateToConvert.getTime() + tzOffset)).toISOString();

            //console.log(`isoTime: ${isoTime}`);
            return isoTime;
        },
    }
});
