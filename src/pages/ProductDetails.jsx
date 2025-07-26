import { useProducts } from '../hooks/useProducts'
import { useParams } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa6";
import { Button, Card } from 'react-bootstrap';
import { useCart } from '../hooks/useproductCart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProductDetails.css';
import { FaAngleDown } from "react-icons/fa";
import Circle from '../components/ui/Circle';
import img1 from '../assets/image 620.png'
import img2 from '../assets/image 621.png'
import img3 from '../assets/image 622.png'



function ProductDetails() {
    const { id } = useParams()
    const { products } = useProducts()
    const filteredProduct = products.filter((product) => product.id == id)
    console.log(filteredProduct)
    const { addItemToCart } = useCart();

    if (filteredProduct.length === 0) {
        return <div>Product not found</div>
    }
    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning fs-5" />);
        }

        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning fs-5" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-secondary fs-5" />);
        }

        return stars;
    };


    return (
        <section className='details-section'>
            {filteredProduct.map((item) =>
                <div key={item.id} className='details-card'>
                    <div className='content'>
                        <p>products <FaAngleRight />  {item.category}</p>
                        <div className='row gap-3'>
                            <div className='col-sm-12 col-lg-5 col-xxl-5 images'>
                                <img src={item.image} alt={item.title} className='img1' />
                                <img src={item.image} alt={item.title} className='img2' />
                            </div>


                            <div className='col-sm-12 col-lg-6 col-xxl-4 rigth'>
                                <h3>Brand: WDIRARA</h3>
                                <h2>{item.title}</h2>
                                <div className="d-flex justify-content-between">
                                    <h4 className='fs-4'>{item.rating.rate}  {renderRating(item.rating.rate)} <FaAngleDown /></h4>
                                    <div className='d-flex gap-2'>
                                        <small className="">{item.rating.count} ratings</small>
                                        <h6> | </h6>
                                        <small className="">Search this page</small>
                                    </div>
                                </div>
                                <div className="line"></div>
                                <p className='d-flex justify-content-start text-dark'>SAR <span className='fs-2'>{item.price}</span> </p>
                                <h4 className='text-black fs-5 fw-normal'>All price include VAT.</h4>
                                <div className='d-flex gap-1'>
                                    <p>Sign in to redeem.</p>
                                    <p className='px-1 bg-success text-black'>Extra 20%</p>
                                    <p className='text-black'>off  with meem credit cards.</p>
                                </div>
                                <p className='text-black'>Enter code MEEM20 at checkout. Discount by Amazon.</p>
                                <div className='d-flex gap-3'>
                                    <Circle pargraph={'Electronic payment Only'} img={img1} />
                                    <Circle pargraph={'30 days Returnable'} img={img2} />
                                    <Circle pargraph={'Secure transaction'} img={img3} />
                                </div>
                                <div className="line"></div>
                                <h5>About this item</h5>
                                <ul>
                                    <li>{item.description}</li>
                                </ul>
                            </div>

                            <Card className='col-sm-12 col-xxl-2'>
                                <Button variant="warning" className="w-100" onClick={() => addItemToCart(item)}>
                                    <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                                    Add to Cart
                                </Button>

                            </Card>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div>
                        <h3>Customer Reviews</h3>
                        <h4 className='fs-4'>{renderRating(item.rating.rate)} {item.rating.rate} out of 5</h4>
                    </div>
                </div>
            )}
        </section>
    )
}

export default ProductDetails