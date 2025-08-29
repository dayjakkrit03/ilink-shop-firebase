
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories"; // Import the new hook

// Using a single placeholder image for all categories for now
import placeholderImg from "@/assets/category-lan-utp.jpg";

export const CategoryGrid = () => {
  const navigate = useNavigate();
  // Use the custom hook to get categories, loading state, and error state
  const { categories, loading, error } = useCategories();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  if (loading) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">หมวดหมู่สินค้า</h2>
          <p className="text-lg text-muted-foreground">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">หมวดหมู่สินค้า</h2>
          <p className="text-lg text-destructive">Error loading categories: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">หมวดหมู่สินค้า</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            เลือกซื้ออุปกรณ์เครือข่ายคุณภาพสูงจากหมวดหมู่ที่หลากหลาย
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.id} // Use the unique id from the database as the key
              onClick={() => handleCategoryClick(category.name)}
              className="flex flex-col items-center p-6 rounded-xl bg-card hover:bg-gradient-card shadow-soft hover:shadow-card-hover transition-all duration-300 cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <img
                  src={placeholderImg} // Use the same placeholder for all
                  alt={category.name}
                  className="w-16 h-16 object-cover rounded-2xl shadow-soft"
                />
              </div>
              <span className="text-sm font-medium text-center group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
