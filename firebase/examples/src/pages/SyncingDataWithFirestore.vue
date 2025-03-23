<script setup lang="ts">
import { getFirestore, useFirestore } from '@vueauth/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ref } from 'vue'

const db = getFirestore()
const postsCollection = collection(db, 'public-posts')
const posts = useFirestore(postsCollection)
const creating = ref(false)

const formDefault = {
  title: '',
  body: ''
}
const form = ref(formDefault)

function resetForm () {
  form.value = formDefault
}

async function createPost () {
  creating.value = true
  try {
    await addDoc(postsCollection, form.value)
    resetForm()
  } catch (error) {
    console.error(error)
  }
  creating.value = false
}
</script>

<template>
  <label for="title">Title</label><br>
  <input v-model="form.title">

  <br>

  <label for="body">Body</label><br>
  <textarea v-model="form.body" />

  <br>

  <button
    :disabled="creating"
    @click="createPost"
  >
    create
  </button>

  <br>

  <pre>{{ posts }}</pre>
</template>
