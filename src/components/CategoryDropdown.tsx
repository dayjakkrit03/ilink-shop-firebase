import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { Category } from "@/hooks/useCategories";

interface CategoryDropdownProps {
    loading: boolean;
    error: string | null;
    categories: Category[];
    onCategoryClick: (categoryName: string) => void;
}

export const CategoryDropdown = ({ loading, error, categories, onCategoryClick }: CategoryDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 shrink-0">
                    <Menu className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">หมวดหมู่สินค้า</span>
                    <span className="sm:hidden text-xs">หมวดหมู่</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white shadow-lg border border-primary/10 z-50">
                {loading && <DropdownMenuItem disabled>Loading...</DropdownMenuItem>}
                {error && <DropdownMenuItem disabled className="text-destructive">Error loading</DropdownMenuItem>}
                {!loading && !error && categories.map(category => (
                    <DropdownMenuItem 
                        key={category.id} 
                        className="text-primary hover:bg-primary/10 cursor-pointer"
                        onClick={() => onCategoryClick(category.name)}
                    >
                        {category.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
