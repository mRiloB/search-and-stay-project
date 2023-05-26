<script lang='ts' setup>
defineProps<{
  text: string
  id: number
}>()
</script>

<template>
  <q-item>
    <q-item-section>
      {{ text }}
    </q-item-section>

    <q-item-section side>
      <q-btn size="12px" flat dense round icon="more_vert" />
    </q-item-section>
  </q-item>
</template>

<style lang='scss' scoped></style>
