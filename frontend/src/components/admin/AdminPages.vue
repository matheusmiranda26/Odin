<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema"/>
    <div class="admin-pages-tabs">
      <b-card align="center">
        <!--     <b-tabs card>
                    <b-tab title="Artigos" active>
                        <ArticleAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
        </b-tab>-->
        <!-- <b-tab title="Usuários"> -->
        <UserAdmin/>
        <!-- </b-tab>
        </b-tabs>-->
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import UserAdmin from "./UserAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, UserAdmin },
  mounted() {
    this.$store.commit("setTittle", "ADMIN");
  }
};
</script>

<style>
</style>
