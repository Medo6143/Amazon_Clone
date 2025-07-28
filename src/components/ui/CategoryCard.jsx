import useCategoryProducts from '../../hooks/useCategoryProducts';
import { useNavigate } from 'react-router-dom';

export default function CategoryCard() {
  const { categoryData, loading } = useCategoryProducts();
  const navigate = useNavigate()

  if (loading) return <p>Loading...</p>;



return (
    <>
        <div className="priv-container">
            <div className="row">
                {categoryData.map((category, index) => (
                <div className="col-lg-3 gy-3 d-flex">
                    <div className="category-content bg-white p-2 h-100 d-flex flex-column w-100">
                    <p>{category.category}</p>

                    <div className="d-flex flex-column flex-grow-1">
                        <div className="category-img-content d-flex justify-content-between">
                        <div className='d-flex flex-column' onClick={() => navigate(`/product/${category.products[0]?.id}`)}>
                            <img src={category.products[0]?.image} alt={category.products[0]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        <div className='d-flex flex-column' onClick={() => navigate(`/product/${category.products[1]?.id}`)}>
                            <img src={category.products[1]?.image} alt={category.products[1]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        </div>

                        <div className='category-img-content d-flex justify-content-between mt-2' onClick={() => navigate(`/product/${category.products[2]?.id}`)}>
                        <div className="d-flex flex-column">
                            <img src={category.products[2]?.image} alt={category.products[2]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        <div className="d-flex flex-column" onClick={() => navigate(`/product/${category.products[3]?.id}`)}>
                            <img src={category.products[3]?.image} alt={category.products[3]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        </div>
                    </div>

                    <a className='mt-auto d-block mb-2 text-decoration-none pt-4' onClick={() => navigate(`/category/${category.category}`)}>Explore all</a>
                </div>
            </div>
                ))}
            </div>
        </div>
    </> 
  )
}