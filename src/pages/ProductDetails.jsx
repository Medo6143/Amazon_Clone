import { useProducts } from '../hooks/useProducts'
import { useWishlist } from '../hooks/useWishlist';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { Button, Card, Row, Col, Badge } from 'react-bootstrap'
import { useCart } from '../hooks/useproductCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FaShoppingCart, FaMinus, FaPlus, FaTrashAlt, FaRegHeart, FaHeart } from 'react-icons/fa'
import '../styles/productDetails.css'
import { IoLocationOutline } from "react-icons/io5"
import Circle from '../components/ui/Circle'
import img1 from '../assets/image 620.png'
import img2 from '../assets/image 621.png'
import img3 from '../assets/image 622.png'

function ProductDetails() {

    const {
        addItemToCart,
        decreaseItemQuantity,
        removeItem,
        getQuantity
    } = useCart();
    const { id } = useParams()
    const navigate = useNavigate()
    const { products } = useProducts()

    const { inWishlist, addItem, removeItem: removeWish } = useWishlist();

    const product = products.find((product) => product.id == id)
    const relatedProducts = products.filter((p) =>
        p.category === product?.category && p.id != id
    )

    const renderRating = (rating) => {
        const stars = []
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning fs-5" />)
        }

        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning fs-5" />)
        }

        const emptyStars = 5 - stars.length
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-secondary fs-5" />)
        }

        return stars
    }

    const handleBuyNow = (item) => {
        addItemToCart(item)
        navigate('/cart')
    }

    if (!product) {
        return <div className="text-center py-5">Product not found</div>
    }

    return (
        <section className='details-section'>
            <div key={product.id} className='details-card'>
                <div className='content'>
                    <p>Products <FaAngleRight /> {product.category}</p>
                    <div className='row gap-3'>
                        <div className='col-sm-12 col-lg-5 col-xxl-5 images'>
                            <img src={product.image} loading="lazy" alt={product.title} className='img1' />
                            <img src={product.image} loading="lazy" alt={product.title} className='img2' />
                        </div>

                        <div className='col-sm-12 col-lg-6 col-xxl-4 rigth'>
                            <h3>Brand: WDIRARA</h3>
                            <h2>{product.title}</h2>
                            <div className="row justify-content-between">
                                <h4 className='fs-4 fs-sm-5 col'>{product.rating.rate} {renderRating(product.rating.rate)} <FaAngleDown /></h4>
                                <div className='d-flex gap-2 col'>
                                    <small>{product.rating.count} ratings</small>
                                    <h6> | </h6>
                                    <small>Search this page</small>
                                </div>
                            </div>
                            <div className="line"></div>
                            <p className='d-flex justify-content-start text-dark'>$<span className='fs-2'>{product.price}</span></p>
                            <h4 className='text-black fs-5 fw-normal'>All price include VAT.</h4>
                            <div className='row gap-1 align-items-center text-center'>
                                <p className='col'>Sign in to redeem.</p>
                                <p className='px-1 bg-success text-black col'>Extra 20%</p>
                                <p className='text-black col'>off with meem credit cards.</p>
                            </div>
                            <p className='text-black'>Enter code MEEM20 at checkout. Discount by Amazon.</p>
                            <div className='row gap-3'>
                                <Circle paragraph={'Electronic payment Only'} img={img1} className={'col'} />
                                <Circle paragraph={'30 days Returnable'} img={img2} className={'col'} />
                                <Circle paragraph={'Secure transaction'} img={img3} className={'col'} />
                            </div>
                            <div className="line"></div>
                            <h5>About this item</h5>
                            <ul>
                                <li>{product.description}</li>
                            </ul>
                        </div>

                        <Card className='col-sm-12 col-xxl-2'>
                            <p className='d-flex justify-content-start text-dark'>SAR <span className='fs-2'>{product.price}</span></p>
                            <h6 className='text-black'>SAR96 delivery 6-9 October.</h6>
                            <p style={{ color: '#1F8394' }}>Details</p>
                            <div className='d-flex'>
                                <IoLocationOutline className='text-black fs-2' />
                                <p style={{ color: '#1F8394' }}>
                                    Delivery to Riyadh - Update Location
                                </p>
                            </div>
                            <p className='text-danger fw-bold'>Usually ships within 4 to 5 days</p>
                            <select name="quantity" id="quantity" className='mb-3 p-2 bg-secondary outline-none rounded'>
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                            <Button variant="warning" className="w-100 rounded-5" onClick={() => addItemToCart(product)}>
                                Add to Cart
                            </Button>
                            <Button className="w-100 mt-2 rounded-5" onClick={() => handleBuyNow(product)}>
                                Buy Now
                            </Button>
                            <table className='mt-3'>
                                <tbody>
                                    <tr className='my-2'>
                                        <th className='text-secondary-emphasis'>Ships from</th>
                                        <td className='text-secondary-emphasis'>Monatik LLC</td>
                                    </tr>
                                    <tr className='my-2'>
                                        <th>Sold by</th>
                                        <td style={{ color: '#1F8394' }}>Monatik LLC</td>
                                    </tr>
                                    <tr className='my-2'>
                                        <th>Payment</th>
                                        <td style={{ color: '#1F8394' }}>Secure transaction</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="line"></div>
                        </Card>
                    </div>
                </div>

                <div className="line"></div>

                <div className="reviews-section mb-5">
                    <h3>Customer Reviews</h3>
                    <h4 className='fs-4'>{renderRating(product.rating.rate)} {product.rating.rate} out of 5</h4>
                </div>

                {/* قسم المنتجات المشابهة */}
                {relatedProducts.length > 0 && (
                    <div className="related-products mt-5">
                        <h3 className="mb-4">More from {product.category}</h3>

                        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                            {relatedProducts.map((product) => (
                                <Col key={product.id} className="d-flex">
                                    <Card className="h-100 shadow-sm w-100">
                                        <Link to={`/product/${product.id}`}>
                                            <div
                                                className="bg-light d-flex justify-content-center align-items-center"
                                                style={{ height: '200px', cursor: 'pointer' }}
                                            >
                                                <Card.Img
                                                    variant="top"
                                                    src={product.image}
                                                    loading="lazy"
                                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                                />
                                            </div>
                                        </Link>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title className="mb-2" style={{ fontSize: '1rem' }}>
                                                {product.title.length > 50
                                                    ? `${product.title.substring(0, 50)}...`
                                                    : product.title}
                                            </Card.Title>
                                            <div className="mb-2">
                                                {renderRating(product.rating.rate)}
                                                <small className="text-muted ms-2">({product.rating.count})</small>
                                            </div>
                                            <div className="mt-auto">
                                                <h5 className="text-danger mb-3">${product.price}</h5>

                                                {/* add to wishlist */}
                                                <div className="position-absolute top-0 end-0 p-2">
                                                    {inWishlist(product.id) ? (
                                                        <FaHeart
                                                            size={20}
                                                            color="#e74c3c"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => removeWish(product.id)}
                                                        />
                                                    ) : (
                                                        <FaRegHeart
                                                            size={20}
                                                            color="#555"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => addItem(product)}
                                                        />
                                                    )}
                                                </div>
                                                {/* add button */}
                                                {getQuantity(product.id) === 0 ? (
                                                    <Button
                                                        variant="warning"
                                                        className="w-100"
                                                        onClick={() => addItemToCart(product)}
                                                    >
                                                        <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                                                        Add to Cart
                                                    </Button>
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-between w-100">
                                                        <div
                                                            className="d-flex align-items-center border rounded-pill overflow-hidden"
                                                            style={{ borderColor: '#e0e0e0' }}
                                                        >
                                                            <Button
                                                                variant="light"
                                                                className="px-3 py-2"
                                                                onClick={() => decreaseItemQuantity(product.id)}
                                                            >
                                                                <FaMinus />
                                                            </Button>

                                                            <span className="px-3 py-2 fw-bold text-muted">
                                                                {getQuantity(product.id)}
                                                            </span>

                                                            <Button
                                                                variant="light"
                                                                className="px-3 py-2"
                                                                onClick={() => addItemToCart(product, 1)}
                                                            >
                                                                <FaPlus />
                                                            </Button>
                                                        </div>

                                                        <Button
                                                            variant="link"
                                                            className="text-danger fw-bold text-decoration-none"
                                                            onClick={() => removeItem(product.id)}
                                                        >
                                                            <FaTrashAlt className="me-1" /> Remove
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </Card.Body>
                                        {product.price < 30 && (
                                            <Badge bg="danger" className="position-absolute top-0 start-0 m-2">
                                                Sale
                                            </Badge>
                                        )}
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductDetails
