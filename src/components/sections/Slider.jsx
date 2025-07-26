import React from 'react'
import '../../styles/home.css';
import SlickSlider  from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/Slider Images/img1.jpg'
import img2 from '../../assets/Slider Images/img2.jpg'
import img3 from '../../assets/Slider Images/img3.jpg'
import img4 from '../../assets/Slider Images/img4.jpg'
import img5 from '../../assets/Slider Images/img5.jpg'
import img6 from '../../assets/Slider Images/img6.jpg'
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Slider() {




    const images = [img1, img2, img3, img4, img5, img6]

    const PrevArrow = ({onClick}) => (
        <div className='custom-arrow prev-arrow' onClick={onClick}>
            <SlArrowLeft />
        </div>
    )

    const NextArrow = ({onClick}) => (
        <div className='custom-arrow next-arrow' onClick={onClick}>
            <SlArrowRight  className='test'/>
        </div>
    )


    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

  return (
    <section>
        <SlickSlider {...settings}>
            {images.map((img, index) => (
                <div key={index} className='slider-img'>
                    <img src={img} className='w-' alt="slider Image" />
                </div>
            ))}
        </SlickSlider>
    </section>
  )
}
