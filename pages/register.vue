<template>
    <section class="conteiner">
        <h1>My note</h1>
        <form @submit.prevent>
            <label for="name"><p>名前  <input id="name" type="string"></p></label>
            <label for="email"><p>メールアドレス  <input id="email" type="string"></p></label>
            <label for="password"><p>パスワード  <input id="password" type="password"></p></label>
            <label for="passwordConfirm"><p>パスワード確認  <input id="passwordConfirm" type="password"></p></label>
            <button type="submit">登録する</button>
        </form>
    </section>
</template>