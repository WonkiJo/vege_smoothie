<template>
    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="recipe-grid">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.name"
        :recipe="recipe"
        :isSelected="selectedRecipes.includes(recipe)"
        @toggle="$emit('toggleRecipe', recipe)"
      />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import RecipeCard from './RecipeCard.vue';
  
  export default defineComponent({
    name: 'RecipeList',
    components: {
      RecipeCard
    },
    props: {
      recipes: Array,
      selectedRecipes: Array,
      loading: Boolean,
      error: String
    },
    emits: ['toggleRecipe']
  });
  </script>
  
  <style scoped>
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  </style>