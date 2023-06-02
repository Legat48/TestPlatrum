<template>
  <div class="employee">
    <div class="employee__wrap">
      <p class="employee__name">
        {{ employee.name }} айди {{ employee.id }}
      </p>
      <p>
        {{ employee.phone }}
      </p>
      <button class="employee__btn btn" @click.prevent="delEmployee(employee.id)">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#EA0C0E" />
        </svg>
      </button>
    </div>
    <div v-if="employee.subordinate && employee.subordinate.length > 0">
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
.table {
  display: flex;
  flex-direction: column;
}
</style>
