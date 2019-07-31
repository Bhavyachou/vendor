<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-tabs v-model="tabs" fixed-tabs color="transparent" style="margin-top:2%;">
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab href="/" class="primary--text">
                    <label>Vendor Onboard</label>
                  </v-tab>

                  <v-tab to="/planonboard" class="primary--text">
                    <label>Plan Onboard</label>
                  </v-tab>

                  <v-tab to="/planmap" class="primary--text">
                    <label>Plan Map</label>
                  </v-tab>
                </v-tabs>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.utility"
                    :items="utilities"
                    reuired
                    label="Utility"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    @change="VendorName"
                    v-model="sendData.city"
                    :items="cities"
                    reuired
                    label="City"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select v-model="sendData.vendor" :items="vendors" label="Vendor Name" outline></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.pName" label="Plan Name " outline></v-text-field>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.pDes" label="Plan Description" outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.rate" label="Rate(Exculding GST) " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.gsttype"
                    :items="gsttypes"
                    label="GST Type "
                    outline
                  ></v-combobox>
                </v-flex>
                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.gstpercent"
                    :items="gstpercents"
                    label="GST Percent " @change="total"
                    outline
                  ></v-combobox>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.gstamount" label="GST Amount " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.totalamount" label="Total Amount " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.invoiceno" label="Invoice No./ PI No." outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.invoicelink" label="Invoice/ PI Link" outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-menu
                    v-model="menu3"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        outline
                        required
                        :value="computedDateFormattedMomentjs"
                        clearable
                        label="Invoice/ PI Date"
                        readonly
                        :rules="['Required']"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @change="fun3"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.validity"
                    :items="validities"
                    label="Validity"
                    outline
                  ></v-select>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.package" label="Package Details " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.upload"
                    :rules="['Required']"
                    label="Upload Limit "
                    suffix="GB"
                    :disabled="isDisabled"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    :disabled="isDisabled"
                    v-model="sendData.download"
                    :rules="['Required']"
                    label="Download Limit "
                    suffix="GB"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.channels"
                    :rules="['Required']"
                    :disabled="!isDisabled"
                    label="No. of Channels"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-card-text :hidden="!isDisabled" :rules="['Required']">
                    Choice of Channels
                    <v-checkbox v-model="sendData.choice" label="English" value="English"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Hindi" value="Hindi"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Regional1" value="Regional1"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Regional2" value="Regional2"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Regional3" value="Regional3"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Sports" value="Sports"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="News" value="News"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Movies" value="Movies"></v-checkbox>
                    <v-checkbox v-model="sendData.choice" label="Music" value="Music"></v-checkbox>
                  </v-card-text>
                </v-flex>

                <div class="text-xs-center">
                  <v-dialog width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn @click="getData" color="Green" dark v-on="on">Submit</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Successful!</v-card-title>

                      <v-card-text>Data is successfully submitted!</v-card-text>

                      <v-divider></v-divider>
                    </v-card>
                  </v-dialog>
                </div>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  Name: "PlanOnboard",
  data: () => ({
    baseURl: "http://3.218.108.144:4201/",
    isDis: true,
    tabs: "",
    sendData: {
      utility: "",
      city: "",
      validity: "",
      vendor: "",
      pName: "",
      pDes: "",
      rate: "",
      gsttype: "",
      gstpercent: "",
      gstamount: "",
      totalamount: "",
      invoiceno: "",
      invoicelink: "",
      date: "",
      upload: "",
      download: "",
      package: "",
      channels: "",
      choice: []
    },
    menu3: false,
    fetchDate: "",
    date: new Date().toISOString().substr(0, 10),
    gsttypes: ["GST", "IGST", "UGST"],
    gstpercents: ["0%", "5%", "12%", "18%", "28%"],
    vendors: [],
    cities: [],
    utilities: ["Dth", "Internet"],
    validities: [
      "daily",
      "biweekly",
      "weekly",
      "bi-monthly",
      "semi-annual",
      "annual",
      "others"
    ]
  }),
  methods: {
    async getData() {
      console.log("sendData", this.sendData);

      console.log("meowww", this.sendData);

      axios.post(this.baseURl + "planonboard/insert", this.sendData);
    },
    VendorName() {
      if (this.sendData.utility === "") {
        throw console.error("Pehle utility select karo");
      }
      axios.get(this.baseURl + "vendor/getvname").then(response => {
        console.log("hi", response.data);

        response.data.forEach(element => {
          if (
            this.sendData.city === element.city &&
            this.sendData.utility === element.utility
          ) {
            this.vendors.push(element.vname);
          }
        });

        // console.log("Vname", this.);
      });
    },
    City() {
      console.log("Reached Here");
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        console.log(response);
        response.data.forEach(element => {
          this.cities.push(element.CITY);
        });
      });
    },
    total(){
      this.sendData.rate = parseInt(this.sendData.rate);
      this.sendData.gstpercent = parseInt(this.sendData.gstpercent);
      this.sendData.gstamount = this.sendData.rate * ( this.sendData.gstpercent + 1);
      this.sendData.totalamount = this.sendData.rate + this.sendData.gstamount
    },
    fun3() {
      this.menu3 = false;
      this.fetchDate = this.date;
      this.fetchDate = moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY");
      console.log(this.fetchDate);
      console.log(this.date);
    }
  },
  mounted() {
    this.City();
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    isDisabled() {
      if (this.sendData.utility === "Dth") {
        return this.isDis;
      } else if (this.sendData.utility === "Internet") {
        this.isDis = true;
      }
    }
  }
};
</script>

<style>
</style>
