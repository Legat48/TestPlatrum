<template>
  <div class="table">
    <div class="table__wrap-header">
      <h1 class="table__title">
        База данных по сотрудникам
      </h1>
      <button class="table__btn btn">
        Добавить
      </button>
    </div>
    <div v-if="employeesBase">
      <BaseEmployee v-for="employee in employeesBase" :key="employee.id" :employee="employee" />
    </div>
    <div v-else class="table__plug">
      Добавьте сотрудников
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseTable',
  computed: {
    employeesBase () {
      return this.$store.getters.getEmployeesBase
    }
  },
  methods: {
  }

}
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-direction: column;
}
</style>
