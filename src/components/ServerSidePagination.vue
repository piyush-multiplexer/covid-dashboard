<template>
  <div>
    <q-card flat bordered class="col-6">
      <q-card-section>
        <div class="text-h6">Server Side Pagination in Table</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-table
          :title="`Data ${pagination.rowsNumber}`"
          :rows="rows"
          :columns="headers"
          row-key="id"
          v-model:pagination="pagination"
          :filter="filter"
          :loading="loading"
          @request="onRequest"
          ><template v-slot:top-right>
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// https://608919b0a6f4a300174279a0.mockapi.io/:endpoint
// fifixo1471@sumwan.com

import axios from "axios";
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  setup() {
    const loading = ref(false);
    const rows = ref([]);
    const filter = ref("");
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 100,
    });
    const headers = [
      {
        label: "ID",
        align: "left",
        name: "id",
        field: "id",
      },
      {
        label: "Name",
        align: "left",
        name: "name",
        field: "name",
      },
      {
        label: "Email",
        align: "left",
        name: "email",
        field: "email",
      },
      {
        label: "Created At",
        name: "createdAt",
        field: "createdAt",
      },
    ];

    async function onRequest(props) {
      loading.value = true;
      const { page, rowsPerPage } = props.pagination;
      const filter = props.filter;
      const count =
        rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;
      rows.value = await getData(page, count, filter);
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      loading.value = false;
    }
    async function getData(page, count, filter) {
      return axios
        .get(
          `https://608919b0a6f4a300174279a0.mockapi.io/users?search=${filter}&p=${page}&l=${count}`
        )
        .then((res) => {
          return res.data;
        });
    }
    onMounted(() => {
      onRequest({
        pagination: pagination.value,
        filter: "",
      });
    });
    return { headers, loading, pagination, rows, onRequest, filter };
  },
});
</script>