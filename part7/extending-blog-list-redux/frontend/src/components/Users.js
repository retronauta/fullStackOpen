import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

function Users() {
  const dispatch = useDispatch()

  const users = useSelector(({ users }) => {
    return users
  })

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  // console.log(users)
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
                <td>{user.name} </td>
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
