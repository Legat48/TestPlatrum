import findEmployeeById from '~/helpers/findEmployeeById'
import generateId from '~/helpers/generateId'

export const state = () => ({
  employeesBase: [],
  formShow: false,
  parentId: ''
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
    const employeeToAdd = { ...newEmployee, id: generateId(state.employeesBase) }

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
  }
}
