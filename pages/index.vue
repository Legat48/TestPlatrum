<template>
  <div class="content">
    <BaseTable />
    <BaseForm />
  </div>
</template>

<script>
export default {
  middleware: [],
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  padding: sizeIncr(24, 48);
  justify-content: space-between;
  width: 100%;
}
</style>
