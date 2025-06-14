const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

export const fetchOpenAi = async (description) => {
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: [
          {
            role: 'user',
            content: `
            다음 뉴스 내용의 키워드를 찾아내서 친구한테 말해주는 것처럼 자연스럽고 친근하게 요약해줘.

            - 3줄로 나눠서 알려줘.
            - 각 줄은 1. 2. 3.으로 시작해.
            - 각 문장도 짧게짧게 만들어줘.
            - 말투는 친구처럼 캐주얼하게. 20~30대가 좋아할 만한 친근한 느낌.
            - 내용에 어울리는 이모지를 넣어서
            - 기승전결이 들어가도록
            **단, 기사에 없는 내용은 절대 쓰지 마.**

              뉴스 내용:
              "${description}"
              `,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    })
    const data = await res.json()
    return data.choices[0].message.content
  } catch (err) {
    console.error('요약 중 오류', err)
    return null
  }
}
