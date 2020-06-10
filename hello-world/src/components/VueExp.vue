<template>
  <div>
    <h1>Vue Exp</h1>
    <div>
      <div role="button">
        Where are you?
      </div>
    </div>
    <div>
      <label id="ex3-label" class="combobox-label">
        Choice 3 Fruit or Vegetable
      </label>
      <div class="combobox-wrapper">
        <div role="combobox"
             :aria-expanded="showOptions"
             aria-owns="ex3-listbox"
             aria-haspopup="listbox"
             id="ex3-combobox">
          <input type="text" v-model="textInput" v-on:input="onTextInput($event)"
                 aria-autocomplete="both"
                 aria-controls="ex3-listbox"
                 aria-labelledby="ex3-label"
                 aria-describedby="inputGroup"
                 id="ex3-input">
          <div class="combobox-dropdown"
               id="ex3-combobox-arrow"
               tabindex="-1"
               role="button"
               aria-label="Show vegetable options">
          </div>
          <div class="input-group-prepend" :class="{'hidden' : !firstResult}">
            <div role="button" id="inputGroup" :value="firstResult" >{{firstResult}}</div>
          </div>
        </div>
        <ul aria-labelledby="ex3-label"
            role="listbox"
            id="ex3-listbox"
            class="listbox">
          <li v-bind:key="item" v-for="item in resultItems">
            <button :aria-controls="item" aria-expanded="false" v-on:click="selectClick(item)">{{item}}</button>
          </li>
        </ul>
      </div>
      <div>
<!--        <ul v-if="listItems">-->
<!--          <li v-bind:key="item" v-for="(item) in listItems"-->
<!--            @keyup.esc="closeInfoBox">-->
<!--            <button to="" :aria-controls="infoboxOpen ? item.name : ''" aria-expanded="false">Designathon</button>-->
<!--          </li>-->
<!--        </ul>-->
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {debounce} from 'debounce'

  export default {
    name: 'VueExp',
    computed: {...mapGetters(['DataList'])},
    data() {
      return {
        showOptions: false,
        textInput: '',
        resultItems: [],
        firstResult: '',
        listItems: ['apple', 'banana', 'orange', 'grape', 'grapefruit', 'pear', 'blueberry', 'strawberry']
      }
    },
    methods: {
      onTextInput: debounce(function (e) {
        const results = [];
        for (let i = 0; i < this.listItems.length; i++) {
          let veggie = this.listItems[i].toLowerCase();
          if (veggie.indexOf(e.target.value.toLowerCase()) >= 0) {
            results.push(this.listItems[i]);
          }
        }

        // this.firstResult = results[0];
        this.resultItems = results.slice();
        this.showOptions = this.resultItems.length > 0;
      }, 300),
      selectClick(e) {
        console.log('selectClick', e) ;
      }
    },
    created() {
      const vm = this;
      vm.$store.dispatch('setDataList', ['apple', 'banana', 'orange', 'grape', 'grapefruit', 'pear', 'blueberry', 'strawberry']);
      document.getElementById('')
      // window.addEventListener('load', function () {
      //   var ex3Combobox = new aria.ListboxCombobox(
      //     document.getElementById('ex3-combobox'),
      //     document.getElementById('ex3-input'),
      //     document.getElementById('ex3-listbox'),
      //     this.searchVeggies,
      //     true,
      //     function () {
      //       // on show
      //       document.getElementById('ex3-combobox-arrow')
      //         .setAttribute('aria-label', 'Hide vegetable options');
      //     },
      //     function () {
      //       // on hide
      //       document.getElementById('ex3-combobox-arrow')
      //         .setAttribute('aria-label', 'Show vegetable options');
      //     }
      //   );


        // document.getElementById('ex3-combobox-arrow').addEventListener(
        //   'click',
        //   function () {
        //     if (ex3Combobox.shown) {
        //       document.getElementById('ex3-input').focus();
        //       ex3Combobox.hideListbox();
        //     }
        //     else {
        //       document.getElementById('ex3-input').focus();
        //       ex3Combobox.updateResults(true);
        //     }
        //   }
        // );
      // });
    }
  }
</script>

<style scoped>
  .annotate {
    font-style: italic;
    color: #366ed4;
  }

  .hidden {
    display: none;
  }

  .combobox-wrapper {
    display: inline-block;
    position: relative;
    font-size: 16px;
  }

  .combobox-label {
    font-size: 14px;
    font-weight: bold;
    margin-right: 5px;
  }

  .listbox,
  .grid {
    min-width: 230px;
    background: white;
    border: 1px solid #ccc;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 1.7em;
    z-index: 1;
  }

  .listbox .result {
    cursor: default;
    margin: 0;
  }

  .grid .result-row {
    padding: 2px;
    cursor: default;
    margin: 0;
  }

  .listbox .result:hover,
  .grid .result-row:hover {
    background: rgb(139, 189, 225);
  }

  .listbox .focused,
  .grid .focused {
    background: rgb(139, 189, 225);
  }

  .grid .focused-cell {
    outline-style: dotted;
    outline-color: green;
  }

  .combobox-wrapper input {
    font-size: inherit;
    border: 1px solid #aaa;
    border-radius: 2px;
    line-height: 1.5em;
    padding-right: 30px;
    width: 200px;
  }

  .combobox-dropdown {
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 0 2px;
    height: 1.5em;
    border-radius: 0 2px 2px 0;
    border: 1px solid #aaa;
  }

  .grid .result-cell {
    display: inline-block;
    cursor: default;
    margin: 0;
    padding: 0 5px;
  }

  .grid .result-cell:last-child {
    float: right;
    font-size: 12px;
    font-weight: 200;
    color: #333;
    line-height: 24px;
  }
  .input-group-prepend {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
  }
  .flex-div {
    align-items: center;
    box-sizing: border-box;
    flex-direction: row;
    flex-grow: 1;
    flex-wrap: wrap;
  }
</style>
