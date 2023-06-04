import { findEmployeeById, generateId, sortEmployeesRecursive, formatDateTime } from '~/helpers'

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
    console.log('test')
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
