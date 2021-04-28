<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-pa-sm q-pb-md">
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          dense
          size="12"
          outline
          label="Dashboard"
          color="primary"
          to="/"
        />
        <q-btn
          dense
          size="12"
          outline
          label="Server Pagination"
          color="primary"
          to="server-pagination"
        />
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>
