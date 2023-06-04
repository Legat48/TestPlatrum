import { Employee } from './interface/Employee'
export default function generateId (employees: Employee[]): number {
  function flattenNestedEmployees (employees: Employee[]): Employee[] {
    let flattened: Employee[] = []
    for (const employee of employees) {
      flattened.push(employee)
      if (employee.subordinate?.length) {
        flattened = flattened.concat(flattenNestedEmployees(employee.subordinate))
      }
    }
    return flattened
  }

  const flattenEmployees = flattenNestedEmployees(employees)
  if (flattenEmployees.length === 0) {
    return 1
  }
  const existingIds = new Set(flattenEmployees.map(employee => employee.id))
  let newId = 1
  while (existingIds.has(newId)) {
    newId++
  }
  return newId
}
