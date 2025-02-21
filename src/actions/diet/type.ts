export interface Foods {
  id: string;
  imgUrl: string;
  title: string;
  calories: number;
  unit: string;
  carbs: number;
  protein: number;
  fat: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodListItem {
  category: string;
  categoryName: string;
  foods: Foods[];
}
