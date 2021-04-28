<template>
  <div>
    <q-card flat bordered class="col-6">
      <q-card-section>
        <div class="text-h6">Server Side Pagination in Table</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-table
          :title="`Data (${rows.length})`"
          :rows="rows"
          :columns="headers"
          row-key="id"
          v-model:pagination="pagination"
          :loading="loading"
          @request="onRequest"
        >
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// https://608919b0a6f4a300174279a0.mockapi.io/:endpoint
// fifixo1471@sumwan.com

import axios from "axios";
import { defineComponent, ref, onMounted, reactive } from "vue";
export default defineComponent({
  setup() {
    const loading = ref(false);
    let rows = reactive([]);
    const pagination = reactive({
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
    onMounted(() => {
      onRequest({
        pagination: pagination,
      });
    });
    async function onRequest(props) {
      const { page, rowsPerPage } = props.pagination;
      loading.value = true;
      // get all rows if "All" (0) is selected
      const fetchCount =
        rowsPerPage === 0 ? pagination.rowsNumber : rowsPerPage;
      // calculate starting row of data
      const startRow = (page - 1) * rowsPerPage;
      // fetch data from "server" clear out existing data and add new
      rows = await getData(startRow, fetchCount);
      // don't forget to update local pagination object
      pagination.page = page;
      pagination.rowsPerPage = rowsPerPage;
      console.log(rows);
      console.log(pagination);
      // ...and turn of loading indicator
      loading.value = false;
    }
    async function getData(startRow, count) {
      return axios
        .get(
          `https://608919b0a6f4a300174279a0.mockapi.io/users?p=${
            startRow + 1
          }&l=${count}`
        )
        .then((res) => {
          return res.data;
        });
    }
    return { headers, loading, pagination, rows, onRequest };
  },
});
</script>