<template>
  <section class="conteiner">
    <h1>My note</h1>
    <form @submit.prevent>
      <label for="name"
        ><p>名前 <input id="name" type="string" v-model="name" /></p
      ></label>
      <div>
        <label for="email"
          ><p>
            メールアドレス <input id="email" type="string" v-model="email" /></p
        ></label>
      </div>
      <label for="password"
        ><p>
          パスワード
          <input id="password" type="password" v-model="password" /></p
      ></label>
      <label for="passwordConfirm"
        ><p>
          パスワード確認
          <input
            id="passwordConfirm"
            type="password"
            v-model="passwordConfirm"
          /></p
      ></label>
      <button type="submit" @click.stop="register">登録する</button>
    </form>
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
