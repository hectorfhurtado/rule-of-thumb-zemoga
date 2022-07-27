<script lang="ts" setup>
import { title } from 'process';
import { usePollStore } from './stores/poll';

// We start by populating the store's state
const store = usePollStore()
store.populateState()

useHead(
    {
        title: 'Rule of Thumb',
        meta:
        [
            { name: 'description', content: 'Rule of Thumb components show off' }
        ]
    }
)
</script>

<template>
  <div>
    <NuxtLayout>
        <PreviousRulings />
    </NuxtLayout>
  </div>
</template>
