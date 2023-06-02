// Вспомогательная функция для поиска сотрудника по id
export default function findEmployeeById (employees, id) {
  for (const employee of employees) {
    if (employee.id === id) {
      return employee
    }
    if (employee.subordinate?.length) {
      const foundEmployee = findEmployeeById(employee.subordinate, id)
      if (foundEmployee) {
        return foundEmployee
      }
    }
  }
  return null
}
