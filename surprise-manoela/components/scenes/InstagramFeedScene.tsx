'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SceneWrapperProps, Post } from '@/types';
import { getInstagramPosts } from '@/actions/scene-actions';

interface InstagramContent {
  title: string;
  subtitle: string;
}

export function InstagramFeedScene({ scene, onNext }: SceneWrapperProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [visiblePosts, setVisiblePosts] = useState(0);
  
  const content = scene.content as InstagramContent;

  useEffect(() => {
    const loadPosts = async () => {
      const result = await getInstagramPosts();
      if (result.success && result.data) {
        setPosts(result.data);
        // Animate posts appearing
        result.data.forEach((_, index) => {
          setTimeout(() => {
            setVisiblePosts(prev => prev + 1);
          }, index * 200);
        });
      }
      setLoading(false);
    };

    loadPosts();
  }, []);

  const handlePostClick = (postId: number) => {
    setSelectedPost(selectedPost === postId ? null : postId);
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="text-white text-xl animate-pulse">Carregando memórias...</div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full bg-black overflow-y-auto scrollbar-hide"
      data-theme={scene.theme}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md px-4 py-4">
        <h2 className="text-white text-2xl font-bold text-center">📸 {content.title}</h2>
        <p className="text-white/60 text-center text-sm mt-1">{content.subtitle}</p>
      </div>

      {/* Instagram Feed */}
      <div className="max-w-md mx-auto pb-20">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`
              bg-gray-900 rounded-xl overflow-hidden mb-4 mx-4
              transition-all duration-500 ease-out
              ${index < visiblePosts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              ${selectedPost === post.id ? 'ring-2 ring-pink-500' : ''}
            `}
            onClick={() => handlePostClick(post.id)}
          >
            {/* Post Image */}
            <div className="relative aspect-square bg-gray-800">
              <Image
                src={post.image}
                alt={post.description}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to default image
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-${[
                    '1518199266791-5375a83190b7',
                    '1522673607200-164d1b6ce486',
                    '1494790108377-be9c29b29330',
                    '1474552226712-ac0f0961a954'
                  ][index]}?auto=format&fit=crop&w=600&q=80`;
                }}
              />
            </div>

            {/* Post Actions */}
            <div className="px-4 py-3">
              <div className="flex items-center gap-4 mb-2">
                <button className="text-white hover:text-pink-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
                <button className="text-white hover:text-blue-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <button className="text-white hover:text-green-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Likes */}
              <p className="text-white text-sm font-semibold mb-1">
                {post.likes.toLocaleString()} curtidas
              </p>

              {/* Description */}
              <p className="text-white/80 text-sm">
                <span className="font-semibold text-white">manoela_mariani</span>{' '}
                {post.description}
              </p>

              {/* Comments preview */}
              {post.comments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {post.comments.slice(0, 2).map((comment, idx) => (
                    <p key={idx} className="text-white/60 text-xs">
                      <span className="font-semibold text-white/80">usuario_{idx + 1}</span>{' '}
                      {comment}
                    </p>
                  ))}
                  {post.comments.length > 2 && (
                    <p className="text-white/40 text-xs">
                      Ver mais {post.comments.length - 2} comentários
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
        <button
          onClick={onNext}
          className="w-full max-w-md mx-auto block py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Continuar Jornada ✨
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
