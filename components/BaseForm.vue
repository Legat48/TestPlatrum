<template>
  <div class="form">
    <h2 class="form__title">
      Добавление пользователя
    </h2>
    <label class="form__label">
      <input v-model="name" type="text" @input="nameFormat">
      <p v-if="errorName" class="form__error">
        {{ errorName }}
      </p>
    </label>
    <label class="form__label">
      <input v-model="phone" type="text" @input="phoneFormat">
      <p v-if="errorPhone" class="form__error">
        {{ errorPhone }}
      </p>
    </label>
    <label class="form__label">
      Выберите родителя:
      <select v-model="selectedEmployeeId">
        <option value="">
          Не выбрано
        </option>
        <option v-for="employee in employeesBase" :key="employee.id" :value="employee.id">
          {{ employee.name }}
        </option>
      </select>
      <button class="form__btn btn" @click="submit">
        Добавить
      </button>
    </label>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  data () {
    return {
      name: '',
      phone: '',
      selectedEmployeeId: null,
      errorName: '',
      errorPhone: ''
    }
  },
  computed: {
    employeesBase () {
      const employees = this.$store.getters.getEmployeesBase
      const flattenedEmployees = []
      this.flattenEmployees(employees, null, flattenedEmployees)
      return flattenedEmployees
    }
  },
  methods: {
    flattenEmployees (employees, parentId, flattenedEmployees) {
      for (const employee of employees) {
        const flattenedEmployee = {
          id: employee.id,
          name: employee.name,
          parentId
        }
        flattenedEmployees.push(flattenedEmployee)
        if (employee.subordinate && employee.subordinate.length) {
          this.flattenEmployees(employee.subordinate, employee.id, flattenedEmployees)
        }
      }
    },
    submit () {
      if (!this.name || !/^[\p{Script=Cyrillic}\p{Script=Latin}\s]+$/u.test(this.name)) {
        this.errorName = 'Пожалуйста, введите корректное имя'
        return
      } else {
        this.errorName = ''
      }
      if (!/^\d{10,}$/.test(this.phone)) {
        this.errorPhone = 'Пожалуйста, введите корректный телефон (более 10 цифр)'
        return
      } else {
        this.errorPhone = ''
      }
      const newEmployee = {
        name: this.name.trim(),
        phone: this.phone.replace(/\D/g, ''),
        subordinate: []
      }
      this.$store.commit('setEmployees', {
        newEmployee,
        selectedEmployeeId: this.selectedEmployeeId
      })
      this.name = ''
      this.phone = ''
      this.selectedEmployeeId = null
    },
    nameFormat () {
      this.name = this.name.replace(/[^a-zA-Zа-яА-Я\s]/g, '')
    },
    phoneFormat () {
      this.phone = this.phone.replace(/\D/g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  &__label {
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
  }
}
</style>
