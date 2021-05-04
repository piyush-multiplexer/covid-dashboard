<template>
  <div>
    <q-card flat bordered class="col-6">
      <q-card-section>
        <div class="text-h6">Server Side Pagination in Table</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-table
          :title="`Data (${pagination.rowsNumber})`"
          :rows="rows"
          :columns="headers"
          row-key="id"
          v-model:pagination="pagination"
          :filter="filter"
          :loading="loading"
          @request="onRequest"
          :rows-per-page-options="[5, 10, 50, 100, 0]"
          binary-state-sort
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
import Constants from "@/constants/Constants";
export default defineComponent({
  setup() {
    const loading = ref(false);
    const rows = ref([]);
    const filter = ref("");
    const pagination = ref({
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0,
      sortBy: "id",
      descending: false,
    });
    const headers = [
      {
        label: "ID",
        align: "left",
        name: "id",
        field: "id",
        sortable: true,
      },
      {
        label: "Name",
        align: "left",
        name: "name",
        field: "name",
        sortable: true,
      },
      {
        label: "Email",
        align: "left",
        name: "email",
        field: "email",
        sortable: true,
      },
      {
        label: "Created At",
        name: "createdAt",
        field: "createdAt",
        sortable: true,
      },
    ];

    async function onRequest(props) {
      loading.value = true;
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      const filter = props.filter;
      const count =
        rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;
      const res = await getData(page, count, filter, sortBy, descending);
      rows.value = res.data;
      pagination.value.rowsNumber = res.length;
      pagination.value.page = page;
      pagination.value.rowsPerPage = rowsPerPage;
      pagination.value.sortBy = sortBy;
      pagination.value.descending = descending;
      loading.value = false;
    }
    async function getData(page, count, filter, sortBy, descending) {
      return axios
        .get(
          `${
            Constants.API_URL
          }redirector/server-table/users?search=${filter}&sortBy=${sortBy}&order=${
            descending ? "desc" : "asc"
          }&p=${page}&l=${count}`
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