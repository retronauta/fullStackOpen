import React from 'react';

const NewPostForm = ({
  title,
  url,
  createPost,
  setTitle,
  setUrl,
  author,
  setAuthor,
}) => {
  return (
    <form onSubmit={createPost}>
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
  );
};

export default NewPostForm;
