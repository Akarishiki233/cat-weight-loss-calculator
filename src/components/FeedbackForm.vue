<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Web3Forms: free form-to-email API, no backend needed.
// Signup (free, ~1 min) at https://web3forms.com with the owner's email,
// then paste the access key below. The key is public-safe (it's an alias
// for the inbox, per Web3Forms FAQ) — but the raw email stays hidden,
// unlike FormSubmit which exposed it in the endpoint URL.
const ENDPOINT = 'https://api.web3forms.com/submit'
// TODO(jay): replace with the real key from web3forms.com
const ACCESS_KEY = 'b6745b53-ab07-485f-9fae-26c757b2f5cb'
// Shown only as a last-resort fallback when the API is unreachable.
const CONTACT_EMAIL = 'akrishiki4869@gmail.com'

const name = ref('')
const email = ref('')
const message = ref('')
const honey = ref('') // honeypot: bots fill it, humans never see it
const status = ref('idle') // idle | sending | success | error

async function submit() {
  if (status.value === 'sending' || !message.value.trim()) return
  status.value = 'sending'
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
        subject: '🐾 Cat calculator feedback',
        from_name: 'Cat Calorie Calculator',
        botcheck: honey.value, // honeypot: bots fill it, humans never see it
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.ok && data.success) {
      status.value = 'success'
      name.value = ''
      email.value = ''
      message.value = ''
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div v-reveal class="card feedback-form">
    <h2>{{ t('feedback.title') }}</h2>
    <p class="fb-desc">{{ t('feedback.desc') }}</p>
    <form v-if="status !== 'success'" @submit.prevent="submit">
      <div class="fb-row">
        <div class="fb-field">
          <label>{{ t('feedback.name') }}</label>
          <input v-model="name" type="text" :placeholder="t('feedback.namePh')" autocomplete="name" />
        </div>
        <div class="fb-field">
          <label>{{ t('feedback.email') }}</label>
          <input v-model="email" type="email" :placeholder="t('feedback.emailPh')" autocomplete="email" />
        </div>
      </div>
      <div class="fb-field">
        <label>{{ t('feedback.message') }}</label>
        <textarea v-model="message" rows="4" required :placeholder="t('feedback.messagePh')"></textarea>
      </div>
      <!-- honeypot: invisible to humans -->
      <input v-model="honey" type="text" name="botcheck" class="fb-honey" tabindex="-1" autocomplete="off" />
      <button class="fb-send" type="submit" :disabled="status === 'sending' || !message.trim()">
        {{ status === 'sending' ? t('feedback.sending') : t('feedback.submit') }}
      </button>
      <p v-if="status === 'error'" class="fb-error">
        {{ t('feedback.error') }}<br />
        <a :href="'mailto:' + CONTACT_EMAIL">{{ t('feedback.fallback') }}</a>
      </p>
    </form>
    <p v-else class="fb-success">{{ t('feedback.success') }}</p>
  </div>
</template>

<style scoped>
.feedback-form .fb-desc {
  color: var(--muted);
  font-size: 14px;
  margin: 4px 0 16px;
}
.feedback-form .fb-row {
  display: flex;
  gap: 12px;
}
.feedback-form .fb-field {
  flex: 1;
  margin-bottom: 12px;
}
.feedback-form .fb-field label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
}
.feedback-form input[type='text'],
.feedback-form input[type='email'],
.feedback-form textarea {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid var(--line);
  border-radius: 14px;
  font-size: 15px;
  font-family: inherit;
  background: #fff;
  color: var(--ink);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.feedback-form input:focus,
.feedback-form textarea:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.12);
}
.feedback-form textarea {
  resize: vertical;
}
.feedback-form .fb-honey {
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
}
.feedback-form .fb-send {
  width: 100%;
  margin-top: 4px;
  padding: 14px;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(135deg, var(--brand), #ea580c);
}
.feedback-form .fb-send:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.feedback-form .fb-send:not(:disabled):hover {
  transform: translateY(-1px);
}
.feedback-form .fb-error {
  color: #dc2626;
  font-size: 14px;
  margin-top: 10px;
}
.feedback-form .fb-success {
  font-size: 16px;
  font-weight: 700;
  margin: 8px 0 4px;
}
@media (max-width: 520px) {
  .feedback-form .fb-row {
    flex-direction: column;
    gap: 0;
  }
}
</style>
