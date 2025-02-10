import foodData from './food_data.json';
import { db } from '@/server/db';

async function main() {
  try {
    // 批量创建记录
    const result = await db.foodList.createMany({
      data: foodData,
      skipDuplicates: true, // 如果有重复记录则跳过
    });

    console.log(`Successfully imported ${result.count} food items`);
  } catch (error) {
    console.error('Error importing food data:', error);
  }
}

main();
