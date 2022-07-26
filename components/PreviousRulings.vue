<script lang="ts" setup></script>

<template>
  <div>
    <h3 class="mb-6 text-gray-600 text-[28px] font-light leading-7">Previous Rulings</h3>

    <div class="card w-full relative flex flex-col">
        <img src="/img/elon.png" alt="elon" class="pointer-none">

        <div class="absolute bottom-0 w-full">
            <div class="flex flex-col">
                <!-- PERSON INFO -->
                <div class="flex mr-[35px]">
                    <div class="bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0">
                        <img src="/img/thumbs-down.svg" alt="Thumbs down icon" />
                    </div>
                    <div class="bg-[#3CBBB4CC] w-[30px] h-[30px] flex items-center justify-center shrink-0">
                        <img src="/img/thumbs-up.svg" alt="Thumbs up icon" />
                    </div>
                    <div class="ml-1.5">
                        <h6 class="text-white text-3xl">Name LastName</h6>

                        <p class="text-white mt-1.5 text-[15px]">Vestibulum diam ante, porttitor a odio eget, rhoncus neque. Aenean eu velit…</p>
                    </div>
                </div>

                <!-- LAST UPDATED AND CALL TO ACTION -->
                <div class="mt-3 mr-[35px]">
                    <p class="text-white text-right font-xs font-bold">1 month ago in Entertainment</p>
                    
                    <div class="flex justify-end gap-[12px] items-center mt-3">
                        <button class="bg-[#3CBBB4CC] w-[30px] h-[30px] flex items-center justify-center shrink-0">
                            <img src="/img/thumbs-up.svg" alt="Thumbs up icon" />
                        </button>
                        <button class="bg-[#FBBD4A] w-[30px] h-[30px] flex items-center justify-center shrink-0">
                            <img src="/img/thumbs-down.svg" alt="Thumbs down icon" />
                        </button>
                        <button class="text-white text-[15px] w-[107px] flex justify-center items-center p-2.5 bg-[rgba(48,48,48,0.6)] hover:bg-[rgba(0,0,0,0.6)] border border-white">
                            Vote Now
                        </button>
                    </div>
                </div>

                <!-- POLL STATISTICS -->
                <div class="mt-3 h-[36px] relative flex">
                    <div class="bg-[rgba(60,187,180,0.6)] w-full h-full max-w-[var(--negative-total)]" style="--negative-total: 74.5%"></div>
                    <div class="bg-[rgba(249,173,29,0.6)] w-full h-full max-w-[var(--positive-total)]" style="--positive-total: 25.5%"></div>

                    <div class="absolute left-3 top-2.5 flex items-center">
                        <img src="/img/thumbs-up.svg" alt="Thumbs up icon" />
                        <p class="text-white text-lg ml-1.5">74.5%</p>
                    </div>
                    <div class="absolute right-3 top-2.5 flex items-center">
                        <img src="/img/thumbs-down.svg" alt="Thumbs down icon" />
                        <p class="text-white text-lg ml-1.5">25.5%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped></style>
