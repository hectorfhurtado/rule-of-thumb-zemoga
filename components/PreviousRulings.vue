<script lang="ts" setup>
import { usePollStore } from '~~/stores/poll'

const pollStore = usePollStore()

function updateVote( vote, name )
{
    pollStore.addVote( name, vote )
}
</script>

<template>
  <div>
    <h3 class="mb-6 text-gray-600 text-[28px] font-light leading-7">Previous Rulings</h3>

    <div class="cards-container w-[100vw] -mx-4">
        <div class="flex flex-row w-full gap-4 overflow-x-auto snap-x snap-mandatory touch-pan-x">
            <Card v-for="(dato, index) in pollStore.data" :key="index" class="w-full max-w-[80vw] shrink-0 snap-center first:ml-4 last:mr-4"
                :name="dato.name"
                :description="dato.description"
                :category="dato.category"
                :picture="dato.picture"
                :lastUpdated="dato.lastUpdated"
                :votesPositive="dato.votes.positive"
                :votesNegative="dato.votes.negative"
                @vote="updateVote"
            />
        </div>
    </div>
  </div>
</template>

<style scoped></style>
