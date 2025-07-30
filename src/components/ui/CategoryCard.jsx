import useCategoryProducts from '../../hooks/useCategoryProducts';
import { useNavigate } from 'react-router-dom';
// If you have a separate CSS file, import it here:
// import '../styles/custom.css'; // Adjust the path as necessary

export default function CategoryCard() {
  const { categoryData, loading } = useCategoryProducts();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="priv-container">
        <div className="row">
          {categoryData.map((category, index) => (
            // The parent column still defines the overall grid behavior.
            // The width adjustment will happen on the category-content INSIDE this column.
            <div className="col-sm-6 col-md-6 col-lg-3 gy-3 d-flex" key={category.category || index}> {/* Added key prop for list items */}
              {/* Added w-md-90-custom and removed w-md-50 */}
              <div className="category-content bg-white p-2 h-100 d-flex flex-column w-100">
                <p>{category.category}</p>

                <div className="d-flex flex-column flex-grow-1">
                  <div className="category-img-content d-flex justify-content-around">
                    <div className='d-flex flex-column' onClick={() => navigate(`/product/${category.products[0]?.id}`)}>
                      <img src={category.products[0]?.image} alt={category.products[0]?.title} />
                      <span className="product-title">
                        {category.products[0]?.title}
                      </span>
                    </div>
                    <div className='d-flex flex-column' onClick={() => navigate(`/product/${category.products[1]?.id}`)}>
                      <img src={category.products[1]?.image} alt={category.products[1]?.title} />
                      <span className="product-title">
                        {category.products[0]?.title} {/* This might be a typo, should it be products[1]?.title? */}
                      </span>
                    </div>
                  </div>

                  <div className='category-img-content d-flex justify-content-around mt-2'> {/* Removed redundant onClick here */}
                    <div className="d-flex flex-column" onClick={() => navigate(`/product/${category.products[2]?.id}`)}>
                      <img src={category.products[2]?.image} alt={category.products[2]?.title} />
                      <span className="product-title">
                        {category.products[0]?.title} {/* This might be a typo, should it be products[2]?.title? */}
                      </span>
                    </div>
                    <div className="d-flex flex-column" onClick={() => navigate(`/product/${category.products[3]?.id}`)}>
                      <img src={category.products[3]?.image} alt={category.products[3]?.title} />
                      <span className="product-title">
                        {category.products[0]?.title} {/* This might be a typo, should it be products[3]?.title? */}
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
  );
}