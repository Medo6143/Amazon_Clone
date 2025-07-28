import { useEffect, useState } from 'react';
import { getCategoriesApi, getcategoryProducts } from '../services/category';

export default function useCategoryProducts() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderData, setsliderData] = useState({})

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesRes = await getCategoriesApi();
        const categories = categoriesRes.data;

        let allData = [];
        let sliderImages = [];

        for (let i = 0; i < categories.length; i++) {
          const cat = categories[i];
          const productsRes = await getcategoryProducts(cat);
          allData.push({
            category: cat,
            products: productsRes.data,
          });

          if (i > 0) {
            productsRes.data.forEach((prod) => {
              sliderImages.push({ image: prod.image }); 
            });
          }
        }

        setCategoryData(allData);
        console.log(allData);
        setsliderData(sliderImages);

      } catch (error) { 
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categoryData, loading, sliderData };
}
