<template>
  <div class="table">
    <div class="table__wrap-header">
      <h1 class="table__title">
        База данных по сотрудникам
      </h1>
      <BtnShowForm class="table__btn-show" />
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
  &__wrap-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: sizeIncr(10, 20);
    border-bottom: 1px solid var(--color-border-1);
  }
}
</style>
