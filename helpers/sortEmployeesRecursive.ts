import { Employee } from './interface/Employee'
// Вспомогательная функция для сортировки базы сотрудников внутри и на всю глубину

function sortEmployeesRecursive (employees: (Employee | undefined)[], key: string, direction: 'asc' | 'desc'): void {
  employees.sort((a: Employee | undefined, b: Employee | undefined) => {
    if (!a || !b) {
      return 0
    }
    const valueA = a[key]
    const valueB = b[key]

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA
    } else {
      return 0
    }
  })

  employees.forEach((employee: Employee | undefined) => {
    if (employee?.subordinate?.length) {
      sortEmployeesRecursive(employee.subordinate as (Employee | undefined)[], key, direction)
    }
  })
}

export default sortEmployeesRecursive
