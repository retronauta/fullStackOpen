function User({ userInfo }) {
  if (!userInfo) {
    return <em>No user found</em>
  }

  return (
    <div>
      <h2>{userInfo.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userInfo.blogs.map(blog => (
          <li key={blog.title}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
