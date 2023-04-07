<template>
  <div>
    <nav>
      <ul>
        <!-- <li><nuxt-link to="/">ホーム</nuxt-link></li> -->
        <li>
          <nuxt-link to="/show"><a>メモ一覧</a></nuxt-link>
        </li>
        <li v-if="$auth.loggedIn"><a @click.prevent="logout">ログアウト</a></li>
      </ul>
    </nav>
    <nuxt />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style lang="scss">
* {
  margin: 0px;
  padding: 0px;
}

nav {
  background-color: #fdf2f2;
  width: 100%;
  height: 45px;
  font-size: 18px;
  margin: 0;
}
li {
  list-style: none;
  margin-left: 15px;
  padding-top: 10px;
  vertical-align: bottom;
}
ul {
  display: flex;
  padding-left: 0;
  justify-content: flex-end;
  padding-right: 20px;
}
a {
  color: #565656;
  text-decoration: none;
  cursor: pointer; /*カーソルを変える*/
  padding-right: 6px;
}
</style>