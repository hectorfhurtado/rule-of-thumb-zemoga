<script lang="ts" setup>
import { usePollStore } from '~~/stores/poll'

const pollStore = usePollStore()

const layoutSelected = ref<'List' | 'Grid'>( 'Grid' )
const layoutList     = computed(() => layoutSelected.value === 'List' ? [ 'md:flex', 'md:flex-col' ] : [ 'md:grid md:grid-cols-2 xl:grid-cols-3' ])

/** 
 * We take the vote (up or down) and the person name and pass it to the store for updating it
 */
function updateVote( vote: string, name: string )
{
    pollStore.addVote( name, vote )
}
</script>

<template>
  <div v-if="pollStore.data.length > 0">
    <div class="flex justify-between items-center">
        <h3 class="text-gray-600 text-[28px] md:text-[24px] md:leading-[28.8px] xl:text-[45px] font-light leading-7">Previous Rulings</h3>

        <div class="hidden md:block relative">
            <img 
                src="/img/triangle.svg" 
                alt="triangle icon" 
                class="absolute top-[10px] xl:top-[14px] right-[14px] pointer-events-none"
            >

            <select 
                v-model="layoutSelected"
                class="
                    w-[131px] xl:w-[173px] 
                    h-[28px] md:h-[28px] xl:h-[36px] 
                    border-2 border-[rgba(51,51,51,1)] 
                    text-[rgba(51,51,51,1)] text-center text-[10.5px] xl:text-[13.5px] 
                    appearance-none
                " 
            >
                <option>List</option>
                <option selected>Grid</option>
            </select>
        </div>
    </div>

    <div class="cards-container w-[100vw] md:w-full -mx-4 md:mx-0 mt-6 md:mt-[29px] xl:mt-8">
        <div 
            class="flex flex-row w-full gap-4 md:gap-[21px] xl:gap-[27px] overflow-x-auto snap-x snap-mandatory touch-pan-x"
            :class="layoutList"
        >
            <!-- I COULD PASS DATO AS AN OBJECT BUT IS BETTER TO EXPLICIT ABOUT WHAT THE COMPONENT NEEDS TO WORK -->
            <Card 
                v-for="(dato, index) in pollStore.data" 
                :key="index" 
                class="w-full max-w-[80vw] md:max-w-none shrink-0 snap-center first:ml-4 md:first:ml-0 last:mr-4 md:last:-mr-0"
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
