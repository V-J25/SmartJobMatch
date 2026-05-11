import useLocalStorage from '../hooks/useLocalStorage'
import { AuthContext } from './authContextValue'

const createUserId = (name) => name.trim().toLowerCase().replace(/\s+/g, '-')

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('smart-job-user', null)
  const [users, setUsers] = useLocalStorage('smart-job-users', {})

  const login = (userData) => {
    const userId = createUserId(userData.name)
    const existingUser = users[userId]
    const nextUser = {
      id: userId,
      name: userData.name.trim(),
      skills: userData.skills ?? existingUser?.skills ?? [],
    }

    setUsers((currentUsers) => ({ ...currentUsers, [userId]: nextUser }))
    setUser(nextUser)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
