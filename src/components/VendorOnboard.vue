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
                <v-flex sm12 md3>
                  <v-select
                    v-model="sendData.usercity" :rules="['Required']" 
                    :items="cities"
                    required
                    label="City"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md3>
                  <v-select
                    v-model="sendData.utility" :rules="['Required']" 
                    :items="utilities"
                    reuired
                    label="Utility"
                    outline
                  ></v-select>
                </v-flex>
                <v-flex sm12 md3>
                  <v-text-field v-model="sendData.vendor" :rules="['Required']"  label="Vendor Name " outline></v-text-field>
                </v-flex>
                <v-flex sm12 md3>
                  <v-text-field v-model="sendData.contact" :rules="['Required']"  label="Contact Person Name " outline></v-text-field>
                </v-flex>
                <v-layout row wrap>
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.phone" :rules="['Required']"  label="Phone No" outline></v-text-field>
                  </v-flex>
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.altphone":rules="['Required']"  label="Alternate No " outline></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.email" :rules="['Required']"  label="Email " outline></v-text-field>
                  </v-flex>
                  <v-flex sm12 md6>
                    <v-text-field v-model="sendData.altemail" label="Alternate Email " outline></v-text-field>
                  </v-flex>
                </v-layout>
                <v-card-text>
                  <v-data-table :headers="headers" :items="rows" class="elevation-1" hide-actions>
                    <template v-slot:items="props">
                      <tr v-for="item1 in rowNum" :key="item1">
                        <td>
                          <v-btn color="primary" @click="decRow">Delete</v-btn>
                        </td>
                        <td>{{ props.item.type }}</td>
                        <td>
                          <v-text-field :rules="['Required']"  v-model="props.item.formName[item1-1]" label="Name"></v-text-field>
                        </td>
                        <td>
                          <v-text-field  :rules="['Required']"  v-model="props.item.formType[item1-1]" label="Type"></v-text-field>
                        </td>
                        <td>
                          <v-text-field  :rules="['Required']"  v-model="props.item.formPhone[item1-1]" label="Phone"></v-text-field>
                        </td>
                        <td>
                          <v-text-field :rules="['Required']"  v-model="props.item.formEmail[item1-1]" label="Email"></v-text-field>
                        </td>
                      </tr>
                      <v-btn color="primary" @click="incRow">Add</v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>

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
import axios from "axios";
export default {
  Name: "VendorOnboard",
  data: () => ({
    baseURl: "http://3.218.108.144:4201/",
    rowNum: 0,
    tabs: '',
    required:[],
    Lastvid: 0,
    sendData: {
      usercity: "",
      utility: "",
      vendor: "",
      contact: "",
      phone: "",
      altphone: "",
      email: "",
      altemail: ""
    },
    rows: [
      {
        vid: [],
        formName: [],
        formType: [],
        formEmail: [],
        formPhone: []
      }
    ],
    rows1: {
      vid: "",
      formName: "",
      formType: "",
      formEmail: "",
      formPhone: ""
    },
    cities: [],
    utilities: ["Dth", "Internet"],
    username: "",
    headers: [{ text: "Escalation", value: "Esc" }]
  }),
  methods: {
    addNewRow() {
      this.items.assign({
        vid: "",
        formName: "",
        formType: "",
        formEmail: "",
        formPhone: ""
      });
    },
    delRow() {
      this.delete.row1;
    },
    incRow() {
      this.rowNum++;
    },
    decRow() {
      this.rowNum--;
    },

    async getData() {
      console.log("sendData", this.sendData);
      console.log("rows", this.rows);
      for (var index = 0; index < this.rows.length; index++) {
        console.log("meowww", this.sendData);
        console.log("hi", this.rows[0]);

        await axios.post(this.baseURl + 'vendor/insert', this.sendData);
      }
      for (var index = 0; index < this.rowNum; index++) {
        console.log("rowNum", this.rowNum);
        console.log("bye1", this.rows[0]);
        this.rows1.vid = this.Lastvid + 1;
        if (this.rows[0].formName[index] === undefined) {
          this.rows[0].formName[index] = " ";
        }
        if (this.rows[0].formType[index] === undefined) {
          this.rows[0].formType[index] = " ";
        }
        if (this.rows[0].formEmail[index] === undefined) {
          this.rows[0].formEmail[index] = " ";
        }
        if (this.rows[0].formPhone[index] === undefined) {
          this.rows[0].formPhone[index] = " ";
        }
        this.rows1.formName = this.rows[0].formName[index];
        this.rows1.formType = this.rows[0].formType[index];
        this.rows1.formEmail = this.rows[0].formEmail[index];
        this.rows1.formPhone = this.rows[0].formPhone[index];
        console.log("bye", this.rows1);
        console.log("index", index);
        await axios.post(this.baseURl + 'escalation/insert', this.rows1);
      }
    },
    VendorId() {
      axios.get(this.baseURl + 'vendor/getvid').then(response => {
        console.log("hi", response.data);
        if (response.data[0].vid === undefined) {
          this.Lastvid = 0;
        } else {
          this.Lastvid = response.data[0].vid;
        }
      });
      console.log("Lastvid", this.Lastvid);
    },
    City(){
      console.log('Reached Here')
       axios.get(this.baseURl + 'Centers/getcityname').then(response => {
         console.log(response)
        response.data.forEach(element => {
          
            this.cities.push(element.CITY);
          
        });

      });
    }
  },
  mounted(){
    this.City();
     this.VendorId();
  }
};
</script>

<style>
</style>
