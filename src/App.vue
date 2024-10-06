<template>
  <div id="app">
    <h1>채소 스무디 레시피 선택기</h1>
    
    <IngredientSum :selectedRecipes="selectedRecipes" />

    <div class="controls">
      <button @click="selectRandomRecipes" class="random-button">무작위로 3개 고르기</button>
    </div>

    <RecipeList 
      :recipes="recipes"
      :selectedRecipes="selectedRecipes"
      @toggleRecipe="toggleRecipe"
    />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import RecipeList from './components/RecipeList.vue';
import IngredientSum from './components/IngredientSum.vue';
import useRecipes from './composables/useRecipes';

export default {
  name: 'App',
  components: {
    RecipeList,
    IngredientSum
  },
  setup() {
    const { 
      recipes, 
      selectedRecipes, 
      loading, 
      error, 
      toggleRecipe, 
      selectRandomRecipes,
      loadRecipes 
    } = useRecipes();

    onMounted(loadRecipes);

    return {
      recipes,
      selectedRecipes,
      loading,
      error,
      toggleRecipe,
      selectRandomRecipes
    };
  }
}
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
}

.controls {
  text-align: center;
  margin-bottom: 20px;
}

.random-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.random-button:hover {
  background-color: #3aa876;
}
</style>