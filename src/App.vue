<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-accent text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-center"> COVID Dashboard </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Dashboard" />
        <q-route-tab to="/server-pagination" label="Server Pagination" />
      </q-tabs>
    </q-header>

    <q-page-container class="q-pa-sm q-pb-md">
      <router-view />
    </q-page-container>

    <q-footer class="bg-grey-8 text-white">
      <div>Title</div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {}
});
</script>
