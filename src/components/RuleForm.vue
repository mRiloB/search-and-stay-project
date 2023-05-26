<script lang='ts' setup>
import { ref, toRefs, onMounted } from 'vue'
import { useRulesStore } from 'src/stores/rules-store'
import { HouseRule } from 'src/types/house-rule'

const emits = defineEmits(['close', 'finish'])
const props = defineProps<{
  listRule: HouseRule | null
}>()
const { listRule: lrule } = toRefs(props)

onMounted(() => {
  if (lrule.value) {
    ruleForm.value = lrule.value
  }
})

const rulesStore = useRulesStore()
const ruleForm = ref<HouseRule>({ name: '', active: 1 })
const requiredRules = [(val: string) => val && val.length > 0 || 'Please type something']

async function create () {
  const payload = { name: ruleForm.value.name, active: 1 }
  if (lrule.value) {
    await rulesStore.editRule(payload)
  } else {
    await rulesStore.createRule(payload)
  }

  emits('finish')
}
</script>

<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">{{ lrule?.id ? 'Edit' : 'Create' }} rule</div>
    </q-card-section>

    <q-card-section>
      <q-form @submit="create" class="q-gutter-md">
        <q-input filled v-model="ruleForm.name" label="Rule" lazy-rules :rules="requiredRules" />
        <!-- <q-input filled v-model="ruleForm.active" label="Active" lazy-rules :rules="requiredRules" /> -->

        <div>
          <q-btn flat label="Cancel" @click="emits('close')" color="negative" />
          <q-btn flat :label="lrule?.id ? 'Edit' : 'Create'" color="primary" type="submit" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style lang='scss' scoped></style>
