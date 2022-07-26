<script lang="ts" setup>
import { usePollStore } from '~~/stores/poll'

const pollStore = usePollStore()

const layoutSelected = ref<'List' | 'Grid'>( 'List' )
const layoutList     = computed(() => layoutSelected.value === 'List' ? [ 'md:flex', 'md:flex-col' ] : [ 'md:grid', 'md:grid-cols-2' ])

function updateVote( vote, name )
{
    pollStore.addVote( name, vote )
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
        <h3 class="text-gray-600 text-[28px] md:text-2xl font-light leading-7">Previous Rulings {{ layoutSelected }}</h3>

        <select class="hidden md:block text-[rgba(51,51,51,1)] border-2 border-[rgba(51,51,51,1)] w-[131px] text-center text-[10.5px] h-8" v-model="layoutSelected">
            <option selected>List</option>
            <option>Grid</option>
        </select>
    </div>

    <div class="cards-container w-[100vw] md:w-full -mx-4 md:mx-0 mt-6 md:mt-[29px]">
        <div 
            class="flex flex-row w-full gap-4 md:gap-[21px] overflow-x-auto snap-x snap-mandatory touch-pan-x"
            :class="layoutList"
        >
            <Card v-for="(dato, index) in pollStore.data" :key="index" class="w-full max-w-[80vw] md:max-w-none shrink-0 snap-center first:ml-4 md:first:ml-0 last:mr-4 md:last:-mr-0"
                :name="dato.name"
                :description="dato.description"
                :category="dato.category"
                :picture="dato.picture"
                :lastUpdated="dato.lastUpdated"
                :votesPositive="dato.votes.positive"
                :votesNegative="dato.votes.negative"
                :layoutSelected="layoutSelected"
                @vote="updateVote"
            />
        </div>
    </div>
  </div>
</template>

<style scoped></style>
