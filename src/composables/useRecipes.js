import { ref } from 'vue';
import smoothieRecipes from '../data/smoothie-recipes.json';

export default function useRecipes() {
  const recipes = ref([]);
  const selectedRecipes = ref([]);
  const loading = ref(true);
  const error = ref(null);

  const loadRecipes = async () => {
    try {
      recipes.value = smoothieRecipes;
      loading.value = false;
    } catch (e) {
      error.value = '레시피를 불러오는 데 실패했습니다: ' + e.message;
      loading.value = false;
    }
  };

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

  return {
    recipes,
    selectedRecipes,
    loading,
    error,
    loadRecipes,
    toggleRecipe,
    selectRandomRecipes
  };
}