<template>
  <button class="add-btn btn" @click.prevent="openForm">
    <svg class="add-btn__icon pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#3264fe" /></svg>
    <span v-if="!icon" class="pointer-events-none">
      Добавить
    </span>
  </button>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    icon: {
      type: Boolean,
      default: false
    },
    parentId: {
      type: Number,
      default: 0
    }
  },
  computed: {

  },
  methods: {
    openForm () {
      if (this.parentId > 0) { this.$store.commit('setParentId', this.parentId) }
      this.$store.commit('setFormShow', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: sizeIncr(4, 7);
  border-radius: 5px;
  border: 1px solid var(--color-border-2);
  font-weight: 600;
  color: var(--color-text-3);
  box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
  path {
    @include transition;
  }
  &:hover {
    color: var(--color-text-white-1);
    background-color: var(--color-btn-2);
    svg {
      transform: rotate(180deg);
    }
    path {
      fill: var(--color-text-white-1);
    }
  }
  &:active {
    border: 1px solid var(--color-border-3);
    color: var(--color-text-white-1);
    background-color: var(--color-btn-1);
    svg {
      transform: rotate(90deg);
    }
    path {
      fill: var(--color-text-white-1);
    }
  }
  &__icon {
    width: 24px;
    height: 24px;
    @include transition;
  }
}
</style>
