<script lang="ts" setup>
const gaugeProps = defineProps<{
    votesPositive:  number
    votesNegative:  number
    layoutSelected: 'Grid' | 'List'
}>()

const isGaugeListLayoutSelected = computed(() => gaugeProps.layoutSelected === 'List' )

const percentagePositive   = computed(() => ( gaugeProps.votesPositive / ( gaugeProps.votesPositive + gaugeProps.votesNegative )) * 100 )
const percentageNegative   = computed(() => 100 - percentagePositive.value )
</script>

<template>
    <div class="mt-3 h-[36px] relative flex w-full" :class="{ 'md:mt-5': isGaugeListLayoutSelected }" data-testid="cardgauge">
        <h3 class="sr-only">Gauge with Votes percenages</h3>
        <div 
            class="bg-[rgba(60,187,180,0.6)] w-full h-full max-w-[var(--negative-total)]" 
            :style="{ '--negative-total': `${ percentagePositive }%` }"
        ></div>
        <div 
            class="bg-[rgba(249,173,29,0.6)] w-full h-full max-w-[var(--positive-total)]" 
            :style="{ '--positive-total': `${ percentageNegative }%` }"
        ></div>

        <div class="absolute left-3.5 top-1.5 xl:top-0.5 flex items-center">
            <img 
                src="/img/thumbs-up.svg" 
                alt="Thumbs up icon" 
                :class="{ 'xl:w-[22.5px] xl:h-[22.5px]': isGaugeListLayoutSelected }" 
            />
            <p 
                class="text-white text-lg ml-1.5" 
                :class="{ 'xl:text-[27px]': isGaugeListLayoutSelected }" 
                aria-description="Percentage of overall positive votes"
            >
                {{ percentagePositive.toFixed( 1 )}}%
            </p>
        </div>
        <div class="absolute right-3.5 top-1.5 xl:top-0.5 flex items-center">
            <p 
                class="text-white text-lg mr-1.5" 
                :class="{ 'xl:text-[27px]': isGaugeListLayoutSelected }"
                aria-description="Percentage of overall negative votes"
            >
                {{ percentageNegative.toFixed( 1 )}}%
            </p>
            
            <img 
                src="/img/thumbs-down.svg" 
                alt="Thumbs down icon" 
                :class="{ 'xl:w-[22.5px] xl:h-[22.5px]': isGaugeListLayoutSelected }" 
            />
        </div>
    </div>
</template>
