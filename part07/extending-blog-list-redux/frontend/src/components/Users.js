import { Link } from 'react-router-dom'

function Users({ users }) {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.name}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>

                <td>{user.blogs.length} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users
