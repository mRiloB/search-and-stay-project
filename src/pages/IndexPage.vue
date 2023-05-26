<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHouseRules } from 'src/services/house-roules'
import { HouseRule } from 'src/types/house-rule'
import RuleListItem from 'src/components/RuleListItem.vue'

onMounted(() => list())

const houseRules = useHouseRules()
const houseRulesList = ref<HouseRule[]>([])
const _loading = ref(false)

async function list () {
  _loading.value = true
  try {
    const res = await houseRules._read()
    houseRulesList.value = res.data.entities
  } catch (err) {
    console.log('IndexPageError:', err)
  } finally {
    _loading.value = false
  }
}
</script>

<template>
  <q-page padding>
    <p v-if="houseRulesList.length == 0">No rules. Add a new rule in the button bellow.</p>
    <q-list v-for="(rule, index) in houseRulesList" :key="index" class="rounded-borders q-mb-sm" bordered v-else>
      <rule-list-item :id="rule.id!" :text="rule.name" />
    </q-list>
    <q-inner-loading :showing="_loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>
