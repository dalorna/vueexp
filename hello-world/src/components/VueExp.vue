<template>
  <div>
    <h1>Vue Exp</h1>
    <div>
      <label id="ex3-label" class="combobox-label">
        Choice 3 Fruit or Vegetable
      </label>
      <div class="combobox-wrapper">
        <div role="combobox"
             :aria-expanded="false"
             aria-owns="ex3-listbox"
             aria-haspopup="listbox"
             id="ex3-combobox">
          <input type="text" v-model="textInput" v-on:input="onTextInput($event)"
                 v-on:blur="onBlurInput($event)"
                 v-on:focus="onFocusInput($event)"
                 aria-autocomplete="both"
                 aria-controls="ex3-listbox"
                 aria-labelledby="ex3-label"
                 aria-describedby="inputGroup"
                 id="ex3-input">
          <div class="input-group-prepend" :class="{'hidden' : !firstResult}">
            <div role="button" id="inputGroup" :value="firstResult" >{{firstResult}}</div>
          </div>
        </div>
        <ul aria-labelledby="ex3-label"
            role="listbox"
            id="ex3-listbox"
            class="listbox">
          <li v-bind:key="item" v-for="item in resultItems">
            <button :aria-controls="item" aria-expanded="false" >{{item}}</button>
          </li>
        </ul>
      </div>
      <br />
      <br />
      <br />
      <div class="select-container">
        <label id="multiLabel" class="combobox-label">Select Sport</label>
        <div class="e-multiselect">
          <div class="e-multi-select-wrapper" >
          <span class="e-chips-collection" id="chip_default_0">
            <template v-for="item in selectedListItems" >
              <span class="e-chips" v-bind:key="item.id">
                <span class="e-chipContent">{{item.name}}</span>
                <b-icon-trash v-on:click="removeSelection(item.id)"></b-icon-trash>
              </span>
            </template>
          </span>
            <span class="e-searcher">
            <input class="e-dropDownBase" spellcheck="false" type="text" autocomplete="off" tabindex="1"
                   placeholder="Select Sport" size="15"
                   v-on:input="onSelectInput($event)"
                   v-on:blur="onBlurSelectInput($event)"
                   v-on:keypress="highlightSelection($event)"
                   id="searchInput"
            >
          </span>
          </div>
        </div>
        <div class="e-ddl e-control e-popup" id="select_popup" :class="{'hide' : !showPopup}" :style="{ height: popupHeight + 'px' }">
          <div class="e-content e-dropDownBase" tabindex="0" style="max-height: 200px;"  :style="{ height: popupHeight + 'px' }">
            <ul class="e-list-parent e-ul" id="select_options" >
              <li v-for="(item, index) in popupListItems" v-bind:key="item.id" class="e-list-item"
                  :class="{'e-hide-listItem' : item.hide, 'e-list-active-item' : index === activateSelectedIndex}"
                  :id="'listItem_' + item.id" role="option" v-on:click="selectClick(item)">{{item.name}}
              </li>
            </ul>
          </div>
        </div>
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
        listItems: ['apple', 'banana', 'orange', 'grape', 'grapefruit', 'pear', 'blueberry', 'strawberry'],
        popupListItems:[
          {name: 'Cricket', id: '1', hide: false},
          {name: 'Football', id: '2', hide: false},
          {name: 'Golf', id: '3', hide: false},
          {name: 'Hockey', id: '4', hide: false},
          {name: 'Rugby', id: '5', hide: false},
          {name: 'Snooker', id: '6', hide: false},
          {name: 'Tennis', id: '7', hide: false},
          {name: 'Baseball', id: '8', hide: false},
          {name: 'Basketball', id: '9', hide: false},
          {name: 'Soccer', id: '10', hide: false}],
        selectedListItems: [],
        showPopup: false,
        activeSelection: null,
        activateSelectedIndex: null,
        popupHeight: 200
      }
    },
    methods: {
      onTextInput: debounce(function (e) {
        if (e.target.value) {
          const results = [];
          for (let i = 0; i < this.listItems.length; i++) {
            let veggie = this.listItems[i].toLowerCase();
            if (veggie.indexOf(e.target.value.toLowerCase()) >= 0) {
              results.push(this.listItems[i]);
            }
          }

          this.resultItems = results.slice();
          this.showOptions = this.resultItems.length > 0;
        } else {
          this.resultItems = [];
          this.showOptions = false;
        }

      }, 300),
      onBlurInput: debounce(function (e) {
        this.resultItems = [];
        this.showOptions = false;
      }, 100),
      onFocusInput: debounce(function (e) {
        if (e.target.value) {
          const results = [];
          for (let i = 0; i < this.listItems.length; i++) {
            let veggie = this.listItems[i].toLowerCase();
            if (veggie.indexOf(e.target.value.toLowerCase()) >= 0) {
              results.push(this.listItems[i]);
            }
          }

          this.resultItems = results.slice();
          this.showOptions = this.resultItems.length > 0;
        } else {
          this.resultItems = [];
          this.showOptions = false;
        }
      }, 100),

      onSelectInput: debounce(function (e) {
        const changeText = e && e.target ? e.target.value.toLowerCase() : '';

        if (changeText.length > 1) {
          for (let i = 0; i < this.popupListItems.length; i++) {
            let item = this.popupListItems[i];
            let sport = item.name.toLowerCase();
            let isSelected = !!this.selectedListItems.find(f => f.id === item.id);
            this.popupListItems[i].hide = (!(sport.indexOf(changeText) >= 0) || isSelected);
          }

          this.showPopup = this.popupListItems.map(m => !m.hide).reduce((a, b) => a || b);
          this.popupHeight = this.popupListItems.filter(m => !m.hide).length * 38;
        } else {
          this.showPopup = false;
          this.activeSelection = null;
          this.activateSelectedIndex = null;
        }
      },100),
      onBlurSelectInput: debounce(function (e) {
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        this.onSelectInput('');
      },250),
      removeSelection: debounce(function (e) {
        const index = this.selectedListItems.findIndex(i => i.id === e);
        const popupIndex = this.popupListItems.findIndex(i => i.id === e);
        this.popupListItems[popupIndex].hide = false;
        this.selectedListItems.splice(index, 1);
      }),
      highlightSelection: debounce(function (e) {
        // UP 38, DOWN 40, ENTER 13
        if (this.showPopup && (e.keyCode === 38 || e.keyCode === 40)) {
          const showingItems = this.popupListItems.filter(f => !f.hide);
          if (this.activeSelection === null) {
            this.activeSelection = 0;
          } else {
            if (e.keyCode === 38) {
              if (this.activeSelection > 0) {
                this.activeSelection--;
              }
            } else if (e.keyCode === 40) {
              if (this.activeSelection >= 0 && this.activeSelection < (showingItems.length - 1)) {
                this.activeSelection++;
              } else if (this.activeSelection === null) {
                this.activeSelection = 0;
              }
            }
          }

          this.activateSelectedIndex = this.popupListItems.findIndex(i => i.id === showingItems[this.activeSelection].id);
          document.getElementById('listItem_' + this.popupListItems[this.activateSelectedIndex].id).scrollIntoView(false);
        }
        else if(this.showPopup && e.keyCode === 13) {
          this.selectedListItems.push(this.popupListItems[this.activateSelectedIndex]);
          e.hide = true;
          const searchInput = document.getElementById('searchInput');
          searchInput.value = '';
          this.onSelectInput('');
          this.activeSelection = null;

        }
      }, 100),
      selectClick(e) {
        this.selectedListItems.push(e);
        e.hide = true;
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        this.onSelectInput('');
      }
    },
    created() {
      const vm = this;
      vm.$store.dispatch('setDataList', ['apple', 'banana', 'orange', 'grape', 'grapefruit', 'pear', 'blueberry', 'strawberry']);
    },
    mounted () {
      document.addEventListener("keyup", this.highlightSelection);
    }
  }
</script>

<style lang="scss" scoped >
  .annotate {
    font-style: italic;
    color: #366ed4;
  }
  .hidden {
    display: none;
  }
  .flex-div {
    align-items: center;
    box-sizing: border-box;
    flex-direction: row;
    flex-grow: 1;
    flex-wrap: wrap;
  }
  .select-container {
    margin: 0 auto;
    width: 500px;
    visibility: visible;
  }
  .e-multiselect {
    width: 100%;
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }
  .e-multi-select-wrapper {
    border: solid 1px gray;
    box-sizing: border-box;
    cursor: text;
    line-height: normal;
    min-height: 30px;
    padding: 0 32px 0 0;
    position: relative;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 100%;
    .e-chips {
      -ms-flex-align: center;
      align-items: center;
      display: -ms-inline-flexbox;
      display: inline-flex;
      float: left;
      margin: 0 8px 6px 0;
      max-width: 100%;
      overflow: hidden;
      padding: 0 4px 0 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: #eee;
      border-radius: 16px;
      height: 24px;
    }

  }
  .e-chipContent {
    color: rgba(0, 0, 0, 0.87);
    font-family: inherit;
    font-size: 13px;
    max-width: 100%;
    overflow: hidden;
    padding: 0 4px 0 0;
    text-indent: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .e-searcher {
    display: block;
    width: auto;
    float: left;
  }
  .e-control {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-radius: 0;
    box-sizing: content-box;
    content: '';
  }
  .e-multi-hidden {
    border: 0;
    height: 0;
    position: absolute;
    visibility: hidden;
    width: 0;
  }
  .e-chips-collection {
    cursor: default;
    display: block;
  }
  .e-dropDownBase {
    box-sizing: content-box;
    content: "";
    display: block;
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    outline-offset: -2px;
    min-height: 28px;
    text-align: start;
    text-overflow: ellipsis;
    text-rendering: auto;
    height: 28px;
    letter-spacing: normal;
    line-height: normal;
    outline-style: none;
    outline-width: 0px;
    writing-mode: horizontal-tb;
    --webkit-appearance: none;
    -webkit-rtl-ordering: logical;
    -webkit-border-image: none;
    border: none;
    width: auto;

  }
  .e-ddl {
    background-attachment:scroll;
    background-clip:border-box;
    background-color:rgb(255, 255, 255);
    background-image:none;
    background-origin:padding-box;
    background-position-x:0;
    background-position-y:0;
    background-size:auto;
    border-bottom-color:rgb(0, 0, 0);
    border-bottom-style:none;
    border-bottom-width:0;
    border-image-repeat:stretch;
    border-image-source:none;
    border-image-width:1;
    border-left-color:rgb(0, 0, 0);
    border-left-style:none;
    border-left-width:0;
    border-right-color:rgb(0, 0, 0);
    border-right-style:none;
    border-right-width:0;
    border-top-color:rgb(0, 0, 0);
    border-top-style:none;
    border-top-width:0;
    box-shadow:rgba(0, 0, 0, 0.2) 0 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
    box-sizing:content-box;
    display:block;
    font-family:Roboto, "Segoe UI", GeezaPro, "DejaVu Serif", sans-serif, -apple-system, BlinkMacSystemFont;
    font-size:12px;
    font-weight:400;
    height:200px;
    left:463px;
    margin-top:2px;
    max-height:200px;
    overflow-x:visible;
    overflow-y:visible;
    position:static;
    top:40px;
    width:500px;
    z-index:1011;
  }
  .e-dropDownBase.e-content {
    overflow: auto;
    position: relative;
    height: 100%;
    width: 500px;
  }
  .e-list-parent{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  ul {
    list-style-type: none;
  }
  li {
    text-align: -webkit-match-parent;
  }
  li:hover {
    background-color: lightslategrey;
  }
  .e-list-item.e-list-active-item {
    background-color: #454445;
  }
  .e-list-item {
    border: 1px solid transparent;
    background-color: #fff;
    font-size: 13px;
    line-height: 36px;
    min-height: 36px;
    padding-right: 16px;
    text-indent: 16px;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    text-overflow: ellipsis;
    vertical-align: middle;
    white-space: nowrap;
    width: 100%;
    box-sizing: border-box;
  }
  .e-item-focus {
    background-color: #eee;
  }
  .e-hide-listItem {
    display: none;
  }
  .e-ul {
    width: 480px;
  }
  .e-popup {
    max-height: 300px; top: 40px; z-index: 1094;
  }
  .e-ddl.e-control.e-popup.hide {
    display: none;
  }
</style>
