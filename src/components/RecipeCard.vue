<template>
    <button 
      @click="$emit('toggle')"
      :class="['recipe-button', { 'selected': isSelected }]"
    >
      <h3>{{ recipe.name }}</h3>
      <ul>
        <li v-for="(ingredient, name) in recipe.ingredients" :key="name">
          {{ name }}: {{ ingredient.amount }}{{ ingredient.unit }}
        </li>
      </ul>
    </button>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'RecipeCard',
    props: {
      recipe: Object,
      isSelected: Boolean
    },
    emits: ['toggle']
  });
  </script>
  
  <style scoped>
  .recipe-button {
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    text-align: left;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .recipe-button:hover {
    background-color: #e8e8e8;
  }
  
  .recipe-button.selected {
    background-color: #d4edda;
    border-color: #c3e6cb;
  }
  
  .recipe-button h3 {
    color: #42b983;
    margin-top: 0;
  }
  
  .recipe-button ul {
    padding-left: 20px;
    margin-bottom: 0;
  }
  </style>