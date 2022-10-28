import { defineStore } from "pinia";
import * as Util from "../globals.js";

export class Task {
    constructor(apiTask) {
        if (typeof apiTask === 'undefined') {
            console.log("No-argument construction");

            this.id = undefined;
            this.author = "";
            this.text = "";
            this.description = "";
            // 'tags' contains Priority & Categories objects
            this.tags = [{ priority: 1 }, { categories: undefined }];  // 1 = The lowest priority
            // Converting ISO date format to local date time for a proper visualization
            this.createdAt = Util.toLocalDateTime(new Date());
            this.completed = false;
        }
        else {  // Kind of copy constructor, but given an API's task
            console.log("Copy construction");

            this.id = apiTask.id;
            this.author = apiTask.author;
            this.text = apiTask.text;
            this.description = apiTask.description;
            // Giving format to 'tags' array
            if (apiTask.tags.length === 0) {
                this.tags = [{ priority: 1 }, { categories: undefined }];
            }
            else {
                this.tags = apiTask.tags;
            }
            // Converting ISO date format to local date time for a proper visualization
            this.createdAt = Util.toLocalDateTime(apiTask.createdAt);
            this.completed = apiTask.completed;
        }
        // Properties that API doesn't have
        this.isEditionEnabled = false;
        this.isSelected = false;
    }

    // Set of 'Comparator' functions
    static byPriorityAsc() {
        return (a, b) => a.tags[0].priority - b.tags[0].priority;
    }
    static byPriorityDesc() {
        return (a, b) => b.tags[0].priority - a.tags[0].priority;
    }

    toApiTask() {
        let apiTask = {
            id: this.id,
            author: this.author,
            text: this.text,
            description: this.description,
            tags: this.tags,
            createdAt: Util.toISO8601(this.createdAt),
            completed: this.completed,
        };

        console.log("toApiTask, this: ");
        console.log(this);

        return apiTask;
    }
};

export const useTasksStore = defineStore("tasks", {
    state: () => ({
        user: undefined,
        logged: false,
        tasks: [],  // It could be a map with the ID as a key
        filterCategory: undefined, // = No filter, so all tasks' categories are accepted,
        filterSearchField: "text", // By default, search by 'title' (named in the API as 'text')
        filterSearchValue: "",
        categories: ["Home", "Work", "Social", "University"],
        prioritySortType: Util.SortType.DESC,
        priorityValues: [{ id: 1, value: "Low" }, { id: 2, value: "Medium" }, { id: 3, value: "High" }],
    }),
    getters: {
        getUser: (state) => state.user,
        isLogged: (state) => state.logged,
        getCategories: (state) => state.categories,
        getTasks: (state) => state.tasks,
        // Filters here
        getTaskById: (state) => {
            return (id) => {
                return state.tasks.find((item) => item.id === id);
            };
        },
        getIndexTaskById: (state) => {
            return (id) => {
                return state.tasks.map((item) => item.id).indexOf(id);
            };
        },
        getTasksExceptId: (state) => {
            return (id) => {
                return state.tasks.filter(task => task.id !== id);
            };
        },
        getSelectedTasks: (state) => state.tasks.filter(task => task.isSelected),
        getFilteredTasks: (state) => state.tasks.filter(task => {
            console.log(`Filter by category '${state.filterCategory}'`);
            console.log(`Search in field '${state.filterSearchField}' the value '${state.filterSearchValue.toLocaleLowerCase()}'`);
            // Filter by category and by the search field
            let hasCategory = task.tags[1].categories === state.filterCategory
                || state.filterCategory === undefined;
            let hasSearchedText = task[state.filterSearchField].toLocaleLowerCase().includes(state.filterSearchValue)
                || state.filterSearchValue === "";
            if (hasCategory && hasSearchedText) {
                return true;
            }
            else {
                return false;
            }
        }),
    },
    actions: {
        // Main toolbar actions
        initNewLocalTask() {
            const newTask = new Task();
            newTask.author = this.user;
            newTask.isEditionEnabled = true; // Makes it editable automatically

            console.log(newTask);
            this.tasks.unshift(newTask); // Put at the beginning
        },
        searchByField(field, value) {
            this.filterSearchField = field;
            this.filterSearchValue = value;
        },
        sortByPriority(sortType) {
            if (typeof sortType !== 'undefined') {
                this.prioritySortType = sortType;
            }
            console.log(`Sorting ${this.prioritySortType == Util.SortType.ASC ? "ASC" : "DESC"}`);

            switch (this.prioritySortType) {
                case Util.SortType.ASC:
                    this.tasks.sort(Task.byPriorityAsc());
                    break;
                case Util.SortType.DESC:
                    this.tasks.sort(Task.byPriorityDesc());
                    break;
            }
        },
        setSelected(taskId, value) {
            let task = this.getTaskById(taskId);
            console.log(task.id);

            task.isSelected = value;
        },
        setCompleted(taskId, value) {
            let task = this.getTaskById(taskId);
            console.log(task.id);

            task.completed = value;
        },
        save(plainOjectTask) {
            // Creating a class instance from the plain object to leverage its funtionality
            // This Task instantiation is not intended to be used with this plainOjectTask but it works
            let apiTask = (new Task(plainOjectTask)).toApiTask();
            console.log("Saving task:");
            console.log(apiTask);

            // Decide whether the task is new
            if (apiTask.id) {
                this.updateTask(apiTask);
            }
            else {
                this.createTask(apiTask);
            }

            console.log(this.tasks);
        },
        /** Other actions */
        setUser(user) {
            this.logged = true;
            this.user = user;

            console.log(`The user '${this.user}' has logged in`);
        },
        changeCategory(category) {
            this.filterCategory = category;

            console.log(`Changed category filter by: ${category}`);
        },
        processListOfTasks(apiListOfTasks) {
            console.log(`Api's tasks list from user '${this.user}':`);
            console.log(apiListOfTasks);

            apiListOfTasks.forEach(apiTask => {
                // The tasks in the store will have additional information and formatting
                let newTask = new Task(apiTask);

                // Aggregating any new category to the main array without duplicates
                if (apiTask.tags.length !== 0) {
                    console.log("Tags that come from API:")
                    console.log(apiTask.tags);
                    // At this moment, categories is single-valued in the API. Filtering falsy and null-like values.
                    this.categories = [...new Set([...this.categories, apiTask.tags[1].categories])].filter(e => e)
                    console.log(`Categories stored: [${this.categories}]`)
                }

                // Adding tasks to the main tasks array
                this.tasks.push(newTask);
            });

            // Descending priority order by default
            this.tasks.sort(Task.byPriorityDesc());

            console.log("Initial tasks data after processing:");
            console.log(this.tasks);
        },
        processCreationResponse(apiTask, newTask) {
            console.log("Api task created:");
            console.log(apiTask);

            // Only the returned Id is necessary. The rest of data initially created locally is already valid.
            newTask.id = apiTask.id;

            return newTask;
        },
        /** CRUD operations */
        async createTask(apiTask) {
            console.log("Create task:")
            console.log(apiTask);

            /** Due to the API nature, the task must be created first by doing
             *  a POST of the Title ('text' field) and then a PATCH with the rest of data.
             */
            // POST /users/:username/todos
            try {
                fetch(`${Util.URL}/users/${this.user}/todos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: apiTask.title })
                })
                    .then((response) => response.json())
                    .then((apiTaskfromBE) => this.processCreationResponse(apiTaskfromBE, apiTask))
                    // NOTE: he local task in the store will be updated in 'updateTask()'.
                    .then((processedApiTask) => this.updateTask(processedApiTask))  // PATCH
            } catch (error) {
                console.log(error);
            }
        },
        async updateTask(apiTask) {
            console.log("Update task:")
            console.log(apiTask);

            // PATCH /users/:username/todos/:id
            try {
                fetch(`${Util.URL}/users/${this.user}/todos/${apiTask.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(apiTask)
                })
                    .then((response) => response.json());

                // Finally, updating the local task
                this.tasks.splice(this.getIndexTaskById(undefined), 1);
                this.tasks.unshift(new Task(apiTask));
                //this.sortByPriority();
            } catch (error) {
                console.log(error);
            }
        },
        async readTasksFromUser() {
            // GET /users/:username/todos
            try {
                fetch(`${Util.URL}/users/${this.user}/todos`)
                    .then((response) => response.json())
                    .then((apiListOfTasks) => this.processListOfTasks(apiListOfTasks));
            } catch (error) {
                console.log(error);
            }
        },
        async deleteSelectedTasks() {
            let tasksToDelete = this.getSelectedTasks;
            console.log(`No. of tasks BEFORE removing: ${this.tasks.length}`);

            // Removing each task one by one in the API
            tasksToDelete.forEach((taskToDelete) => {
                console.log(`Task to delete with id: ${taskToDelete.id}`);

                // DELETE /users/:username/todos/:id
                try {
                    fetch(`${Util.URL}/users/${this.user}/todos/${taskToDelete.id}`, {
                        method: 'DELETE'
                    })
                        .then((response) => response.json());

                    // Finally, removing the task from the local store
                    // NOTE: All tasks to delete could be removed at once but this way
                    // the process is as transactional as the API (one by one)
                    this.tasks = this.getTasksExceptId(taskToDelete.id);
                } catch (error) {
                    console.log(error);
                }
            });

            console.log(`No. of tasks AFTER removing: ${this.tasks.length}`);
        },
    }
});
