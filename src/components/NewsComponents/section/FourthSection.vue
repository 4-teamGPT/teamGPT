<script setup>
import NewsComponent5 from '@/components/NewsComponents/NewsComponent5.vue'
import { useInterestStore } from '@/stores/interestStore'
import { computed, onMounted, ref } from 'vue'

const randomIndex = ref(0)
const interestStore = useInterestStore()
const interestList = computed(() => interestStore.interestList)

const props = defineProps({
  newsArr: {
    type: Array,
  },
  loading: {
    type: Boolean,
  },
  newsSaveHandler: Function,
  newsDetail: Function,
})

// 안전하게 newsArr 변수 생성
const newsArr = computed(() => props.newsArr || [])

onMounted(async () => {
  if (newsArr.value.length > 0) {
    randomIndex.value = Math.floor(Math.random() * props.newsArr.length)
  }
})
</script>
<template>
  <div class="flex flex-col">
    <!-- 제목 -->
    <div class="select-none flex items-center gap-[20px] font-semibold mb-[30px]">
      <h1 class="flex gap-[10px] items-center">
        <img :src="interestList[3].icon" />
        <p class="text-[30px] text-[var(--text-title)] font-bold">{{ interestList[3].label }}</p>
      </h1>
      <div class="flex">
        <h2 class="text-[var(--text-sub-purple)] text-[16px]">나의 관심사</h2>
      </div>
      <div class="ml-auto cursor-pointer">
        <h3 class="text-[16px] text-[var(--show-more)] underline font-medium select-none">
          더보기
        </h3>
      </div>
    </div>
    <div class="flex flex-col">
      <!-- 뉴스 목록 -->
      <div class="w-[600px]" v-if="newsArr.length >= 2">
        <div class="flex flex-col gap-[15px]">
          <NewsComponent5
            :news-save-handler="newsSaveHandler"
            v-if="newsArr[0]"
            :news="newsArr[0]"
          />
          <NewsComponent5
            :news-save-handler="newsSaveHandler"
            v-if="newsArr[1]"
            :news="newsArr[1]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
