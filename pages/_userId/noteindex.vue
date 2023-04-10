<template>
  <div>
    <div>ID: {{ $route.params.userId }}</div>
    <h1>メモ一覧</h1>
  </div>
</template>
<script>
export default {
  computed: {
    userId() {
      return this.$route.params.userId
    },
  },
}
</script>
