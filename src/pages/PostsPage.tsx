import React, { useState, useEffect, useCallback } from 'react';
import SkeletonList from '../components/SkeletonList';
import Loader from '../components/Loader';
import '../assets/styles/PostPage.css';
import "@fontsource/inter/400";
import "@fontsource/poppins/700";


interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const TOTAL_POSTS = 200;

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // Fetch function
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: Post[] = await response.json();
      // Append new posts
      setPosts((prev) => [...prev, ...data]);

      const totalLoaded = page * 10;
      if (totalLoaded >= TOTAL_POSTS) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (hasMore) {
      fetchPosts();
    }
  }, [page, hasMore, fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const threshold = document.documentElement.offsetHeight - 50;

      if (scrollPosition >= threshold) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Error state
  if (error) {
    return <div style={{ padding: '1rem' }}>Error: {error}</div>;
  }

  return (
    <div className = "posts-page-container">
      <h2 style={{ marginBottom: "1rem", marginLeft: "0.5rem" }}>Posts</h2>

      {loading && page === 1 ? (
        <SkeletonList />
      ) : (
        <>
            {posts.map((post) => (
              <div key={post.id} className = "post-card">
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>{post.title}</h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>{post.body}</p>
              </div>
            ))}

          {loading && page > 1 && <Loader />}
        </>
      )}

      {!hasMore && !loading && (
        <div style={{ marginTop: "1rem", fontStyle: "italic", paddingBottom: "1.5rem", position: "relative", display: "flex", justifyContent: "center", }}>
          No more posts to load.
        </div>
      )}
    </div>
  );
};

export default PostsPage;
