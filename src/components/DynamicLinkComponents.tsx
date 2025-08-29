import type { Category } from "@/hooks/useCategories";

interface DynamicLinkComponentsProps {
    categories: Category[];
    onCategoryClick: (categoryName: string) => void;
}

export const DynamicLinkComponents = ({ categories, onCategoryClick }: DynamicLinkComponentsProps) => {
    
    return (
        <>
            {/* Dynamic links for XL screens (showing first 5) */}
            <div className="hidden xl:flex items-center gap-6">
                {categories.slice(0, 5).map(category => (
                    <button 
                        key={category.id} 
                        onClick={() => onCategoryClick(category.name)} 
                        className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm"
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Dynamic links for LG screens, but not XL (showing first 4) */}
            <div className="hidden lg:flex xl:hidden items-center gap-4">
                {categories.slice(0, 4).map(category => (
                    <button 
                        key={category.id} 
                        onClick={() => onCategoryClick(category.name)} 
                        className="hover:text-primary/80 transition-colors whitespace-nowrap text-sm"
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </>
    )
}
