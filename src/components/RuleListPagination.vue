<script lang='ts' setup>
import { useRulesStore } from 'src/stores/rules-store'

const rulesStore = useRulesStore()

</script>

<template>
  <div class="pagination-cmp">
    <q-btn color="primary" icon="arrow_back" @click="rulesStore.previousPage()" :disable="rulesStore.hasPreviousPage" />
    <span class="q-mx-lg">{{ rulesStore.currentPage }}</span>
    <q-btn color="primary" icon="arrow_forward" @click="rulesStore.nextPage()" :disable="rulesStore.hasNextPage" />
  </div>
</template>

<style lang='scss' scoped>
.pagination-cmp {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
}
</style>
