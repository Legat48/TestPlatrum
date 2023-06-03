<template>
  <div class="content">
    <BaseTable class="content__form" />
    <BaseForm v-if="formShow" class="content__form" />
  </div>
</template>

<script>
export default {
  middleware: [],
  computed: {
    formShow () {
      return this.$store.getters.getFormShow
    }
  },
  mounted () {
    const base = JSON.parse(localStorage.getItem('employeesBase'))
    if (base && base.length > 0) {
      this.$store.commit('setEmployeesBase', base)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  display: flex;
  padding: sizeIncr(24, 48);
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  &__form {
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
    box-shadow: 0px 4px 26px rgba(8, 12, 66, 0.1);
  }
}
</style>
