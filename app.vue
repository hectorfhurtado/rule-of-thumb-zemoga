<script lang="ts" setup>
import { usePollStore } from './stores/poll';

const store = usePollStore()

store.populateState()
</script>

<template>
  <div>
    <NuxtLayout>
        <PreviousRulings />
    </NuxtLayout>
  </div>
</template>
