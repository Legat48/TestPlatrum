<template>
  <div class="form">
    <button class="form__close btn" @click="closeForm">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.39998 18.6501L5.34998 17.6001L10.95 12.0001L5.34998 6.4001L6.39998 5.3501L12 10.9501L17.6 5.3501L18.65 6.4001L13.05 12.0001L18.65 17.6001L17.6 18.6501L12 13.0501L6.39998 18.6501Z" fill="#3264fe" />
      </svg>
    </button>
    <h2 class="form__title">
      Добавление пользователя
    </h2>
    <label class="form__label">
      <input v-model="name" type="text" placeholder="Имя сотрудника" @input="nameFormat">
      <p v-if="errorName" class="form__error">
        {{ errorName }}
      </p>
    </label>
    <label class="form__label">
      <input v-model="phone" type="text" placeholder="Рабочий телефон" @input="phoneFormat">
      <p v-if="errorPhone" class="form__error">
        {{ errorPhone }}
      </p>
    </label>
    <label class="form__label">
      Руководитель:
      <select v-model="selectedEmployeeId">
        <option value="">
          Не выбрано
        </option>
        <option v-for="employee in employeesBase" :key="employee.id" :value="employee.id">
          {{ employee.name }} (Таб №{{ employee.id }})
        </option>
      </select>
    </label>
    <button class="form__btn btn" @click="submit">
      Добавить
    </button>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  data () {
    return {
      name: '',
      phone: '',
      errorName: '',
      errorPhone: ''
    }
  },
  computed: {
    employeesBase () {
      const employees = this.$store.getters.getEmployeesBase
      const collectedEmployees = []
      this.collectEmployees(employees, null, collectedEmployees)
      return collectedEmployees
    },
    selectedEmployeeId: {
      get () {
        return this.$store.getters.getParentId
      },
      set (newValue) {
        this.$store.commit('setParentId', newValue)
      }
    }
  },
  mounted () {
    // Добавляем обработчик события click на документ для обработки нажатия вне формы для закрытия (не считая кнопку открытия)
    document.addEventListener('click', this.handleOutsideClick)
  },

  beforeUnmount () {
    // Удаляем обработчик события click при размонтировании компонента (для оптимизации, что бы не висели лишние обработчики когда форма скрыта)
    document.removeEventListener('click', this.handleOutsideClick)
  },
  methods: {
    handleOutsideClick (event) {
      if (!event.target.closest('.form') && !event.target.closest('.add-btn')) {
        this.$store.commit('setFormShow', false)
      }
    },
    collectEmployees (employees, parentId, collectedEmployees) {
      for (const employee of employees) {
        const collectedEmployee = {
          id: employee.id,
          name: employee.name,
          parentId
        }
        collectedEmployees.push(collectedEmployee)
        if (employee.subordinate && employee.subordinate.length) {
          this.collectEmployees(employee.subordinate, employee.id, collectedEmployees)
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
        this.errorPhone = 'Пожалуйста, введите корректный телефон (более 9 цифр)'
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
    },
    nameFormat () {
      this.name = this.name.replace(/[^a-zA-Zа-яА-Я\s]/g, '')
    },
    phoneFormat () {
      this.phone = this.phone.replace(/\D/g, '')
    },
    closeForm () {
      this.$store.commit('setFormShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  &__close {
    position: absolute;
    inset: 10px 10px auto auto;
    height: 24px;
    width: 24px;
  }
  &__label {
    position: relative;
    gap: 3px;
    margin-bottom: 12px;
    padding: 12px;
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
    color: var(--color-text-1);
    @include transition;
    &:focus-within {
      border-color: var(--color-border-2);
    }
  }
  &__title {
    padding-right: 25px;
    margin-bottom: 12px;
  }
  &__error {
    position: absolute;
    inset: auto auto 2px 12px;
    max-width: 430px;
    font-size: 12px;
    color: var(--color-error);
  }
  &__btn {
    padding: sizeIncr(4, 7);
    border-radius: 5px;
    border: 1px solid var(--color-border-2);
    font-weight: 600;
    color: var(--color-text-3);
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    @media (min-width: 768px) {
      &:hover {
        color: var(--color-text-white-1);
        background-color: var(--color-btn-2);
      }
    }
    &:active {
      border: 1px solid var(--color-border-3);
      color: var(--color-text-white-1);
      background-color: var(--color-btn-1);
    }
  }
}
</style>
