import React from 'react';
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sock from '../../assets/sock.png';
import useCategoryProducts from '../../hooks/useCategoryProducts';
import { useNavigate } from 'react-router-dom';

export default function AutoSlider({ title }) {
    const { sliderData, loading } = useCategoryProducts();
    const navigate = useNavigate();
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 992,
                settings: { slidesToShow: 3, slidesToScroll: 1 }
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1, slidesToScroll: 1 }
            }
        ]
    };

    if (loading) return <p>Loading slider...</p>;

    return (
        <section className='mt-4 pb-4'>
            <div className="priv-container">
                <div className="clothes-slider-content bg-white p-3">
                    <p>{title}</p>
                    <SlickSlider {...settings}>
                        {sliderData.map((img, index) => (
                            <div key={index} >
                                <img
                                    src={img.image}
                                    className='me-4'
                                    alt={`slider ${index}`}
                                    loading='lazy'
                                    style={{ cursor: 'pointer'}}
                                    onClick={() => navigate(`/product/${img.id}`)}
                                />
                            </div>
                        ))}
                    </SlickSlider>
                </div>
            </div>
        </section>
    )
}
