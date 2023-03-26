<template>

    <section class="conteiner">
        <h1>My note</h1>
        <form @submit.prevent>
            <label for="name"><p>名前  <input id="name" type="string"></p></label>
            <label for="email"><p>メールアドレス  <input id="email" type="string"></p></label>
            <label for="password"><p>パスワード  <input id="password" type="password"></p></label>
            <label for="passwordConfirm"><p>パスワード確認  <input id="passwordConfirm" type="password"></p></label>
            <button type="submit" @click.stop="register">登録する</button>
        </form>
    </section>
</template>

<script>
  const url = "/api/form"
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      };
    },
    
    methods: {
        register() {
            console.log("登録おした");
            console.log(this.$axios);
            this.$axios
            .$post("/register", {
                name: this.name,
                email: this.email,
                password: this.password,
                passwordConfirm: this.passwordConfirm,
            })
            .then((response) => {
                console.log(response);
            });    
        },  
    },
  };
</script>
