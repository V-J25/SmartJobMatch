import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { AuthContext } from '../context/authContextValue'

function Login() {
  const [name, setName] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!name.trim()) {
      return
    }

    login({ name: name.trim() })
    navigate('/dashboard')
  }

  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-md px-4 py-12'>
        <div className='rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
          <h1 className='text-3xl font-black'>Login</h1>
          <input
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='mt-5 w-full rounded-md border border-slate-300 px-3 py-2'
          />
          <button
            type='button'
            onClick={handleLogin}
            disabled={!name.trim()}
            className='mt-4 w-full rounded-md bg-slate-950 px-4 py-2 font-semibold text-white disabled:bg-slate-400'
          >
            Login
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login
