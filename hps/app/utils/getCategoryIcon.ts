import icons from '@/constants/categoryIcons';

export type CategoryKey =
  | 'hair'
  | 'cafe'
  | 'fitness'
  | 'store'
  | 'etc'
  | 'pub'
  | 'restaurant'
  | 'shopping'
  | 'transportation';

/**
 * 소비 카테고리 값에 맞는 아이콘을 반환
 * @param category trans_category (소비 카테고리)
 * @returns 해당 카테고리의 아이콘 (기본: etc)
 */
export function getCategoryIcon(category: string): string {
  if (category in icons) {
    return icons[category as keyof typeof icons];
  }

  // 카테고리가 정의되지 않은 경우 etc 아이콘 반환
  return icons.etc;
}
