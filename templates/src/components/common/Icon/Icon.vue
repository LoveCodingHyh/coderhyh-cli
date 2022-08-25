<template>
  <el-icon :size="size || 12">
    <i :class="className" />
  </el-icon>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string | unknown
  size?: string
}>()

const className = computed(() => {
  const { icon } = props
  return [icon || 'carbon:unknown']
})
// 将用到的icon添加到这个数组  https://icones.js.org/
const icons = []
</script>

<style scoped></style>
