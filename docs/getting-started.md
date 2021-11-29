# Getting Started

## Install

```sh
# yarn (the cool kids)
yarn add sanctum-composables firebase

# or npm (the oldschoolers)
npm install sanctum-composables firebase --save
```

## Add Credentials
Here's how you can find your credentials:

1. Head over to the [firebase console](https://console.firebase.google.com/)
2. Select your project
3. At the top right of the page, next to **Project Overview**, click on the ⚙️ icon, then **Project settings**
4. scroll to the bottom of the page. Your credentials are inside `const firebaseConfig = `
5. have a cookie 🍪
> In the code snippet from step 4, firebase shows you how to initialize the app. You don't need any of this code, as **sanctum-composables** handles it for you!

before we can use sanctum-composables, we need to install the plugin. The file below will usually be `main.js`
```js
import { createApp } from 'vue'
import App from './App.vue'
import { firebasePlugin } from 'sanctum-composables'

const app = createApp(App)

const firebaseConfig = {
  apiKey: 'XXXXXXXXXXX',
  authDomain: 'XXXXXXXXXXX',
  projectId: 'XXXXXXXXXXX',
  storageBucket: 'XXXXXXXXXXX',
  messagingSenderId: 'XXXXXXXXXXX',
  appId: 'XXXXXXXXXXX',
  measurementId: 'XXXXXXXXXXX'
}

app.use(firebasePlugin, {
  config: firebaseConfig
})

app.mount('#app')
```

## Email/Password SignIn

### Enabling SignIn with Firebase
First, ensure that the "Email/Password" provider is enabled in firebase. Here's how you do it:
1. Wack this link to go to the firebase console 👊[firebase console](https://console.firebase.google.com/)
2. Select your project
3. Select **Authentication**
4. Select **Sign-in method**
5. Select **Add new provider**
6. Ensure **Email/Password** has a tick ✔️, otherwise, set it up
7. Send a tweet to [someone on the Vue team](https://vuejs.org/v2/guide/team.html) to say thankyou 💚

### Using `useEmailSignIn`
Sign in is easy, let's dive into the code.
Hang on, grabbing my snorkel 🤿 

```vue
<script setup>
import { useEmailSignIn, useAuthState } from 'sanctum-composables'

// 🤿 first we yank out the form, and sign in function
// from the composable.
const {
  form,
  signIn,
} = useEmailSignIn()

// 🤿 and the auth state, to ensure the user is signed in
const { user } = useAuthState()
</script>

<template>
  <form>
    <!-- 🤿 Then, we simply model the 'email' and... -->
    <label for="email">Email</label>
    <input
      id="email"
      v-model="form.email"
      type="email"
    >
🐚
    <br>

    <!-- 🤿 The password. -->
    <label for="password">Password</label>
    <input
      id="password"
      v-model="form.password"
      type="password"
    >

    <br>🐟

    <!-- Then, we call the signIn button on click! -->
    <button @click.prevent="signIn">
      Sign In
    </button>

    <!-- And display the user -->
    <pre>{{ user }}</pre>

    <!-- Ahhhh!!! 🏊 🦈 -->
  </form>
</template>
```

And that's it.
