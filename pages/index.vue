<template>
  <div class="content">
    <BaseTable class="content__table" />
    <transition name="transition">
      <BaseForm v-if="formShow" class="content__form" />
    </transition>
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
  &__table {
    border: 1px solid var(--color-border-1);
    border-radius: 7px;
    box-shadow: 0px 4px 26px rgba(8, 12, 66, 0.1);
  }
  &__form {
    position: absolute;
    inset:  sizeIncr(10, 20) sizeIncr(10, 20) auto auto;
    border: 2px solid var(--color-border-1);
    border-radius: 7px;
    background-color: var(--color-bg-white-2);
    box-shadow: 0px 4px 26px rgba(8, 12, 66, 0.1);
  }
}
.transition-enter-active,
.transition-leave-active {
  @include transition
}

.transition-enter,
.transition-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
