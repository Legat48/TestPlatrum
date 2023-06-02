<template>
  <div class="countries">
    <!-- надо ждать загрузку -->
    <div class="countries__wrap">
      <div
        v-for="child in countries"
        :key="child.name"
        class="countries__item"
      >
        <CountryDropdown :country="child" />
      </div>
    </div>

    <v-progress-circular
      v-if="$store.state.filter.newCompaniesLoading"
      class="countries__preloader"
      color="primary"
      indeterminate
      size="20"
    />
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'

export default {
  filters: {
    numberFormat
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    countries () {
      return this.$store.getters['countries/getCountries']
    },
    selectedCountries () {
      return this.$store.getters['countries/getSelectedCountries']
    }
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
.countries {
  position: relative;
  display: flex;
  justify-content: center;
  padding: sizeIncr(10, 40) 0 sizeIncr(10, 40) sizeIncr(10, 40);
  width: 100%;
  background-color: transparent;
  &__wrap {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow-x: scroll;
    @media (min-width: 569px) {
      flex-direction: row;
      justify-content: flex-start;
    }
  }
  &__item {
    position: relative;
    margin:0 sizeIncr(0, 24) sizeIncr(0, 24) 0;
    width: sizeIncr(357, 390);
    background-color: transparent;
    box-shadow: 3px 0px 28px rgba(0, 0, 0, 0.01);
    &_list {
      padding: 10px 19px 0;
      color: var(--color-text-white-1);
    }
  }
}
</style>
