<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

const props = defineProps({
  schema: { type: Object, required: true },
  initialValues: { type: Object, default: () => ({}) },
  showEmail: { type: Boolean, default: true },
  showName: { type: Boolean, default: true },
  showPasswordFields: { type: Boolean, default: true },
  onCheckEmail: { type: Function, default: null },
  onCheckNickname: { type: Function, default: null },
  isEmailAvailable: { type: Boolean, default: false },
  isNicknameAvailable: { type: Boolean, default: false },
})

const { handleSubmit, errors, defineField, values, setFieldError } = useForm({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.initialValues,
})

const [email, emailAttrs] = defineField('email')
const [name, nameAttrs] = defineField('name')
const [nickname, nicknameAttrs] = defineField('nickname')
const [password, passwordAttrs] = defineField('password')
const [passwordCheck, passwordCheckAttrs] = defineField('passwordCheck')

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

const emit = defineEmits(['submit'])

//컴포넌트에 마운트될 때 초기화
defineExpose({ errors, values, setFieldError })
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col items-center w-full">
    <div v-if="showEmail" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >이메일</label
      >
      <div class="relative flex flex-col">
        <div class="flex items-center relative">
          <input
            type="email"
            v-model="email"
            v-bind="emailAttrs"
            placeholder="이메일 입력"
            required
            :class="[
              'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
              errors.email
                ? 'border-[#F34040]'
                : isEmailAvailable
                  ? 'border-[#00D62B]'
                  : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
            ]"
          />
          <button
            v-if="onCheckEmail"
            type="button"
            @click="onCheckEmail"
            class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer dark:text-[#B185FF] dark:border-[#B185FF] dark:hover:border-[#6524D9] dark:hover:bg-[#6524D9] hover:dark:text-white transition-all duration-300"
          >
            확인
          </button>
        </div>
        <p v-if="errors.email" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.email }}
        </p>
        <p
          v-else-if="isEmailAvailable"
          class="text-[#00D62B] text-[11px] mt-[6px] ml-1 leading-[1.5]"
        >
          사용 가능한 이메일입니다.
        </p>
      </div>
    </div>
    <div v-if="showName" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >이름</label
      >
      <div class="relative flex flex-col">
        <input
          type="text"
          v-model="name"
          v-bind="nameAttrs"
          placeholder="이름 입력"
          required
          :class="[
            'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
            errors.name ? 'border-[#F34040]' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
          ]"
        />
        <p v-if="errors.name" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.name }}
        </p>
      </div>
    </div>
    <div class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >닉네임</label
      >
      <div class="relative flex flex-col">
        <div class="flex items-center relative">
          <input
            type="text"
            v-model="nickname"
            v-bind="nicknameAttrs"
            placeholder="특수문자, 공백 제외 2-8글자"
            required
            :class="[
              'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
              errors.nickname
                ? 'border-[#F34040]'
                : isNicknameAvailable
                  ? 'border-[#00D62B]'
                  : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
            ]"
          />
          <button
            v-if="onCheckNickname"
            type="button"
            @click="onCheckNickname"
            class="w-[51px] h-[28px] text-[#7537e3] text-[13px] rounded-[6px] border font-medium border-[#7537e3] absolute top-1/2 -translate-y-1/2 right-[10px] cursor-pointer dark:text-[#B185FF] dark:border-[#B185FF] dark:hover:border-[#6524D9] dark:hover:bg-[#6524D9] hover:dark:text-white transition-all duration-300"
          >
            확인
          </button>
        </div>
        <p v-if="errors.nickname" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.nickname }}
        </p>
        <p
          v-else-if="isNicknameAvailable"
          class="text-[#00D62B] text-[11px] mt-[6px] ml-1 leading-[1.5]"
        >
          사용 가능한 닉네임입니다.
        </p>
      </div>
    </div>
    <div v-if="showPasswordFields" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >비밀번호</label
      >
      <div class="relative flex flex-col">
        <input
          type="password"
          v-model="password"
          v-bind="passwordAttrs"
          placeholder="비밀번호 입력"
          :required="!!password"
          :class="[
            'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
            errors.password ? 'border-[#F34040]' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
          ]"
        />
        <p v-if="errors.password" class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]">
          {{ errors.password }}
        </p>
      </div>
    </div>
    <div v-if="showPasswordFields" class="mb-5 w-full flex flex-col items-center">
      <label
        class="block text-[14px] font-semibold mb-2 w-[364px] text-left text-[#191919] dark:text-white"
        >비밀번호 확인</label
      >
      <div class="relative flex flex-col">
        <input
          type="password"
          v-model="passwordCheck"
          v-bind="passwordCheckAttrs"
          placeholder="비밀번호 확인"
          :required="!!password"
          :class="[
            'w-[364px] h-[50px] text-[16px] border rounded-[8px] px-3 py-2 focus:outline-none dark:text-white',
            errors.passwordCheck ? 'border-[#F34040]' : 'border-[#DFDFDF] dark:border-[#4D4D4D]',
          ]"
        />
        <p
          v-if="errors.passwordCheck"
          class="text-[#F34040] text-[11px] mt-[6px] ml-1 leading-[1.5]"
        >
          {{ errors.passwordCheck }}
        </p>
      </div>
    </div>
    <button
      type="submit"
      :disabled="$attrs.disabled"
      class="w-[360px] h-[50px] bg-[#7537e3] text-white text-[16px] font-semibold rounded-[8px] mt-[10px] mx-[40px] hover:bg-[#601ED5] cursor-pointer transition-colors duration-300 disabled:bg-[#F2F2F2] disabled:text-[#B3B3B3] dark:disabled:bg-[#363636] disabled:cursor-not-allowed"
    >
      <slot name="submit">회원가입</slot>
    </button>
  </form>
</template>
