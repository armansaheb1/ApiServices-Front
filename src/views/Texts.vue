<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Add Text </CCardHeader>
        <CCardBody>
          <label style="text-align:left; width: 100%; padding: 3px;">Text</label>
          <textarea v-model="text" class="form-control" name="" id="" cols="30" rows="3"></textarea>
          <br>
          <button @click="submit()" class="btn btn-dark" style="float: right;">Add</button>


        </CCardBody>
      </CCard>
      <CCard class="mb-4">
        <CCardHeader> Texts </CCardHeader>
        <CCardBody>
          <div>
            <div v-for="item in texts" v-bind:key="item">
              <div style="text-align: left;">{{ item.text }}<br><a class="btn btn-dark from-control"
                  style="margin: 1%; width: 48%" :href="'/texts/' + item.id">Edit</a>
                <button class="btn btn-dark from-control" style="margin: 1%; width: 48%"
                  @click="deletes(item.id)">Delete</button>
              </div>
              <hr>
            </div>

          </div>
        </CCardBody>
      </CCard>

    </CCol>
  </CRow>
</template>

<script>
import axios from 'axios'
export default {
  name: 'pages-authentication-login-v1',
  metaInfo: {
    title: 'Login v1 - Pages'
  },
  components: {
  },
  data: () => ({
    errors: [],
    text: '',
    texts: []
  }),
  mounted() {
    document.title = ' My AI Services| Login '
    this.get_texts()
  },
  methods: {
    async submit() {
      await axios
        .post('texts', { text: this.text })
        .then(response => {
          this.text = ''
          this.texts = response.data
        })

    },
    async get_texts() {
      await axios
        .post('texts')
        .then(response => {
          this.texts = response.data
        })

    },
    async deletes(id) {
      await axios
        .delete(`texts/${id}`)
        .then(response => {
          this.texts = response.data
        })

    }
  },
}
</script>
<style>
div {
  font-family: myFirstFont;
}

#passfld {
  text-security: disc;
  -webkit-text-security: disc;
  -mox-text-security: disc;
}

.invalid-tooltip {
  position: relative;
  top: 0;
  background-color: rgba(0, 0, 0, 0);
  color: red;
  text-align: left;
}



.login-btn {
  width: 40%;
  float: left;
  background: none;
  border-style: none;
  padding: 10px;
  color: grey !important;
  background-color: lightgray;
  margin: 5%
}

.login-btn:hover {
  background: grey;
  color: black !important
}

.active {
  background: rgb(254, 208, 1) !important;
}
</style>