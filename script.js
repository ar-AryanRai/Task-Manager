let data;
let selectedFilter;

const onStart = () => {
  const dataStr = localStorage.getItem("data");
  data = dataStr
    ? JSON.parse(dataStr)
    : {
        pending: [],
        completed: [],
      };

  const selectedFilterStr = localStorage.getItem("selectedFilter");
  selectedFilter = selectedFilterStr
    ? JSON.parse(selectedFilterStr)
    : "Pending";

  if (selectedFilter === "Pending") {
    displayPendingTask();
  } else if (selectedFilter === "Completed") {
    displayCompletedTask();
  } else {
    displayAllTask();
  }
};

const displayPendingTask = () => {
  let innerHtmlString = ``;

  data.pending.forEach((task) => {
    innerHtmlString += `
          <li class="flex justify-between items-center bg-[#F8F9FA] py-3 rounded-md px-4 pending">
            <div class="task-name">${task}</div>
            <div class="btns bg-[#28A745] px-2 rounded-md py-1 font-semibold text-white cursor-pointer" onClick="handleMarkDone('${task}')">Mark Done</div>
          </li>
        `;
  });

  document.querySelector(".task-list-container ul").innerHTML = innerHtmlString;
};

const displayCompletedTask = () => {
  let innerHtmlString = ``;

  data.completed.forEach((task) => {
    innerHtmlString += `
          <li class="flex justify-between items-center bg-[#D4EDDA] py-3 rounded-md px-4 completed">
            <div class="task-name line-through text-[#6C757D]">${task}</div>
            <div class="btns bg-[#28A745] px-2 rounded-md py-1 font-semibold text-white cursor-pointer" onClick="handleMarkPending('${task}')">Mark Pending</div>
          </li>
        `;
  });

  document.querySelector(".task-list-container ul").innerHTML = innerHtmlString;
};

const displayAllTask = () => {
  let innerHtmlString = ``;

  data.pending.forEach((task) => {
    innerHtmlString += `
          <li class="flex justify-between items-center bg-[#F8F9FA] py-3 rounded-md px-4 pending">
            <div class="task-name">${task}</div>
            <div class="btns bg-[#28A745] px-2 rounded-md py-1 font-semibold text-white cursor-pointer" onClick="handleMarkDone('${task}')">Mark Done</div>
          </li>
        `;
  });

  data.completed.forEach((task) => {
    innerHtmlString += `
          <li class="flex justify-between items-center bg-[#D4EDDA] py-3 rounded-md px-4 completed">
            <div class="task-name line-through text-[#6C757D]">${task}</div>
            <div class="btns bg-[#28A745] px-2 rounded-md py-1 font-semibold text-white cursor-pointer" onClick="handleMarkPending('${task}')">Mark Pending</div>
          </li>
        `;
  });

  document.querySelector(".task-list-container ul").innerHTML = innerHtmlString;
};

const handleAddButton = () => {
  const inputValue = document.querySelector("#task").value;
  document.querySelector("#task").value = "";
  if (
    data && 
    (data.pending.includes(inputValue) || data.completed.includes(inputValue))
  ) {
    document.querySelector(".alert-same-task").classList.remove("opacity-0");
    setTimeout(() => {
      document.querySelector(".alert-same-task").classList.add("opacity-0");
    }, 2500);
    return;
  } else if (inputValue) {
    data.pending.unshift(inputValue);
    localStorage.setItem("data", JSON.stringify(data));
    if (selectedFilter === "Pending") {
      displayPendingTask();
    } else if (selectedFilter === "Completed") {
      displayCompletedTask();
    } else {
      displayAllTask();
    }
  } else {
    document.querySelector(".alert-task-name").classList.remove("opacity-0");
    setTimeout(() => {
      document.querySelector(".alert-task-name").classList.add("opacity-0");
    }, 2500);
  }
};

document
  .querySelector(".add-task-btn")
  .addEventListener("click", handleAddButton);

const handleMarkDone = (task) => {
  const taskItems = document.querySelectorAll(".task-list-container ul li");

  taskItems.forEach((item) => {
    if (item.querySelector(".task-name").innerText === task) {
      item.classList.remove("pending");
      item.classList.add("completed");
      item.querySelector(".btns").innerText = "Mark Pending";
      item.querySelector(".btns").classList.remove("bg-[#28A745]");
      item.querySelector(".btns").classList.add("bg-[#D4EDDA]");
      item
        .querySelector(".task-name")
        .classList.add("line-through", "text-[#6C757D]");
    }
  });

  data.pending = data.pending.filter((ele) => ele !== task);
  data.completed.unshift(task);

  localStorage.setItem("data", JSON.stringify(data));

  if (selectedFilter === "Pending") {
    displayPendingTask();
  } else if (selectedFilter === "Completed") {
    displayCompletedTask();
  } else {
    displayAllTask();
  }
};

const handleMarkPending = (task) => {
  const taskItems = document.querySelectorAll(".task-list-container ul li");

  taskItems.forEach((item) => {
    if (item.querySelector(".task-name").innerText === task) {
      item.classList.add("pending");
      item.classList.remove("completed");
      item.querySelector(".btns").innerText = "Mark Done";
      item.querySelector(".btns").classList.add("bg-[#28A745]");
      item.querySelector(".btns").classList.remove("bg-[#D4EDDA]");
    }
  });
  data.completed = data.completed.filter((ele) => ele !== task);
  data.pending.unshift(task);

  localStorage.setItem("data", JSON.stringify(data));

  if (selectedFilter === "Pending") {
    displayPendingTask();
  } else if (selectedFilter === "Completed") {
    displayCompletedTask();
  } else {
    displayAllTask();
  }
};

const handleCompletedFilter = () => {
  selectedFilter = "Completed";
  localStorage.setItem("selectedFilter", JSON.stringify(selectedFilter));
  document.querySelector(".completed-task-btn").classList.add("current");
  document.querySelector(".completed-task-btn").classList.remove("rest");
  document.querySelector(".all-task-btn").classList.add("rest");
  document.querySelector(".pending-task-btn").classList.add("rest");
  displayCompletedTask();
};

const handlePendingFilter = () => {
  selectedFilter = "Pending";
  localStorage.setItem("selectedFilter", JSON.stringify(selectedFilter));
  document.querySelector(".pending-task-btn").classList.add("current");
  document.querySelector(".pending-task-btn").classList.remove("rest");
  document.querySelector(".all-task-btn").classList.add("rest");
  document.querySelector(".completed-task-btn").classList.add("rest");
  displayPendingTask();
};

const handleAllFilter = () => {
  selectedFilter = "All";
  localStorage.setItem("selectedFilter", JSON.stringify(selectedFilter));
  document.querySelector(".all-task-btn").classList.add("current");
  document.querySelector(".all-task-btn").classList.remove("rest");
  document.querySelector(".completed-task-btn").classList.add("rest");
  document.querySelector(".pending-task-btn").classList.add("rest");
  displayAllTask();
};

document
  .querySelector(".completed-task-btn")
  .addEventListener("click", handleCompletedFilter);

document
  .querySelector(".pending-task-btn")
  .addEventListener("click", handlePendingFilter);

document
  .querySelector(".all-task-btn")
  .addEventListener("click", handleAllFilter);

onStart();
