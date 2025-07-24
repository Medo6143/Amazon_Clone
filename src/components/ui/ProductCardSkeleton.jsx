import React from 'react';

const ProductCardSkeleton = () => (
  <div className="card h-100 shadow-sm">
    <div className="bg-light d-flex justify-content-center align-items-center" style={{ height: '200px', cursor: 'pointer' }}>
      <div className="skeleton-image"></div>
    </div>
    <div className="card-body">
      <div className="skeleton-title"></div>
      <div className="skeleton-rating"></div>
      <div className="skeleton-price"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
);

export default ProductCardSkeleton; 