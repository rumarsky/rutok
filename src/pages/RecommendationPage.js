import React from 'react';
import Sidebar from '../components/Sidebar';
import VideoFeed from '../components/VideoFeed';
import './RecommendationPage.css';

function RecommendationPage() {
  return (
    <div className="recommendation-page">
      <Sidebar />
      <VideoFeed />
    </div>
  );
}

export default RecommendationPage;