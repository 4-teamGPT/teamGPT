<script setup>
import { ThumbsUp } from 'lucide-vue-next'
import { Eye } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const moreViewHandler = (post) => {
  router.push(`/community/${post.id}`)
}
</script>
<template>
  <div>
    <div class="flex my-10 justify-between">
      <h2 class="text-xl font-semibold justify-between dark:text-white">
        <span class="text-[#7537E3] dark:text-[#A878FD]">'스포츠' </span>에 대한 다른 유저의 생각
      </h2>
      <button
        class="text-sm cursor-pointer mt-0.5 underline underline-offset-2 dark:text-[#AEAEAE]"
        @click="moreViewHandler"
      >
        더보기
      </button>
    </div>
    <!-- v-for="post in posts" :key="post.id" -->
    <div
      class="border-1 border-gray-200 dark:border-[#282828] rounded-2xl pt-5 mb-4 hover:bg-[#F6F6F6] dark:hover:bg-[#222222] transition duration-300"
    >
      <div class="h-26">
        <div class="block mt-1 ml-4">
          <p class="text-lg text-gray-800 dark:text-white text-left font-semibold">안녕하세여</p>
          <div class="flex justify-between">
            <span class="mt-5 text-left text-sm justify-between dark:text-white">
              여러분 투표는 누구에게 하셨나여????????? 아무튼 화이팅
            </span>
            <div class="flex justify-center items-center gap-3 mr-5">
              <ThumbsUp class="text-[#B7B7B7] w-4" />
              <Eye class="text-[#B7B7B7] w-4" />
            </div>
          </div>
        </div>
        <hr class="text-gray-300 mt-4 dark:text-[#282828]" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
