<template>
  <div class="employee">
    <div class="employee__wrap">
      <BtnShowForm class="employee__btn-show" :icon="true" :parent-id="employee.id" />
      <p class="employee__text">
        {{ employee.name }}
      </p>
      <p class="employee__text employee__text_sub">
        Таб. №{{ employee.id }}
      </p>
      <p class="employee__text employee__text_sub">
        Дата создания {{ employee.createdAt }}
      </p>
      <p class="employee__text employee__text_sub">
        {{ employee.phone }}
      </p>
      <button class="employee__btn btn" @click.prevent="delEmployee(employee.id)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#EA0C0E" />
        </svg>
      </button>
    </div>
    <div v-if="employee.subordinate && employee.subordinate.length > 0" class="employee__subwrap">
      <BaseEmployee v-for="worker in employee.subordinate" :key="worker.id" :employee="worker" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'BaseEmployee',
  props: {
    employee: {
      type: Object,
      required: true,
      default: () => ({}) // Пример установки пустого объекта в качестве значения по умолчанию
    }
  },
  methods: {
    delEmployee (id) {
      this.$store.commit('removeEmployee', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.employee {
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border-1);
  }
  &__wrap {
    display: grid;
    align-items: center;
    grid-template-columns: 44px 1fr 1fr 1fr 1fr 40px;
  }
  &__subwrap {
    margin-left: 6px;
    padding: 4px 0;
    border: 1px solid var(--color-border-1);
    border-left: 4px solid var(--color-border-2);
    border-radius: 7px 0 0 7px;
    margin-bottom: 4px;
  }
  &__btn-show {
    margin-left: 4px;
  }
  &__text {
    padding: 0px 10px;
    font-weight: 600;
    &_sub {
      font-weight: 400;
    }
  }
}
</style>
