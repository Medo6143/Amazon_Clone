import React, { useEffect, useState } from 'react'
import categoryImg from '../../assets/category-img.png'
import { getCategoriesApi, getcategoryProducts } from '../../services/category';
import ClothesSlider from '../sections/ClothesSlider';
import useCategoryProducts from '../../hooks/useCategoryProducts';

export default function CategoryCard() {
  const { categoryData, loading } = useCategoryProducts();

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
                        <div className='d-flex flex-column'>
                            <img src={category.products[0]?.image} alt={category.products[0]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        <div className='d-flex flex-column'>
                            <img src={category.products[1]?.image} alt={category.products[1]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        </div>

                        <div className='category-img-content d-flex justify-content-between mt-2'>
                        <div className="d-flex flex-column">
                            <img src={category.products[2]?.image} alt={category.products[2]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        <div className="d-flex flex-column">
                            <img src={category.products[3]?.image} alt={category.products[3]?.title} />
                            <span className="product-title">
                                {category.products[0]?.title}
                            </span>
                        </div>
                        </div>
                    </div>

                    <a className='mt-auto d-block mb-2 text-decoration-none pt-4' href="#">Explore all</a>
                </div>
            </div>
                ))}
            </div>
        </div>
    </> 
  )
}