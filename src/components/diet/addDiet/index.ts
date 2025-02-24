// 添加食物时间
export const timeButtons = [
  { label: '早餐', key: 'breakfast' },
  { label: '午餐', key: 'lunch' },
  { label: '晚餐', key: 'dinner' },
  { label: '加餐', key: 'snack' },
];

// 选择食物份量相关

// 定义初始状态
export interface NutritionState {
  carbs: number;
  protein: number;
  fat: number;
}
export type NutritionAction = {
  type: 'UPDATE_NUTRITION';
  payload: {
    servingSize: number;
    baseNutrition: {
      carbsPercent: number;
      proteinPercent: number;
      fatPercent: number;
    };
  };
};

// reducer初始值
export const initialState: NutritionState = {
  carbs: 0,
  protein: 0,
  fat: 0,
};

// reducer
export const nutritionReducer = (state: NutritionState, action: NutritionAction): NutritionState => {
  switch (action.type) {
    case 'UPDATE_NUTRITION':
      const { servingSize, baseNutrition } = action.payload;
      return {
        carbs: (baseNutrition.carbsPercent * servingSize) / 100,
        protein: (baseNutrition.proteinPercent * servingSize) / 100,
        fat: (baseNutrition.fatPercent * servingSize) / 100,
      };
    default:
      return state;
  }
};
