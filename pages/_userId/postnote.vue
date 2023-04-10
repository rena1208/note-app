<template>
  <div>
    <form @submit.prevent="post">
      <div>
        <label for="title"><p>タイトル</p></label>
        <input id="title" v-model="title" type="string" required />
      </div>
      <div>
        <label for="text"><p>メモ内容</p></label>
        <textarea id="text" v-model="text" type="text"></textarea>
      </div>
      <button type="button" @click.stop="postNote">保存</button>
    </form>
  </div>
</template>
<script>
export default {
  computed: {
    userId() {
      return this.$route.params.userId
    },
  },
  data() {
    return {
      title: '',
      text: '',
    }
  },
  methods: {
    postNote() {
      // const userId = this.$route.params.userId
      // console.log(userId)
      console.log('登録おした')
      console.log(this.title)
      console.log(this.text)
      console.log(this.$axios)
      this.$axios
        .$post('/userId/postnote', {
          title: this.title,
          text: this.text,
        })
        .then((res) => {
          console.log(res)
          // this.posts = res.data.posts
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>