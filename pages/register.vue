<template>
  <section class="conteiner">
    <body>
      <h1>新規登録</h1>
      <form class="box" @submit.prevent>
        <label for="name"
          ><dl>
            <dt>名前</dt>
            <dd><input id="name" type="string" v-model="name" /></dd></dl
        ></label>

        <label for="email"
          ><dl>
            <dt>メールアドレス</dt>
            <dd><input id="email" type="string" v-model="email" /></dd></dl
        ></label>

        <label for="password"
          ><dl>
            <dt>パスワード</dt>
            <dd>
              <input id="password" type="password" v-model="password" />
            </dd></dl
        ></label>

        <label for="passwordConfirm"
          ><dl>
            <dt>パスワード確認</dt>
            <dd>
              <input
                id="passwordConfirm"
                type="password"
                v-model="passwordConfirm"
              />
            </dd></dl
        ></label>

        <button type="submit" @click.stop="register">登録する</button>
      </form>
    </body>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },

  methods: {
    register() {
      console.log('登録おした')
      console.log(this.name)
      console.log(this.email)
      console.log(this.password)
      console.log(this.passwordConfirm)
      console.log(this.$axios)
      this.$axios
        .$post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {
          console.log(error)
          const errors = error.res.data.errors

          errors.forEach((error) => {
            const key = error.param

            if (this.errors[key] === '') {
              this.errors[key] = error.msg
            }
          })
        })
    },
  },
}
</script>

<style lang="scss">
h1 {
  font-size: 30px;
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
  height: 25rem;
  position: relative;
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
  bottom: 30px;
  // margin-bottom: 10px;
}
input {
  width: 45%;
  height: 25px;
}
</style>
