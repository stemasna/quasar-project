<template>
  <q-page padding>
    <div class="q-py-md row justify-between">
      <div class="col-4">
        <q-input outlined dense v-model="filter" :label="$t('common.search')" />
      </div>
      <div>
        <q-btn
          color="primary"
          :label="$t('common.createUser')"
          @click="createUser"
        />
      </div>
    </div>
    <div class="q-pa-md row full-width" v-if="token">
      <q-table
        class="col-12"
        flat
        :title="$t('common.userList')"
        :rows="filteredData"
        :columns="columns"
        row-key="_id"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              icon="edit"
              @click="() => router.push(`users/${props.key}`)"
              color="black"
              round
              flat
            />
            <q-btn
              icon="message"
              @click="() => onClickOpenChat(props.key)"
              color="primary"
              round
              flat
            />
            <q-btn
              icon="delete"
              @click="() => deleteUser(props.key)"
              color="primary"
              round
              flat
            />
          </q-td>
        </template>
      </q-table>
    </div>
    <div v-else>
      <div class="text-h6">
        {{ $t("common.loginRequired") }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import { mapGetters } from "vuex";
import ConfirmModal from "components/modals/ConfirmModal";

export default defineComponent({
  name: "UsersPage",
  setup() {
    return {
      router: useRouter(),
    };
  },
  data() {
    return {
      rows: [],
      filter: "",
      columns: [
        {
          name: "actions",
          align: "left",
        },
        {
          name: "name",
          label: this.$t("common.name"),
          align: "left",
          field: (row) => row?.name || " - ",
        },
        {
          name: "surname",
          label: this.$t("common.surname"),
          align: "left",
          field: (row) => row?.surname || " - ",
        },
        {
          name: "email",
          label: this.$t("common.email"),
          align: "left",
          field: (row) => row?.email || " - ",
        },
        {
          name: "role",
          label: this.$t("common.role"),
          align: "left",
          field: (row) => this.$t(row.role),
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["token"]),
    filteredData() {
      if (!this.filter) return this.rows;
      return this?.rows.filter(
        (d) =>
          d.name.includes(this.filter) ||
          d.surname.includes(this.filter) ||
          d.email.includes(this.filter)
      );
    },
  },
  watch: {
    token(newValue) {
      newValue && this.getUsers();
    },
  },
  methods: {
    createUser() {
      this.router.push({
        name: "usersDetail",
        params: {
          id: "new",
        },
      });
    },
    onClickOpenChat(userId) {
      this.$q.dialog({
        component: ConfirmModal,
        componentProps: {
          title: this.$t("common.openChat"),
          text: this.$t("common.confirmOpenChat"),
          onConfirm: async () => {
            console.debug({ userId });
            await this.$store.dispatch("createChat", userId);
          },
        },
        parent: this,
      });
    },
    async getUsers() {
      try {
        const { data } = await api.get("users", {
          params: {
            limit: 10,
          },
        });
        this.rows = data;
      } catch (e) {
        console.error({ e });
      }
    },
    async deleteUser(id) {
      console.log(id);
      await this.$api
        .delete("/users/" + id)
        .then(() => _.remove(this.rows, (r) => r.id === id));
    },
  },
  async created() {
    await this.getUsers();
  },
});
</script>
