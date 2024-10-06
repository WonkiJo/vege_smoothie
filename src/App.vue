<template>
  <div id="app">
    <h1>채소 스무디 레시피 선택기</h1>
    
    <div v-if="selectedRecipes.length > 0" class="ingredient-sum">
      <h2>선택된 레시피의 총 재료 (물, 알룰로스, 레몬즙 제외):</h2>
      <ul>
        <li v-for="(amount, name) in ingredientSum" :key="name">
          {{ name }}: {{ amount.amount }}{{ amount.unit }}
        </li>
      </ul>
    </div>

    <div class="controls">
      <button @click="selectRandomRecipes" class="random-button">무작위로 3개 고르기</button>
    </div>

    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="recipe-grid">
      <button 
        v-for="recipe in recipes" 
        :key="recipe.name" 
        @click="toggleRecipe(recipe)"
        :class="['recipe-button', { 'selected': selectedRecipes.includes(recipe) }]"
      >
        <h3>{{ recipe.name }}</h3>
        <ul>
          <li v-for="(ingredient, name) in recipe.ingredients" :key="name">
            {{ name }}: {{ ingredient.amount }}{{ ingredient.unit }}
          </li>
        </ul>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import smoothieRecipes from './data/smoothie-recipes.json';

export default {
  name: 'App',
  setup() {
    const recipes = ref([]);
    const selectedRecipes = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const excludedIngredients = ['물', '알룰로스', '레몬즙'];

    const toggleRecipe = (recipe) => {
      const index = selectedRecipes.value.indexOf(recipe);
      if (index === -1) {
        selectedRecipes.value.push(recipe);
      } else {
        selectedRecipes.value.splice(index, 1);
      }
    };

    const selectRandomRecipes = () => {
      const shuffled = [...recipes.value].sort(() => 0.5 - Math.random());
      selectedRecipes.value = shuffled.slice(0, 3);
    };

    const ingredientSum = computed(() => {
      const sum = {};
      selectedRecipes.value.forEach(recipe => {
        Object.entries(recipe.ingredients).forEach(([name, details]) => {
          if (!excludedIngredients.includes(name)) {
            if (!sum[name]) {
              sum[name] = { amount: 0, unit: details.unit };
            }
            sum[name].amount += details.amount;
          }
        });
      });
      return sum;
    });

    onMounted(async () => {
      try {
        recipes.value = smoothieRecipes;
        loading.value = false;
      } catch (e) {
        error.value = '레시피를 불러오는 데 실패했습니다: ' + e.message;
        loading.value = false;
      }
    });

    return {
      recipes,
      selectedRecipes,
      loading,
      error,
      toggleRecipe,
      ingredientSum,
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

h1, h2 {
  color: #2c3e50;
  text-align: center;
}

.ingredient-sum {
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 20px;
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

.recipe-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

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