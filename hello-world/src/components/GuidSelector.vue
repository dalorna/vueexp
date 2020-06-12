<template>
    <div :style="{ width: selectorWidth + 'px' }">
      <label id="multiLabel" class="combobox-label">{{title}}</label>
      <div class="select-container">
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
        <div class="e-ddl e-control e-popup" id="select_popup" :class="{'hide' : !showPopup}" :style="{ height: popupHeight + 'px', width: selectorWidth + 'px'  }">
          <div class="e-dropDownBase e-content" tabindex="0" style="max-height: 200px;"  :style="{ height: popupHeight + 'px' }">
            <ul class="e-list-parent e-ul" id="select_options" :style="{ width: (selectorWidth - 20) + 'px' }" >
              <li v-for="(item, index) in popupListItems" v-bind:key="item.id" class="e-list-item"
                  :class="{'e-hide-listItem' : item.hide, 'e-list-active-item' : index === activateSelectedIndex}"
                  :id="'listItem_' + item.id" role="option" v-on:click="selectClick(item)">{{item.name}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {debounce} from 'debounce'
  export default {
    name: 'GuidSelector',
    props: [
      'title',
      'options',
      'controlWidth'
    ],
    computed: {
      selectorWidth() {
        return this.controlWidth || 200;
      }
    },
    data() {
      return {
        popupListItems: [],
        selectedListItems: [],
        showPopup: false,
        activeSelection: null,
        activateSelectedIndex: null,
        popupHeight: 200
      }
    },
    methods: {
      onSelectInput: debounce(function (e) {
        const changeText = e && e.target ? e.target.value.toLowerCase() : '';

        if (changeText.length > 0) {
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
      this.popupListItems = this.options;

    },
    mounted () {
      document.addEventListener("keyup", this.highlightSelection);
    }
  }
</script>

<style scoped>

</style>
