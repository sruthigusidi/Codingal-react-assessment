import React from 'react';
import '../assets/styles/SkeletonList.css';

const SkeletonList: React.FC = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, idx) => (
        <div key={idx} className="skeleton-post">
          <div className="skeleton-title"></div>
          <div className="skeleton-body"></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonList;
