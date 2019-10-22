<template>
  <div class="stat">
    <div class="stat-icon">
      <i :class="icon" :style="style"></i>
    </div>
    <div class="stat-info">
      <span class="stat-title">{{ title }}</span>
      <span v-show="tabela !== 'Clientes'" class="stat-value">{{ this.qtd[0].quantidade != null ? this.qtd[0].quantidade : 0 | currency}}</span>
      <span v-show="tabela == 'Clientes'" class="stat-value">{{ this.qtd[0].quantidade != null ? this.qtd[0].quantidade : 0 }}</span>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Stat",
  data: function() {
    return {
      qtd: 0
    };
  },
  props: ["title", "icon", "color", "tabela"],
  computed: {
    style() {
      return "color: " + (this.color || "#000");
    }
  },
  methods: {
    quantidade() {
      if (this.tabela == "Clientes") {
        axios.get(`${baseApiUrl}/quantidade${this.tabela}`).then(res => {
          this.qtd = res.data;
        });
      } else {
        axios.get(`${baseApiUrl}/${this.tabela}`).then(res => {
          this.qtd = res.data.quantidade !== null ? res.data : 0;
        });
      }
    }
  },
  mounted() {
    this.quantidade();
  }
};
</script>

<style>
.stat {
  flex: 1;
  display: flex;
  border-radius: 8px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
}

.stat-icon {
  display: flex;
  align-items: center;
}

.stat-icon i {
  font-size: 5rem;
}

.stat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.stat-title {
  font-size: 1.2rem;
}

.stat-value {
  font-size: 3rem;
}
</style>
