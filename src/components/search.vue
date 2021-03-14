<template>
  <div>
    <div id="searchbox">
      <icon name="search" scale="1.5"></icon>
      <input type="search" :placeholder=this.$store.state.placeholder_message class="search_context" v-model="searchUpdate" v-on:keyup.enter="gotoSearch" >
      <slot name="cancle"></slot>
      <slot name="submit"></slot>
    </div>
  </div>

</template>

<script>
  import Icon from "vue-svg-icon/Icon";

  export default {
    name: "search",
    components: {
      Icon,
    },
    computed: {
      searchUpdate: {

        get(){

          return this.$store.state.search_content
        },
        set(value){
          this.$store.commit("updata", value);
          this.placeholder_content = this.$store.state.search_content;
        }
      }
    },
    methods: {
      gotoSearch(){
        // this.$emit("search_content", this.search_content);
        this.$emit("gotosearch");
      }
    },
    data: function (){
      return {
      }
    },
    props: ["placeholder_content"]
}
</script>

<style scoped>
  #searchbox {
    background-color: #F2F2F2;
    height: 28px;
    border-radius: 10px;
    padding-left: 5px;
    line-height: 25px;
    position: relative;
  }
  .search_context {
    display: inline-block;
    width: 90%;
    height: 25px;
    background-color: #F2F2F2;
    border: none;
    outline: none;
    -webkit-appearance: none;
  }
  input[type=search]::-webkit-search-cancel-button{
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background: url("../svg/close.svg") no-repeat;
    background-size: 18px 18px;
    border-radius: 50%;
  }
  .search_sumbit {
    width: 40px;
    height: 20px;
    border-radius: 8px;

    text-align: center;
    position: absolute;
    top: 2.5px;
    right: 5px;
    border: none;
    -webkit-appearance: none;
    background-color: #D8D8D8;
  }
  .cancle {
    width: 45px;
    height: 25px;
    border-radius: 8px;
    text-align: center;
    position: absolute;
    top: 2.5px;
    right: -55px;
    border: none;
    -webkit-appearance: none;
    background-color: #D8D8D8;
  }
</style>