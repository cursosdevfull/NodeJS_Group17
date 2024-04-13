function getTasks(id) {
  const tasks = [
    { taskId: 1, userId: 1, title: "Task01" },
    { taskId: 2, userId: 1, title: "Task02" },
    { taskId: 3, userId: 1, title: "Task03" },
    { taskId: 4, userId: 2, title: "Task04" },
    { taskId: 5, userId: 2, title: "Task05" },
    { taskId: 6, userId: 2, title: "Task06" },
    { taskId: 7, userId: 3, title: "Task07" },
    { taskId: 8, userId: 3, title: "Task08" },
  ];

  return [...tasks.filter((task) => task.userId === id)];
}

module.exports = { getTasks };
