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
                  <v-select v-model="sendData.entity" :items="entities" label="Entity" outline></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.city"
                    @change="City()"
                    :items="cities"
                    label="City"
                    outline
                  ></v-select>
                </v-flex>

                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.property"
                    :items="properties"
                    @change="PlanName"
                    label="Property Name"
                    outline
                  ></v-combobox>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.connectionid" label="Connection ID" outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select v-model="sendData.plan" :items="plans" label="Choose a Plan" outline></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.association"
                    :items="associations"
                    label="Association Type"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.room" label="Room No. " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.flat" label="Flat No. " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.floor" label="Floor No. " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.common" label="Common Area Description " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.entered" label="Entered By " outline></v-text-field>
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
                        label="Plan Start Date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @change="fun3"></v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex sm12 md6>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    full-width
                    max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        outline
                        required
                        :value="computedDateFormattedMomentjs2"
                        clearable
                        label="Next Recharge Date"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="rdate" @change="fun2"></v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.amount" label="Recharge Amount" outline></v-text-field>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field v-model="sendData.comment" label="Comments" outline></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select v-model="sendData.mode" :items="modes" label="Recharge Mode" outline></v-select>
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
  Name: "PlanMap",
  data: () => ({
    baseURl: "http://3.218.108.144:4201/",
    tabs: "",

    sendData: {
      property: "",
      connectionid: "",
      plan: "",
      amount: "",
      utility: "",
      entity: "",
      mode: "",
      association: "",
      entered: "",
      date: "",
      room: "",
      flat: "",
      floor: "",
      common: "",
      date: "",
      rdate: "",
      comment: "",
      city: ""
    },
    menu2: false,
    menu3: false,
    fetchDate: "",
    fetchDate2: "",
    date: new Date().toISOString().substr(0, 10),
    rdate: new Date().toISOString().substr(0, 10),

    plans: [],
    utilities: ["Dth", "Internet"],
    properties: [],
    cities: [],
    entities: ["Kitchen", "Office", "Home"],
    modes: ["app", "credit card"],
    tabs: "",
    associations: [
      "Property",
      "Floor",
      "Room",
      "Flat common area",
      "Property common area"
    ]
  }),

  methods: {
    async getData() {
      console.log("sendData", this.sendData);

      this.sendData.date = moment().format();

      axios.post(this.baseURl + "planMap/insert", this.sendData);
    },

    City() {
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        response.data.forEach(element => {
          this.cities.push(element.CITY);
          this.properties.push(element.LOCALNAME);
        });

        // console.log("Vname", this.);
      });
    },

    PlanName() {
      console.log("hi");
      axios.get(this.baseURl + "planonboard/getpname").then(response => {
        console.log("hi", response.data);
        response.data.forEach(element => {
          if (
            this.sendData.utility === element.utility &&
            this.sendData.city === element.city
          ) {
            this.plans.push(element.pname);
          }
        });

        // console.log("Vname", this.);
      });
    },
    fun3() {
      this.menu3 = false;
      this.fetchDate = this.date;
      this.fetchDate = moment(this.date, "YYYY-MM-DD").format("DD/MM/YYYY");
      console.log(this.fetchDate);
      console.log(this.date);
    },
    fun2() {
      this.menu2 = false;
      this.fetchDate2 = this.rdate;
      this.fetchDate2 = moment(this.rdate, "YYYY-MM-DD").format("DD/MM/YYYY");
      console.log(this.fetchDate2);
      console.log(this.rdate);
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("DD/MM/YYYY") : "";
    },
    computedDateFormattedMomentjs2() {
      return this.rdate ? moment(this.rdate).format("DD/MM/YYYY") : "";
    }
  },
  mounted() {
    this.City();
  }
};
</script>

<style>
</style>
