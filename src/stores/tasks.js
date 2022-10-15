import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
    state: () => ({
        tasks: [],
        nonFilteredTasks:[
            { id: 0, title: "Title 1", description: "Description 1", priority: "3", dueDate: "2018-06-12T07:30", isCompleted: false, categoria: "casa" },
            { id: 1, title: "Title 2", description: "Description 2", priority: "2", dueDate: "2018-07-12T19:30", isCompleted: false, categoria: "trabajo" },
            { id: 2, title: "Title 3", description: "Description 3", priority: "1", dueDate: "2018-07-12T19:30", isCompleted: false, categoria: "universidad" },
            { id: 5, title: "Title 6", description: "Description 6", priority: "3", dueDate: "2018-08-12T19:30", isCompleted: false, categoria: "casa" },
            { id: 3, title: "Title 4", description: "Description 4", priority: "1", dueDate: "2018-09-12T19:30", isCompleted: false, categoria: "casa" },
            { id: 4, title: "Title 5", description: "Description 5", priority: "1", dueDate: "2018-12-12T19:30", isCompleted: false, categoria: "universidad" },
            { id: 6, title: "hacer caca", description: "ir al baño y defecar", priority: "3", dueDate: "2020-10-15T15:00", isCompleted: false, categoria: "trabajo"}
        ],
        sortType:0
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
        },
        sortCategoria(cat){
            this.tasks = [];
            console.log("estas es la lista vacia")
            console.log(this.tasks)
            switch (cat){
                case 0:
                    for (let index = 0; index < this.nonFilteredTasks.length; index++) {
                        this.tasks.push (this.nonFilteredTasks[index])
                    }
                    return this.tasks;
                    break;
                case 1:
                    for (let index = 0; index < this.nonFilteredTasks.length; index++) {
                        console.log("antes");console.log(this.nonFilteredTasks[index])
                        if (this.nonFilteredTasks[index].categoria=="trabajo"){
                            console.log("despues");console.log(this.nonFilteredTasks[index])
                            this.tasks.push (this.nonFilteredTasks[index])
                        }
                        
                    }
                    return this.tasks;
                    break;
                case 2:
                    for (let index = 0; index < this.nonFilteredTasks.length; index++) {
                        if (this.nonFilteredTasks[index].categoria=="casa"){
                            this.tasks.push (this.nonFilteredTasks[index])
                        }
                        
                    }
                    return this.tasks;
                    break;
                case 3:
                    for (let index = 0; index < this.nonFilteredTasks.length; index++) {
                        if (this.nonFilteredTasks[index].categoria=="universidad"){
                            this.tasks.push (this.nonFilteredTasks[index])
                        }
                        
                    }
                    return this.tasks;
                    break;
            }
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
          }

    }
});
