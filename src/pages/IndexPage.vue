<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRulesStore } from 'stores/rules-store'
import RuleListItem from 'src/components/RuleListItem.vue'
import RuleForm from 'src/components/RuleForm.vue'
import { HouseRule } from 'src/types/house-rule'

onMounted(() => list())

const rulesStore = useRulesStore()
const showForm = ref(false)
const _rule = ref<null | HouseRule>(null)

async function list () {
  await rulesStore.loadRules()
}

async function afterForm () {
  _rule.value = null
  showForm.value = false
}
</script>

<template>
  <q-page padding>
    <p v-if="rulesStore.list.length == 0">No rules. Add a new rule in the button bellow.</p>
    <q-list v-for="(rule, index) in rulesStore.list" :key="index" class="rounded-borders q-mb-sm" bordered v-else>
      <rule-list-item :id="rule.id!" :text="rule.name" />
    </q-list>
    <q-dialog v-model="showForm" persistent>
      <rule-form :list-rule="_rule" @finish="afterForm" @close="showForm = false" />
    </q-dialog>
    <q-inner-loading :showing="rulesStore.isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="showForm = true" />
    </q-page-sticky>
  </q-page>
</template>
