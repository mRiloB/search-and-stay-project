<script lang='ts' setup>
import { useRulesStore } from 'src/stores/rules-store'
import { HouseRule } from 'src/types/house-rule'
import { ref, toRefs } from 'vue'

const emits = defineEmits(['edit'])
const props = defineProps<{
  text: string
  rule: HouseRule
}>()
const { rule: ruleObj } = toRefs(props)

const rulesStore = useRulesStore()
const showDelete = ref(false)

async function deleteRule () {
  const id = ruleObj.value.id
  await rulesStore.deleteRule(Number(id))
  showDelete.value = false
}
</script>

<template>
  <q-item>
    <q-item-section :class="ruleObj.active == 0 ? 'disabled-item' : ''">
      {{ text }}
    </q-item-section>

    <q-item-section side>
      <q-btn size="12px" flat dense round icon="more_vert">
        <q-menu auto-close>
          <q-list style="min-width: 100px">
            <q-item clickable @click="emits('edit', rule)">
              <q-item-section class="menu-item">
                <q-icon class="q-mr-sm" size="xs" name="edit" />
                Edit
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable @click="showDelete = true">
              <q-item-section class="menu-item">
                <q-icon class="q-mr-sm" size="xs" name="delete_outline" />
                Delete
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>

    <q-dialog v-model="showDelete" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you want to delete this rule?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn flat label="Yes" color="primary" @click="deleteRule" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-item>
</template>

<style lang='scss' scoped>
.menu-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.disabled-item {
  text-decoration: line-through;
}
</style>
