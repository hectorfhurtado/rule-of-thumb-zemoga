<script lang="ts" setup>
interface PersonVotes 
{
    name:           string
    description:    string
    category:       string
    picture:        string
    lastUpdated:    string
    votesPositive:  number
    votesNegative:  number
    layoutSelected: 'Grid' | 'List'
}

const props = defineProps<PersonVotes>()
const emit  = defineEmits<{
    ( e: 'vote', vote: string, name: string ): void
}>()

const vote  = ref( null )
const voted = ref( false )

const timeAgo              = computed(() => useTimeAgo( new Date( props.lastUpdated  )))
const imageSrc             = computed(() => `/img/${ props.picture }`)
const percentagePositive   = computed(() => ( props.votesPositive / ( props.votesPositive + props.votesNegative )) * 100 )
const percentageNegative   = computed(() => 100 - percentagePositive.value )
const isPositive           = computed(() => percentagePositive.value > percentageNegative.value )
const isNegative           = computed(() => percentagePositive.value < percentageNegative.value )
const isListLayoutSelected = computed(() => props.layoutSelected === 'List' )

function voteAction()
{
    voted.value = !voted.value

    if ( voted.value == false )
        vote.value = null

    if ( voted.value )
        emit( 'vote', vote.value, props.name )
}
</script>

<template>
    <div class="card w-full relative flex flex-col md:overflow-hidden">
        <img 
            :alt="name" 
            class="pointer-none" 
            :src="imageSrc" 
            :class="{ 'md:absolute md:left-[-27px] md:z-0 md:w-[216px] md:h-full md:object-cover md:object-left': isListLayoutSelected }"
        >

        <div 
            class="absolute bottom-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.0001)]" 
            :class="{ 'md:static md:z-10 md:bg-card-list-gradient': isListLayoutSelected }"
        >
            <div class="flex flex-col" :class="{ 'md:flex-row md:flex-wrap': isListLayoutSelected }">

                <!-- PERSON INFO -->
                <div class="flex mr-[35px]" :class="{ 'md:mr-0 md:shrink md:w-[calc(100%-234px)]': isListLayoutSelected }">
                    <div 
                        class="bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0"
                        :class="{ hidden: isPositive }"
                    >
                        <img src="/img/thumbs-down.svg" alt="Thumbs down icon" />
                    </div>
                    <div 
                        class="bg-[rgba(60,187,180,0.8)] w-[30px] h-[30px] flex items-center justify-center shrink-0"
                        :class="{ hidden: isNegative }"
                    >
                        <img src="/img/thumbs-up.svg" alt="Thumbs up icon" />
                    </div>
                    <div class="ml-1.5" :class="{ 'md:ml-[120px]': isListLayoutSelected }">
                        <h6 class="text-white text-3xl" :class="{ 'text-[28px]': isListLayoutSelected }">{{ name }}</h6>

                        <p class="text-white mt-1.5 text-[15px] text-ellipsis" :class="{ 'md:mt-5': isListLayoutSelected }">{{ description }}</p>
                    </div>
                </div>
                
                <!-- LAST UPDATED AND CALL TO ACTION -->
                <div class="mt-3 mr-[35px]" :class="{ 'md:mr-4 md:w-[191px] md:ml-auto': isListLayoutSelected }">
                    <p class="text-white text-right font-xs font-bold">
                        <span :class="{ hidden: voted }">{{ timeAgo.value.replace('"', '') }} in <span class="capitalize">{{ category }}</span></span>
                        <span :class="{ hidden: !voted }">Thank you for voting!</span>
                    </p>
                    
                    <div class="flex justify-end gap-[12px] items-center mt-3">
                        <button 
                            class="bg-[rgba(60,187,180,0.8)] w-[30px] h-[30px] flex items-center justify-center shrink-0 border-white"
                            :class="{ 'border-2': vote === 'up', hidden: voted }"
                            @click="vote = 'up'"
                        >
                            <img src="/img/thumbs-up.svg" alt="Thumbs up icon" />
                        </button>
                        <button 
                            class="bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0 border-white"
                            :class="{ 'border-2': vote === 'down', hidden: voted }"
                            @click="vote = 'down'"
                        >
                            <img src="/img/thumbs-down.svg" alt="Thumbs down icon" />
                        </button>
                        <button 
                            class="
                                w-[107px] 
                                flex justify-center items-center 
                                text-white text-[15px] 
                                p-2.5 
                                bg-[rgba(48,48,48,0.6)] hover:bg-[rgba(0,0,0,0.6)] disabled:bg-[rgba(0,0,0,0.6)] 
                                border border-white
                            "
                            :disabled="vote === null"
                            @click="voteAction"
                        >
                            Vote {{ voted ? 'Again' : 'Now' }}
                        </button>
                    </div>
                </div>

                <!-- POLL STATISTICS -->
                <div class="mt-3 h-[36px] relative flex w-full" :class="{ 'md:mt-5': isListLayoutSelected }">
                    <div 
                        class="bg-[rgba(60,187,180,0.6)] w-full h-full max-w-[var(--negative-total)]" 
                        :style="{ '--negative-total': `${ percentagePositive }%`}"
                    ></div>
                    <div 
                        class="bg-[rgba(249,173,29,0.6)] w-full h-full max-w-[var(--positive-total)]" 
                        :style="{ '--positive-total': `${ percentageNegative }%`}"
                    ></div>

                    <div class="absolute left-3 top-1.5 flex items-center">
                        <img src="/img/thumbs-up.svg" alt="Thumbs up icon" />
                        <p class="text-white text-lg ml-1.5">{{ percentagePositive.toFixed( 1 )}}%</p>
                    </div>
                    <div class="absolute right-3 top-1.5 flex items-center">
                        <img src="/img/thumbs-down.svg" alt="Thumbs down icon" />
                        <p class="text-white text-lg ml-1.5">{{ percentageNegative.toFixed( 1 )}}%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
