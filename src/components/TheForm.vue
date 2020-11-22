<template>
  <section id="contact">
    <form class="form"
          @submit.prevent="checkForm"
          action="/contact"
          method="post"
          autocomplete="off">
      <div ref="grecaptcha"></div>
      <div class="container">
        <hgroup>
          <h2 class="form__title">What are YOU waiting for?</h2>
          <h3 class="form__subtitle">Start your project now!</h3>
        </hgroup>
        <div class="form-group--flex">
          <div class="form-group">
            <label class="label" for="name">Name*</label>
            <input
              id="name"
              class="control"
              :class="{ 'control--error': $v.name.$error }"
              v-model="$v.name.$model"
              :disabled="isDisabled">
          </div>
          <div class="form-group">
            <label class="label" for="email">
              E-mail*
              <span class="error__message" v-show="$v.email.$error && !$v.email.email">
              Fill in a valid email
            </span>
            </label>
            <input
              id="email"
              type="text"
              class="control"
              :class="{ 'control--error': $v.email.$error }"
              v-model="$v.email.$model"
              :disabled="isDisabled">
          </div>
        </div>
        <div class="form-group">
          <label class="label" for="subject">Subject*</label>
          <input
            id="subject"
            type="text"
            class="control"
            :class="{ 'control--error': $v.subject.$error }"
            v-model="$v.subject.$model"
            :disabled="isDisabled">
        </div>
        <div class="form-group">
          <label class="label" for="message">Message*</label>
          <textarea
            id="message"
            class="control textarea"
            :class="{ 'control--error': $v.message.$error }"
            v-model="$v.message.$model"
            :disabled="isDisabled">
        </textarea>
        </div>
        <div class="form-group">
          <button type="submit" class="button">
            Request Project
          </button>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'TheForm',
  data() {
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      submitStatus: null,
    };
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
    subject: {
      required,
    },
    message: {
      required,
    },
  },
  mounted() {
    if (window.grecaptcha === undefined || window.grecaptcha.render === undefined) {
      window.addEventListener('load', () => {
        this.initializeRecaptcha();
      });
    } else {
      this.initializeRecaptcha();
    }
  },
  methods: {
    initializeRecaptcha() {
      window.grecaptcha.render(this.$refs.grecaptcha, {
        sitekey: process.env.VUE_APP_RECAPTCHA_TOKEN,
        size: 'invisible',
        callback: this.onSubmit,
      });
    },
    checkForm() {
      this.submitStatus = 'PENDING';
      this.$v.$touch();
      this.errors = [];
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
        this.$notify({
          group: 'foo',
          title: 'Please fill in the required fields',
          type: 'warn',
        });
        return;
      }
      this.$notify({
        group: 'foo',
        title: 'Processing data',
        type: 'processing',
      });
      window.grecaptcha.execute();
    },
    onSubmit(token) {
      const data = Object.assign({}, {
        name: this.name,
        email: this.email,
        subject: this.subject,
        message: this.message,
        token,
      });
      fetch(`${process.env.VUE_APP_API_HOST}/contact`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(async (response) => {
          if (!response.ok) {
            const errors = await response.json();
            throw errors;
          }
          return response;
        })
        .then(() => {
          this.submitStatus = 'SUCCESS';
          this.$notify({
            group: 'foo',
            title: 'Thank you! Your message has been sent.',
            type: 'success',
          });
          this.$v.$reset(); // Reset validation
          this.resetFields(); // Reset fields to prevent double posting
          window.grecaptcha.reset();
        })
        .catch(() => {
          this.submitStatus = 'ERROR';
          this.$notify({
            group: 'foo',
            title: 'Something went wrong. Please try again!',
            type: 'error',
          });
          window.grecaptcha.reset();
        });
    },
    resetFields() {
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';
    },
  },
  computed: {
    isDisabled() {
      return this.submitStatus === 'PENDING';
    },
  },
};
</script>

<style>
  .grecaptcha-badge[style] {
    position: absolute !important;
  }
</style>

<style lang="scss" scoped>
  @import "../assets/styles/variables.scss";

  @keyframes shakeError {
    0% { transform: translateX(0); }
    15% { transform: translateX(0.375rem); }
    30% { transform: translateX(-0.375rem); }
    45% { transform: translateX(0.375rem); }
    60% { transform: translateX(-0.375rem); }
    75% { transform: translateX(0.375rem); }
    90% { transform: translateX(-0.375rem); }
    100% { transform: translateX(0); }
  }
  .form {
    position: relative;
    overflow: hidden;
  }

  h2 {
    margin-bottom: 0;
  }
  h3 {
    text-transform: uppercase;
    margin-bottom: 4rem;
  }
  .message {
    margin-top: -3rem;
    margin-bottom: 1rem;
  }
  .ul {
    margin-top: -3.5rem;
    margin-bottom: 1rem;
  }

  .container {
    max-width: 60rem;
  }
  .form {
    text-align: center;
    color: #fff;
    padding: 6rem 0;
    background: url('/images/contact/contact_bg.jpg') 50% 0 / cover;
  }
  .form__title {
    font-size: 1.8rem;
  }
  .form__subtitle {
    font-size: 2.3rem;
  }
  @media (min-width: 360px) {
    .form__title {
      font-size: 2rem;
    }
    .form__subtitle {
      font-size: 2.8rem;
    }
  }
  @media (min-width: $screen-sm) {
    .form__title {
      font-size: 1.4em;
    }
    .form__subtitle {
      font-size: 1.8em;
    }
  }
  .form-group {
    font-family: $font-family-special;
    text-align: left;
    margin-bottom: 1.5rem;
  }
  @media (min-width: $screen-xs) {
    .form-group--flex {
      display: flex;
      margin: 0 -1rem;
      .form-group {
        flex: 1;
        margin-left: 1rem;
        margin-right: 1rem;
      }
    }
  }
  .label {
    display: block;
    font-weight: 700;
    margin-bottom: 0.5rem;
    vertical-align: bottom;
    span {
      line-height: 1;
    }
  }
  .control {
    display: block;
    width: 100%;
    padding: 1.2rem;
    font-family: $font-family-special;
    font-size: $font-size;
    font-weight: 400;
    color: #495057;
    background-color: transparentize(#fff, 0.35);
    border: 1px solid transparent;
  }
  .control--error {
    border: 0.1rem solid white;
    animation-name: shakeError;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
  }
  .button {
    margin-top: 1.2rem;;
    cursor: pointer;
    background: #fff;
    padding: 0.8rem 2.4rem;
    font-size: 1.3em;
    font-family: $font-family-special;
    font-weight: 700;
    border: none;
    border-radius: 2rem;
  }
  .textarea {
    height: 16rem;
  }
  .error__message {
    font-family: $font-family;
    font-size: .8em;
    font-weight: 300;
    margin: 0;
  }

  .processing__icon {
    display: inline-block;
    margin-right: 1rem;
  }
  .processing__icon:after {
    content: " ";
    display: block;
    width: 15px;
    height: 15px;
    margin: 1px;
    border-radius: 50%;
    border-width: 3px;
    border-style: solid;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
