<template>
  <section class="conteiner">
    <h1>ログイン</h1>
    <form class="box" @submit.prevent>
      <label for="email"
        ><dl class="email">
          <dt>ID</dt>
          <dd>
            <input
              id="email"
              type="string"
              v-model="email"
              placeholder="メールアドレス"
            />
          </dd></dl
      ></label>
      <label for="password"
        ><dl>
          <dt>パスワード</dt>
          <dd>
            <input id="password" type="password" v-model="password" />
          </dd></dl
      ></label>

      <button type="button" @click.stop="userLogin">ログイン</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    login() {
      console.log('おした')
      console.log(this.email)
      console.log(this.password)
      this.$axios
        .$post('/login', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)
        })
    },
    async userLogin() {
      console.log(this.email)
      console.log(this.password)
      try {
        console.log(this.$auth)
        const response = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        console.log(response)
        const userId = this.$auth.user.id
        console.log(this.$auth.user)
        console.log(userId)
        this.$router.push(`/${userId}/noteindex`)
        // const userDataRes = await this.$axios.get('/api/user', token)

        // console.log(userDataResponse)
        // // ログイン成功時にリダイレクトする
        // if (response.data.redirect) {
        //   this.$router.push(response.data.redirect)
        // }
        // const userDataResponse = await this.axios.get('/api/user', {
        //   params: userId,
        // })
        // const userData = userDataResponse.data

        // return userData.id

        // console.log(userId)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
<style lang="scss">
h1 {
  font-weight: 800;
  font-family: 'ヒラギノ丸ゴ Pro';
  color: #565656;
  letter-spacing: 10px;
  margin: 2.5rem auto;
  display: block;
  text-align: center;
}
.box {
  // max-width: 50em;
  // max-height: 60%;
  padding: 1em 1em;
  margin: 3em auto;
  color: #565656;
  background: #e3f2ff;
  // box-shadow: 0px 0px 0px 10px #e3f2ff;
  border: solid 5px #ffdede;
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  width: 70%;
  height: 23rem;
  position: relative;
  // padding-top: 100px;
}
.email {
  padding-top: 60px;
}
dl {
  display: flex;
  justify-content: space-between;
  background-size: 15px 2px;
  background-repeat: repeat-x;
  background-position: left bottom;
  margin: 10px 3.5rem;
  padding-bottom: 25px;
  letter-spacing: 5px;
  padding-top: 30px;
  // vertical-align: middle;
}
dt {
  padding-left: 70px;
  padding-top: 15px;
  width: 150px;
}
dd {
  padding-top: 15px;
  width: calc(100% - 150px);
  text-align: left;
}
button {
  vertical-align: bottom;
  position: absolute;
  bottom: 50px;
  // margin-bottom: 10px;
}
input {
  width: 50%;
  height: 30px;
}
</style>
