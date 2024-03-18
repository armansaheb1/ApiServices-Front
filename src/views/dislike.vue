<template>
  <CRow>
    <CCol>
      <CCard class="mb-4">
        <CCardHeader> Chat </CCardHeader>
        <CCardBody>

          <div>

            <div style="text-align: justify; padding: 2%;direction: rtl;">{{ chat.message }}
            </div>


          </div>
        </CCardBody>
      </CCard><br>

      <CCard class="mb-4">
        <CCardHeader> Texts </CCardHeader>
        <CCardBody>

          <div v-for="(item, idx) in nn" v-bind:key="item">
            <div class="card">
              <div class="card-body">
                <textarea rows="8" class="form-control" v-model="item[0]"></textarea><br>

                <button class="btn btn-dark" @click="edit(idx)">ویرایش</button>
              </div>
            </div><br>
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
    chat: [],
    nn: []
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
    async edit(id) {
      await axios
        .post('edit-text', { text: this.nn[id][0], id: this.nn[id][1] })
        .then(() => {
          this.get_texts()
        })

    },
    async get_texts() {
      const id = this.$route.params.id
      await axios
        .get(`dislikes/${id}`)
        .then(response => {
          this.chat = response.data
          console.log(response.data)
          for (var item of response.data.get_dislikes) {
            this.nn.push([item.text, item.id])
          }
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