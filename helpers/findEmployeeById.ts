import { Employee } from './interface/Employee'
// Вспомогательная функция для поиска сотрудника
export default function findEmployeeById (employees: Employee[], id: number): Employee | null {
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
