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
                    required="true"
                    :rules="['Required']"
                    label="Utility"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.entity"
                    :rules="['Required']"
                    :items="entities"
                    label="Entity"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.city"
                    @change="Property()"
                    :rules="['Required']"
                    :items="cities"
                    label="City"
                    outline
                  ></v-select>
                </v-flex>

                <v-flex sm12 md6>
                  <v-combobox
                    v-model="sendData.property"
                    :items="properties"
                    @change="PlanName(); Floor();"
                    :rules="['Required']"
                    label="Property Name"
                    outline
                  ></v-combobox>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.connectionid"
                    :rules="['Required']"
                    label="Connection ID"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.plan"
                    :rules="['Required']"
                    :items="plans"
                    label="Choose a Plan"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.association"
                    :items="associations"
                    :rules="['Required']"
                    label="Association Type"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.floor"
                    @change="Flat(); Room();"
                    :items="floors"
                    :rules="['Required']"
                    label="Floor No. "
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.flat"
                    :items="flats"
                    :rules="['Required']"
                    label="Flat No. "
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.room"
                    :items="rooms"
                    label="Room No. "
                    :rules="['Required']"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.common"
                    label="Common Area Description "
                    :rules="['Required']"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.entered"
                    label="Entered By "
                    outline
                    :rules="['Required']"
                  ></v-text-field>
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
                        :rules="['Required']"
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
                        :rules="['Required']"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="rdate" @change="fun2"></v-date-picker>
                  </v-menu>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.amount"
                    :rules="['Required']"
                    label="Recharge Amount"
                    outline
                  ></v-text-field>
                </v-flex>

                <v-flex sm12 md6>
                  <v-text-field
                    v-model="sendData.comment"
                    :rules="['Required']"
                    label="Comments"
                    outline
                  ></v-text-field>
                </v-flex>
                <v-flex sm12 md6>
                  <v-select
                    v-model="sendData.mode"
                    :rules="['Required']"
                    :items="modes"
                    label="Recharge Mode"
                    outline
                  ></v-select>
                </v-flex>
                <div class="text-xs-center">
                  <v-dialog width="500">
                    <template v-slot:activator="{ on }">
                      <v-btn @click="getData" color="Green" dark v-on="on">Submit</v-btn>
                    </template>
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
    token:"",
    required: [],
    error: "",
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
    floors: [],
    flats: [],
    rooms: [],
    plans: [],
    utilities: ["Dth", "Internet"],
    properties: [],
    cities: [],
    entities: ["Kitchen", "Office", "Property"],
    modes: ["App", "Credit card", "Online Mode"],
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

      this.sendData.date = this.fetchDate;
      this.sendData.rdate = this.fetchDate2;

      await axios.post(this.baseURl + "planMap/insert", this.sendData);
    },

    City() {
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        response.data.forEach(element => {
          this.cities.push(element.CITY);
        });

        // console.log("Vname", this.);
      });
    },
    Property() {
      console.log("hi");
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        response.data.forEach(element => {
          if (
            this.sendData.city === element.CITY &&
            this.sendData.entity === element.Type
          ) {
            this.properties.push(element.LOCALNAME);
          }
        });

        // console.log("Vname", this.);
      });
    },

    PlanName() {
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
    Login() {
      axios({
        method: "POST",
        url:
          "https://stageapi.zolostays.com/crm/v2/suppliers/login?primaryContact=8764008842&passwd=bhavya123"
      }).then(response => {
        console.log("response", response.data.result[0].token);
         this.token = response.data.result[0].token
      });
     
    },

    Floor() {
      console.log('get token',this.token);
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        response.data.forEach(element => {
          if (this.sendData.property === element.LOCALNAME) {
            var centerId = element.CENTER_ID;
            
            axios({
              method: "GET",
              url:
                "https://stageapi.zolostays.com/crm/api/v1/center/" +
                centerId +
                "/housekeeping?token=" + this.token
            }).then(response => {
              console.log("meow", response);
              console.log(
                "meow",
                response.data.result[0].floors[0].flats[0].rooms
              );
              for (var i = 0; i < response.data.result[0].floors.length; i++) {
                this.floors.push(response.data.result[0].floors[i].name);
              }

              // console.log("Vname", this.);
            });
          }
        });
      });
    },

    Flat() {
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        response.data.forEach(element => {
          if (this.sendData.property === element.LOCALNAME) {
            var centerId = element.CENTER_ID;
            axios({
              method: "GET",
              url:
                "https://stageapi.zolostays.com/crm/api/v1/center/" +
                centerId +
                "/housekeeping?token=" + this.token
            }).then(response => {
              response.data.result[0].floors.forEach((element, index) => {
                if (
                  this.sendData.floor === element.name &&
                  element.flats[0].isFlatType === true
                ) {
                  console.log("element", element);
                  element.flats.forEach((ele, ind) => {
                    console.log("ele", ele);
                    ele.rooms.forEach((ele1, ind1) => {
                      console.log("ele1", ele1);
                      this.flats.push(ele1.roomName);
                    });
                  });
                }
              });

              // console.log("Vname", this.);
            });
          }
        });
      });
    },
    Room() {
      axios.get(this.baseURl + "Centers/getcityname").then(response => {
        response.data.forEach(element => {
          if (this.sendData.property === element.LOCALNAME) {
            var centerId = element.CENTER_ID;
            axios({
              method: "GET",
              url:
                "https://stageapi.zolostays.com/crm/api/v1/center/" +
                centerId +
                "/housekeeping?token=" + this.token
            }).then(response => {
              response.data.result[0].floors.forEach((element, index) => {
                if (
                  this.sendData.floor === element.name &&
                  element.flats[0].isFlatType === false
                ) {
                  console.log("element", element);
                  element.flats.forEach((ele, ind) => {
                    console.log("ele", ele);
                    ele.rooms.forEach((ele1, ind1) => {
                      console.log("ele1", ele1);
                      this.rooms.push(ele1.roomName);
                    });
                  });
                }
              });

              // console.log("Vname", this.);
            });
          }
        });
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
    this.Login();
  }
};
</script>

<style>
</style>
