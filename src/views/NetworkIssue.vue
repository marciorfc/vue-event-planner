<template>
  <div>
    <h1>Oops!</h1>
    <h3>
      It looks you're experiencing some network issues, pease click the back
      button and try again
    </h3>
    <router-link :to="{ name: 'event-list' }">Back to he home page</router-link>
  </div>
</template>
