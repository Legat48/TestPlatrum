import findEmployeeById from '~/helpers/findEmployeeById'
import generateId from '~/helpers/generateId'

export const state = () => ({
  employeesBase: [],
  formShow: false,
  parentId: '',
  sortDirection: {
    name: 'asc',
    createdAt: 'asc'
  }
})

export const getters = {
  getEmployeesBase: state => state.employeesBase,
  getFormShow: state => state.formShow,
  getParentId: state => state.parentId
}

export const mutations = {
  setFormShow (state, value) {
    if (!value) {
      state.parentId = ''
    }
    state.formShow = value
  },
  setParentId (state, value) {
    state.parentId = value
  },
  setEmployeesBase (state, value) {
    state.employeesBase = value
  },
  setEmployees (state, { newEmployee, selectedEmployeeId }) {
    state.parentId = ''
    const employeeToAdd = {
      ...newEmployee,
      id: generateId(state.employeesBase),
      createdAt: formatDateTime(new Date()) // Добавляем свойство createdAt с текущей датой и временем
    }

    if (selectedEmployeeId) {
      const parentEmployee = findEmployeeById(state.employeesBase, selectedEmployeeId)
      if (parentEmployee) {
        parentEmployee.subordinate.push(employeeToAdd)
      }
    } else {
      state.employeesBase.push(employeeToAdd)
    }

    localStorage.setItem('employeesBase', JSON.stringify(state.employeesBase))
  },
  removeEmployee (state, id) {
    const removeEmployeeRecursive = (employees) => {
      return employees.filter((employee) => {
        if (employee.id === id) {
          return false
        }
        if (employee.subordinate?.length) {
          employee.subordinate = removeEmployeeRecursive(employee.subordinate)
        }
        return true
      })
    }

    state.employeesBase = removeEmployeeRecursive(state.employeesBase)
    localStorage.setItem('employeesBase', JSON.stringify(state.employeesBase))
  },
  sortByName (state) {
    const direction = state.sortDirection.name === 'asc' ? 'desc' : 'asc'
    sortEmployeesRecursive(state.employeesBase, 'name', direction)
    state.sortDirection.name = direction
  },
  sortByDate (state) {
    const direction = state.sortDirection.createdAt === 'asc' ? 'desc' : 'asc'
    sortEmployeesRecursive(state.employeesBase, 'createdAt', direction)
    state.sortDirection.createdAt = direction
  }
}

// Вспомогательная функция для форматирования даты и времени
function formatDateTime (date) {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
}

function sortEmployeesRecursive (employees, key, direction) {
  employees.sort((a, b) => {
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

  employees.forEach((employee) => {
    if (employee.subordinate?.length) {
      sortEmployeesRecursive(employee.subordinate, key, direction)
    }
  })
}
