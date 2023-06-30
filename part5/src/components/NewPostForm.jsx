import React, { useState } from 'react';

const NewPostForm = ({ createPost }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addPost = event => {
    event.preventDefault();
    createPost(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addPost}>
        <label>title: </label>
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <label>author: </label>
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <label>url: </label>
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default NewPostForm;
