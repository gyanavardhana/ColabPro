import React, { useState } from 'react';
import { MessageSquare, Star, Send, ThumbsUp, Filter } from 'lucide-react';

const DiscussionForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <MessageSquare className="mr-2" />
        Start a New Discussion
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Discussion Title"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
      >
        <Send className="mr-2" size={18} />
        Post Discussion
      </button>
    </form>
  );
};

const DiscussionPost = ({ post, onStar, onReply, onLike }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(post.id, replyContent);
      setReplyContent('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onStar(post.id, !post.starred)}
            className={`flex items-center ${post.starred ? 'text-yellow-500' : 'text-gray-500'}`}
          >
            <Star className="mr-1" size={18} />
            {post.starred ? 'Starred' : 'Star'}
          </button>
          <button
            onClick={() => onLike(post.id)}
            className="flex items-center text-gray-500 hover:text-blue-500"
          >
            <ThumbsUp className="mr-1" size={18} />
            Like ({post.likes || 0})
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(post.id).toLocaleString()}
        </span>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold mb-2">Replies:</h4>
        {post.replies.map((reply, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
            {reply}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Write a reply..."
          className="flex-grow p-2 border border-gray-300 rounded-md mr-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleReply}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
        >
          Reply
        </button>
      </div>
    </div>
  );
};

const DiscussionPage = () => {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'starred', 'popular'

  const addPost = (post) => {
    setPosts([{ id: Date.now(), ...post, replies: [], likes: 0, starred: false }, ...posts]);
  };

  const handleStar = (postId, isStarred) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, starred: isStarred } : post));
  };

  const handleReply = (postId, replyContent) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, replies: [...post.replies, replyContent] } : post));
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post));
  };

  const filteredPosts = () => {
    switch (filter) {
      case 'starred':
        return posts.filter(post => post.starred);
      case 'popular':
        return [...posts].sort((a, b) => (b.likes || 0) - (a.likes || 0));
      default:
        return posts;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Community Discussions</h1>
      <DiscussionForm onSubmit={addPost} />
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Recent Discussions</h2>
        <div className="flex items-center">
          <Filter className="mr-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Posts</option>
            <option value="starred">Starred</option>
            <option value="popular">Popular</option>
          </select>
        </div>
      </div>
      <div>
        {filteredPosts().map((post) => (
          <DiscussionPost
            key={post.id}
            post={post}
            onStar={handleStar}
            onReply={handleReply}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default DiscussionPage;