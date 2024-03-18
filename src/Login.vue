<template>
    <div
        style="background-size: 100% 100%; position: absolute; width: 60%; margin-left: 20%; height:100%; top: 0; left: 0; padding-top: 110px">
        <br><br>
        <div style="z-index:100; text-align: center;">
            <div v-if="login && !forgot">

                <div class="card" style="">
                    <div class="card-header"
                        :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }">
                        <div v-if="$store.state.language">ورود</div>
                        <div v-if="!$store.state.language">Login</div>
                    </div>

                    <div class="card-body">
                        <form @submit.prevent="submitForm()">
                            <div id='form1'>
                                <input style="text-align: left" type="text" class="form-control" v-model="username"
                                    placeholder="Email" name="" id="">
                                <br>
                                <div class="form-group">
                                    <div class="" id="show_hide_password">
                                        <input style="text-align: left" v-model="password" placeholder="Password"
                                            class="form-control" type="password">
                                        <div class="input-group-addon">
                                        </div>
                                    </div>
                                </div>

                                <p style="text-align:left; font-size:10px; color: grey; margin: 3px"> Forgot Your
                                    Passwrod ?<a style="color: #444" href="#" @click="forgot = true">Click Here</a></p>
                            </div><br>
                            <div id="form2" hidden>
                                <label for="">Google Authenticator Code</label>
                                <input style="text-align: right" v-model="gcode" placeholder="Password"
                                    class="form-control" id="passfld" type="text"><br>
                            </div>
                            <button v-if="$store.state.language" class="btn btn-dark form-control">ورود</button>
                            <button v-if="!$store.state.language" class="btn btn-dark form-control">LOGIN</button>

                            <br>
                        </form>
                    </div>
                </div>
            </div>
            <div class="card-body" v-if="forgot">

                <div class="card">
                    <div class="card-header"
                        :class="{ 'bannerbg-dark': $store.state.isDark, 'bannerbg-light': !$store.state.isDark }">
                        <div v-if="$store.state.language">
                            فراموشی رمز
                        </div>
                        <div v-if="!$store.state.language">
                            Forgot Password
                        </div>

                    </div>
                    <div class="card-body">
                        <p v-if="ferror" class="alert alert-danger">Can't Find any Account With This Email</p>
                        <p v-if="fsuccess" class="alert alert-success">Change Password Link Sent</p>
                        <form @submit.prevent="fsubmitForm()">
                            <div id='form1'>
                                <input required style="text-align: right" type="text" class="form-control"
                                    v-model="fusername" placeholder="Email" name="" id="">
                                <br>
                            </div>
                            <button v-if="$store.state.language" class="btn btn-dark form-control">ثبت</button>
                            <button v-if="!$store.state.language" class="btn btn-dark form-control">Submit</button>

                            <br><br>
                            <p style="text-align:right; font-size:14px; text-align: center"> <a href="#"
                                    @click="forgot = false; login = true">Login</a></p>



                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
        errors2: [],
        ptool: '',
        utool: '',
        username: '',
        fusername: '',
        password: '',
        isShow: false,
        Rerrors: [],
        Cerrors: '',
        Rerrors2: [],
        Remail: '',
        Retool: '',
        Rutool: '',
        Rpassword: '',
        Rptool: '',
        Rrepassword: '',
        Rlast_name: '',
        Rfirst_name: '',
        slash: true,
        sslash: true,
        login: true,
        success: false,
        Rreptool: '',
        RisShow: false,
        forgot: false,
        fsuccess: false,
        ferror: false,
        verify: false,
        RRerrors: '',
        codder: false,
        code: '',
        phone: ''
    }),
    mounted() {
        document.title = ' My AI Services| Login '
    },
    methods: {
        async submitForm() {
            this.errors = []
            axios.defaults.headers.common.Authorization = ''
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            this.$store.commit('removeToken')
            const formData = {
                username: this.username.toLowerCase(),
                password: this.password
            }
            await axios
                .post('auth/token/login', formData)
                .then(response => {
                    if (response.data == 1) {
                        document.getElementById('form1').hidden = true
                        document.getElementById('form2').hidden = false
                        return
                    }
                    const token = response.data.auth_token
                    this.$store.commit('setToken', token)
                    axios.defaults.headers.common.Authorization = 'Token ' + token
                    this.$store.state.isAuthenticated = true
                    localStorage.setItem('token', token)
                    setTimeout(() => {
                        var elem = document.createElement('a')
                        elem.href = '/'
                        elem.click()
                    }, 1000);

                })
                .catch(error => {
                    console.log(error)
                    if (error.response) {
                        if (error.response.data.length) {
                            this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>${error.response.data[0]}</h5>`)
                        } else {
                            this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>Incorrect Username Or Password</h5>`)

                        }
                    } else if (error.message) {
                        this.$swal(`<div class="swal2-icon swal2-error swal2-icon-show" style="display: flex;"><span class="swal2-x-mark"><span class="swal2-x-mark-line-left"></span><span class="swal2-x-mark-line-right"></span></span></div><h5>${error.message}</h5>`)
                    }
                })
        },
        async fsubmitForm() {
            this.fsuccess = false
            this.ferror = false
            await axios
                .post('password_reset/', { email: this.fusername })
                .then(response => {
                    this.fsuccess = true
                })
                .catch(error => {
                    this.ferror = true
                })
        }
    }
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