<template>
  <div class="page-wrapper py-7" fluid>
    <div class="text-center">
      <div class="page-title">
        Let's plan your <span class="highlight">saving goal.</span>
      </div>
    </div>

    <v-card class="main-card mx-auto mt-6 pa-4" elevation="2">
      <v-card-text>
        <div class="d-flex align-center mb-4">
          <img src="/images/icon.svg" width="48" height="54" class="mr-3" />
          <div>
            <h2 class="goal-title mb-1">Buy a house</h2>
            <p class="goal-sub mb-0">Saving goal</p>
          </div>
        </div>

        <v-row dense>
          <v-col cols="12" md="6">
            <label class="label">Total amount</label>
            <AmountInput v-model="amount" />
          </v-col>

          <v-col cols="12" md="6">
            <label class="label">Reach goal by</label>
            <ReachDateInput v-model="reachDate" />
          </v-col>
        </v-row>

        <MonthlyAmountCard
          :monthly="monthlyAmount"
          :amount="amount"
          :reachDate="reachDate"
        />

        <div class="confirm">
          <v-btn class="confirm-btn mt-6" large @click="showModal = true">
            Confirm
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <ConfirmModal
      :show.sync="showModal"
      :total="amountFormatted"
      :reach="reachFormatted"
      :monthly="monthlyAmountFormatted"
    />
  </div>
</template>

<script>
import AmountInput from "@/components/amountInput.vue";
import ReachDateInput from "@/components/reachDateInput.vue";
import MonthlyAmountCard from "@/components/monthlyAmountCard.vue";
import ConfirmModal from "@/components/confirmModal.vue";
import { formatMonthlyAmount, formatDate } from "@/utils.js";

export default {
  components: {
    AmountInput,
    ReachDateInput,
    MonthlyAmountCard,
    ConfirmModal,
  },

  data() {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const reach = `${next.getFullYear()}-${(next.getMonth() + 1)
      .toString()
      .padStart(2, "0")}`;

    return {
      amount: 25000,
      reachDate: reach, // YYYY-MM
      showModal: false,
    };
  },

  computed: {
    totalMonths() {
      const now = new Date();
      now.setDate(1);

      const [y, m] = this.reachDate.split("-").map(Number);
      const target = new Date(y, m - 1, 1);

      return (
        (target.getFullYear() - now.getFullYear()) * 12 +
        (target.getMonth() - now.getMonth())
      );
    },

    monthlyAmount() {
      if (!this.amount || this.totalMonths <= 0) return 0;
      const result = Math.round((this.amount / this.totalMonths) * 100) / 100;
      return formatMonthlyAmount(result);
    },

    amountFormatted() {
      return `$${this.amount.toLocaleString()}`;
    },

    reachFormatted() {
      return formatDate(this.reachDate);
    },

    monthlyAmountFormatted() {
      return `$${this.monthlyAmount.toLocaleString()}`;
    },
  },
};
</script>
