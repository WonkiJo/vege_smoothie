<template>
    <div v-if="selectedRecipes.length > 0" class="ingredient-sum">
      <h2>선택된 레시피의 총 재료 (물, 알룰로스, 레몬즙 제외):</h2>
      <ul>
        <li v-for="(amount, name) in ingredientSum" :key="name">
          {{ name }}: {{ amount.amount }}{{ amount.unit }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { defineComponent, computed } from 'vue';
  
  export default defineComponent({
    name: 'IngredientSum',
    props: {
      selectedRecipes: Array
    },
    setup(props) {
      const excludedIngredients = ['물', '알룰로스', '레몬즙'];
  
      const ingredientSum = computed(() => {
        const sum = {};
        props.selectedRecipes.forEach(recipe => {
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
  
      return { ingredientSum };
    }
  });
  </script>
  
  <style scoped>
  .ingredient-sum {
    background-color: #e6f7ff;
    border: 1px solid #91d5ff;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
  }
  </style>