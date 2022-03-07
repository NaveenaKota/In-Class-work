<script setup lang="ts">
import { Login } from '../models/sessions';


  function badlogin()
  {
      Login('Naveena', 'Naveena@123')
  }
  function login()
  {
      Login('Naveena', 'password')
  }
</script>

<template>
    <div class="section">
        <h1 class="title">Login Page</h1>
        <button class = "button is-primary">
            <span class = "icon">
                <i class = "fa fa-sign-in"></i>
            </span>
            <span>Login</span>
        </button>

        <button class = "button is-primary" @click="badlogin">
            <span class = "icon">
                <i class = "fa fa-sign-in"></i>
            </span>
            <span>bad Login</span>
        </button>
    </div>
</template>

<style scoped>
</style>