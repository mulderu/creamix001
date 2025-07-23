<script setup>
import { ref, shallowRef } from 'vue'

const total = shallowRef(59)

const company = ref('')
const invoiceId = ref('')
const name = ref('')
const email = ref('')
const invoice = ref(null)
const due = ref(null)
const taxable = ref(false)
const notes = ref('')


definePageMeta({
  layout: "dash",
  middleware: "auth",
});

</script>

<template>
  <v-container class="pa-md-6" fluid>
    <div class="text-h6 font-weight-medium mb-6">Create Invoice</div>

    <v-card border class="pa-4 pa-md-6" flat>
      <v-form>
        <v-row dense>
          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Company Name</label>

            <v-text-field
              v-model="company"
              density="comfortable"
              placeholder="Enter company name"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Invoice Id</label>

            <v-text-field
              v-model="invoiceId"
              density="comfortable"
              placeholder="Enter invoice ID"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Customer Name</label>

            <v-text-field
              v-model="name"
              density="comfortable"
              placeholder="Enter customer name"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Customer Email</label>

            <v-text-field
              v-model="email"
              density="comfortable"
              placeholder="Enter customer email"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Invoice Date</label>

            <v-date-input
              v-model="invoice"
              append-inner-icon="mdi-calendar"
              density="comfortable"
              placeholder="Select date"
              prepend-icon=""
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Due Date</label>

            <v-date-input
              v-model="due"
              append-inner-icon="mdi-calendar"
              density="comfortable"
              placeholder="Select date"
              prepend-icon=""
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Item</label>

            <v-text-field
              density="comfortable"
              placeholder="Enter item name"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="3">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Quantity</label>

            <v-number-input
              density="comfortable"
              placeholder="Enter quantity"
              type="number"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="3">
            <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Price</label>

            <div class="d-flex align-center ga-2">
              <v-number-input
                density="comfortable"
                placeholder="Enter price"
                type="number"
                variant="outlined"
              >
                <template #append>
                  <div class="d-flex ga-1">
                    <v-btn
                      color="error"
                      icon="mdi-delete-outline"
                      size="x-small"
                      variant="outlined"
                    />

                    <v-btn
                      color="success"
                      icon="mdi-plus"
                      size="x-small"
                      variant="outlined"
                    />
                  </div>
                </template>
              </v-number-input>
            </div>
          </v-col>
        </v-row>

        <v-checkbox
          v-model="taxable"
          density="comfortable"
          label="Taxable (VAT 18%)"
        />

        <div class="d-flex justify-end mb-6">
          <div class="text-subtitle-1 font-weight-medium">
            Total: <span class="text-success text-h5">${{ total }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label class="text-subtitle-1 font-weight-medium mb-2 d-block">Notes</label>

          <v-textarea
            v-model="notes"
            density="comfortable"
            placeholder="Add notes about the invoice"
            rows="4"
            variant="outlined"
          />
        </div>

        <v-btn
          color="primary"
          prepend-icon="mdi-file-document-outline"
          size="large"
          text="Create Invoice"
        />
      </v-form>
    </v-card>
  </v-container>
</template>