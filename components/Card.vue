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

const vote  = ref( null )   // Used for enabling/disabling the Vote Now button and updated by the thumbs button
const voted = ref( false )  // Used for emiting the result of the voting and also to update the eyebrow text and hide/show thumbs buttons

const timeAgo              = computed(() => useTimeAgo( new Date( props.lastUpdated  )))
const imageSrc             = computed(() => `/img/${ props.picture }`)

// Calculate data as percentages to show in the gauge
const percentagePositive   = computed(() => ( props.votesPositive / ( props.votesPositive + props.votesNegative )) * 100 )
const percentageNegative   = computed(() => 100 - percentagePositive.value )

// These are used to show thumbs up or down at the top left of people photo
const isPositive           = computed(() => percentagePositive.value > percentageNegative.value )
const isNegative           = computed(() => percentagePositive.value < percentageNegative.value )

// To know if the layout is List or Grid
const isListLayoutSelected = computed(() => props.layoutSelected === 'List' )

/** 
 * When Vote Now button is clicked, we toggle the visibility of the eye brow text, the thumbs button and update Vote Now inner text.
 * We also emit the vote value so the parent component updates the store.
 */
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
            :src="imageSrc" 
            class="pointer-none" 
            :class="{ 'md:absolute md:left-[-27px] xl:left-0 md:z-0 md:w-[216px] xl:w-[267] md:h-full md:object-cover md:object-left': isListLayoutSelected }"
        >

        <div 
            class="absolute bottom-0 w-full bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.0001)]" 
            :class="{ 'md:static md:z-10 md:bg-card-list-gradient xl:bg-card-list-gradient-desktop': isListLayoutSelected }"
        >
            <div class="flex flex-col" :class="{ 'md:flex-row md:flex-wrap': isListLayoutSelected }">

                <!-- PERSON INFO -->
                <div class="flex mr-[35px]" :class="{ 'md:mr-0 md:shrink md:w-[calc(100%-234px)] xl:w-[calc(100%-280px)]': isListLayoutSelected }">
                    <div 
                        class="bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0 xl:mt-2"
                        :class="{ hidden: isPositive, 'xl:w-[45px] xl:h-[45px] xl:mt-0': isListLayoutSelected }"
                    >
                        <img 
                            src="/img/thumbs-down.svg" 
                            alt="Thumbs down icon" 
                            :class="{ 'xl:w-[24px] xl:h-[24px]': isListLayoutSelected }" 
                        />
                    </div>
                    <div 
                        class="bg-[rgba(60,187,180,0.8)] w-[30px] h-[30px] flex items-center justify-center shrink-0 xl:mt-2"
                        :class="{ hidden: isNegative, 'xl:w-[45px] xl:h-[45px] xl:mt-0': isListLayoutSelected }"
                    >
                        <img 
                            src="/img/thumbs-up.svg" 
                            alt="Thumbs up icon" 
                            :class="{ 'xl:w-[24px] xl:h-[24px]': isListLayoutSelected }" 
                        />
                    </div>
                    <div class="ml-1.5" :class="{ 'md:ml-[120px] xl:ml-[214px]': isListLayoutSelected }">
                        <h6 
                            class="text-white text-3xl xl:text-[36px]" 
                            :class="{ 'text-[28px] xl:leading-[63px]': isListLayoutSelected }"
                        >
                            {{ name }}
                        </h6>

                        <p 
                            class="text-white mt-1.5 text-[15px] md:leading-[18px] xl:leading-[18px] text-ellipsis" 
                            :class="{ 'md:mt-5 xl:mt-0 xl:text-[18px] md:leading-[16.5px] xl:leading-[21.6px]': isListLayoutSelected }"
                        >
                            {{ description }}
                        </p>
                    </div>
                </div>
                
                <!-- LAST UPDATED AND CALL TO ACTION -->
                <div class="mt-3 mr-[35px]" :class="{ 'md:mr-4 md:w-[191px] xl:w-auto md:ml-auto': isListLayoutSelected }">
                    <p 
                        class="text-white text-right text-[12px] font-bold" 
                        :class="{ 'xl:text-[15px]': isListLayoutSelected }"
                    >
                        <span :class="{ hidden: voted }">{{ timeAgo.value.replace('"', '') }} in <span class="capitalize">{{ category }}</span></span>
                        <span :class="{ hidden: !voted }">Thank you for voting!</span>
                    </p>
                    
                    <div class="flex justify-end gap-[12px] items-center mt-3">
                        <button 
                            class="bg-[rgba(60,187,180,0.8)] w-[30px] h-[30px] flex items-center justify-center shrink-0 border-white"
                            :class="
                                { 
                                    'border-2': vote === 'up', 
                                    hidden: voted, 
                                    'xl:w-[45px] xl:h-[45px]': isListLayoutSelected 
                                }"
                            @click="vote = 'up'"
                        >
                            <img 
                                src="/img/thumbs-up.svg" 
                                alt="Thumbs up icon" 
                                :class="{ 'xl:w-[24px] xl:h-[24px]': isListLayoutSelected }" 
                            />
                        </button>
                        <button 
                            class="bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0 border-white"
                            :class="
                                { 
                                    'border-2': vote === 'down', 
                                    hidden: voted, 
                                    'xl:w-[45px] xl:h-[45px]': isListLayoutSelected 
                                }"
                            @click="vote = 'down'"
                        >
                            <img   
                                src="/img/thumbs-down.svg" 
                                alt="Thumbs down icon" 
                                :class="{ 'xl:w-[24px] xl:h-[24px]': isListLayoutSelected }" 
                            />
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
                            :class="{ 'xl:w-[22.5px] xl:h-[22.5px]': isListLayoutSelected }" 
                        />
                        <p 
                            class="text-white text-lg ml-1.5" 
                            :class="{ 'xl:text-[27px]': isListLayoutSelected }" 
                        >
                            {{ percentagePositive.toFixed( 1 )}}%
                        </p>
                    </div>
                    <div class="absolute right-3.5 top-1.5 xl:top-0.5 flex items-center">
                        <p 
                            class="text-white text-lg mr-1.5" 
                            :class="{ 'xl:text-[27px]': isListLayoutSelected }"
                        >
                            {{ percentageNegative.toFixed( 1 )}}%
                        </p>
                        
                        <img 
                            src="/img/thumbs-down.svg" 
                            alt="Thumbs down icon" 
                            :class="{ 'xl:w-[22.5px] xl:h-[22.5px]': isListLayoutSelected }" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
