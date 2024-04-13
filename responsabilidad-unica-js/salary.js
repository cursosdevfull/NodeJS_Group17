function getSalary(id) {
  const salaryByEmployee = [
    { userId: 1, salary: 500 },
    { userId: 2, salary: 15000 },
    { userId: 3, salary: 2000 },
  ];

  return [...salaryByEmployee.filter((el) => el.userId === id)];
}

module.exports = { getSalary };
