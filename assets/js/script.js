var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");
var tasks = [];


var taskFormHandler = function() {
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();
    //package data as obj

    var isEdit = formE1.hasAttribute("data-text-id");

    if(isEdit) {
        var taskId = formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);

    }
    else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do",

        
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
 }
}
 var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
  
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
  
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
  
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsE1);

    tasksToDoEl.appendChild(listItemEl);
  
    // increase task counter for next unique id
    taskIdCounter++;
  };
  

  var createTaskActions = function(taskId){
      var actionContainerE1 = document.createElement("div");
      actionContainerE1.className = "task-actions";
      var editButtonE1 = document.createElement("button");
      editButtonE1.textContent = "Edit";
      editButtonE1.className = "btn edit-btn";
      editButtonE1.setAttribute("data-task-id", taskId);

      actionContainerE1.appendChild(editButtonE1);

      //delete button
      var deleteButtonE1 = document.createElement("button");
      deleteButtonE1.textContent = "Delete";
      deleteButtonE1.className = "btn delete-btn";
      deleteButtonE1.setAttribute("data-task-id", taskId);

      actionContainerE1.appendChild(deleteButtonE1);

      var statusSelectE1 = document.createElement("select");
      statusSelectE1.className = "select-status";
      statusSelectE1.setAttribute("name","status-change");
      statusSelectE1.setAttribute("data-task-id", taskId);

      var statusChoices = ["To Do", "In Progress", "Completed"];

      for (var i = 0; i < statusChoices.length; i++) {
          //create option element
          var statusOptionE1 = document.createElement("option");
          statusOptionE1.textContent = statusChoices[i];
          statusOptionE1.setAttribute("value", statusChoices[i]);

          //append to select

          statusSelectE1.appendChild(statusOptionE1);
      }


      actionContainerE1.appendChild(statusSelectE1);



      return actionContainerE1;
  };

var deleteTask = function(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    var updatedTaskArr = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    tasks = updatedTaskArr;
};

var editTask = function(taskId) {
    console.log("editing task#" + taskId);

    //get task li element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //gety content from task name and type
    var taskName =taskSelected.querySelector("h3.task-name").textContent;

    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("#save-task").textContent = "Save Task";

    formE1.setAttribute("data-task-id", taskId);
}

var taskButtonHandler = function(event){
    var targetE1 = event.target;

    //edit button clicked
    if (targetE1.matches(".edit-btn")) {
        var taskId = targetE1.getAttribute("gata-task-id");
        editTask(taskId);
    }
    else if (targetE1.matches(".delete-btn")){
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var taskStatusChangeHandler = function(event){
    var taskId = event.target.getAttribtue("data-task-id");

    var statusValue = event.target.value.toLoweCase();

    var taskSelected = document.querySelector(".task-item[data-task-id'" + taskId + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgressE1.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedE1.appendChild(taskSelected);
    }
    
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    }
};

var createEditTask = function(taskName, taskType, taskId){
    // find the matching task list item
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

for (var i = 0; i < tasks.length; i++){
    if (tasks[i].id === parseInt(taskId)){
        tasks[i].name = taskName;
        tasks[i].type = taskType;
    }
};

alert("Task Updated!");

formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add Task";
}
formEl.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler);
pageContentE1.addEventListener("change", taskStatusChangeHandler);