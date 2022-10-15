import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
    state: () => ({
        tasks: [
            { id: 0, title: "Title 1", description: "Description 1", priority: "3", dueDate: "2018-06-12T07:30", isCompleted: false },
            { id: 1, title: "Title 2", description: "Description 2", priority: "2", dueDate: "2018-07-12T19:30", isCompleted: false },
            { id: 2, title: "Title 3", description: "Description 3", priority: "1", dueDate: "2018-07-12T19:30", isCompleted: false },
            { id: 5, title: "Title 6", description: "Description 6", priority: "3", dueDate: "2018-08-12T19:30", isCompleted: false },
            { id: 3, title: "Title 4", description: "Description 4", priority: "1", dueDate: "2018-09-12T19:30", isCompleted: false },
            { id: 4, title: "Title 5", description: "Description 5", priority: "1", dueDate: "2018-12-12T19:30", isCompleted: false }],
    }),
    getters: {
        getTasks: (state) => state.tasks,
        getTaskById: (state) => {
            return (id) => {
                return state.tasks.find((item) => item.id === id);
            };
        }
    },
    actions: {
        addTask(task) {
            this.tasks.push(task);
        },
        deleteTaskByIds(...taskIds) {
            let filteredTasks = this.tasks.filter(task => !taskIds.includes(task.id));
            this.tasks = filteredTasks;
        }
    }
});
