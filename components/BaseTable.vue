<template>
  <div class="table">
    <div class="table__wrap-header">
      <h1 class="table__title">
        Сотрудники компании
      </h1>
      <BtnShowForm class="table__btn-show" />
    </div>
    <div class="table__wrap">
      <div v-if="employeesBase" class="table__subwrap">
        <div class="table__header">
          <div class="table__header-item" />
          <div class="table__header-item table__header-item_anim" @click.prevent="$store.commit('sortByName')">
            <span>
              Сотрудник
            </span>
            <svg class="table__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z" fill="#394D5E" /></svg>
          </div>
          <div class="table__header-item">
            Табельный
          </div>
          <div class="table__header-item table__header-item_anim" @click.prevent="$store.commit('sortByDate')">
            <span>
              Время добавления
            </span>
            <svg class="table__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 21L14 17H17V7H14L18 3L22 7H19V17H22M2 19V17H12V19M2 13V11H9V13M2 7V5H6V7H2Z" fill="#394D5E" /></svg>
          </div>
          <div class="table__header-item">
            Телефон
          </div>
          <div class="table__header-item" />
        </div>
        <BaseEmployee v-for="employee in employeesBase" :key="employee.id" :employee="employee" />
      </div>
      <div v-else class="table__plug">
        Добавьте сотрудников
      </div>
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
  width: 100%;
  &__wrap {
    overflow-x: scroll;
  }
  &__subwrap {
    min-width: 800px;
  }
  &__wrap-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: sizeIncr(10, 20);
    border-bottom: 1px solid var(--color-border-1);
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
  &__header {
    display: grid;
    align-items: center;
    grid-template-columns: 44px 1fr 1fr 1fr 1fr 40px;
    border-bottom: 1px solid var(--color-border-1);
  }
  &__header-item {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px;
    font-weight: 700;
    color: var(--color-text-1);
    @include no-select;
    &_anim {
      @include transition;
      path {
        @include transition;
      }
      @media (min-width: 768px) {
        &:hover {
          color: var(--color-text-3);
          path {
            fill: var(--color-text-3);
          }
        }
      }
      &:active {
        color: var(--color-text-2);
          path {
            fill: var(--color-text-2);
          }
      }
    }
  }
  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
