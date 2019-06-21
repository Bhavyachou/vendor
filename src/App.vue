<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Utility</span>
        <span class="font-weight-light"> Tracker</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  }
}
</script>
