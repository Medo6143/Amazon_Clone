import { useProducts } from '../hooks/useProducts'
import { useParams, useNavigate } from 'react-router-dom'
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";
import { Button, Card, Row, Col } from 'react-bootstrap'
import { useCart } from '../hooks/useproductCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'
import '../styles/productDetails.css'
import { IoLocationOutline } from "react-icons/io5"
import Circle from '../components/ui/Circle'
import img1 from '../assets/image 620.png'
import img2 from '../assets/image 621.png'
import img3 from '../assets/image 622.png'

function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { products } = useProducts()
    const { addItemToCart } = useCart()

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
        navigate('/checkout')
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
                            <img src={product.image} alt={product.title} className='img1' />
                            <img src={product.image} alt={product.title} className='img2' />
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
                            <p className='d-flex justify-content-start text-dark'>SAR <span className='fs-2'>{product.price}</span></p>
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
                            <Button variant='transparent' className="w-100 mt-2 border">
                                Add to List
                            </Button>
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
                        <Row>
                            {relatedProducts.map((relatedProduct, index) => (
                                <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4" onClick={() => navigate(`/product/${relatedProduct.id}`)}>
                                    <Card className="h-100">
                                        <Card.Img
                                            variant="top"
                                            src={relatedProduct.image}
                                            style={{ height: '200px', objectFit: 'contain' }}
                                        />
                                        <Card.Body>
                                            <Card.Title className="text-truncate">
                                                {relatedProduct.title}
                                            </Card.Title>
                                            <div className="d-flex align-items-center mb-2">
                                                {renderRating(relatedProduct.rating.rate)}
                                                <span className="ms-2">{relatedProduct.rating.rate}</span>
                                            </div>
                                            <Card.Text className="fw-bold">
                                                SAR {relatedProduct.price}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="bg-white">
                                            <Button
                                                variant="warning"
                                                className="w-100"
                                                onClick={() => addItemToCart(relatedProduct)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Card.Footer>
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
