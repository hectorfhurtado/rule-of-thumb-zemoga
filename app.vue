<script lang="ts" setup>
import { usePollStore } from './stores/poll';

// We start by populating the store's state
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
