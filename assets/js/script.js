var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentE1 = document.querySelector("#page-content");
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
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
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
formEl.addEventListener("submit", taskFormHandler);
pageContentE1.addEventListener("click", taskButtonHandler)