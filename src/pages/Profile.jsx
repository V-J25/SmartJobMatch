import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import { AuthContext } from '../context/authContextValue'

const skillOptions = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Tailwind CSS',
  'Testing',
  'REST API',
]

function Profile() {
  const { user, login, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [selectedSkills, setSelectedSkills] = useState(user?.skills || [])

  const toggleSkill = (skill) => {
    setSelectedSkills((currentSkills) =>
      currentSkills.includes(skill)
        ? currentSkills.filter((item) => item !== skill)
        : [...currentSkills, skill],
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login({ name: name.trim() || 'Student', skills: selectedSkills })
  }

  const handleLogout = () => {
    logout()
    setName('')
    setSelectedSkills([])
    navigate('/login', { replace: true })
  }

  return (
    <div>
      <Navbar />
      <main className='mx-auto max-w-3xl px-4 py-8'>
        <h1 className='text-3xl font-black'>User Profile</h1>
        <form onSubmit={handleSubmit} className='mt-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm'>
          <label className='text-sm font-semibold' htmlFor='name'>Name</label>
          <input
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            className='mt-2 w-full rounded-md border border-slate-300 px-3 py-2'
          />
          <p className='mt-5 text-sm font-semibold'>Skills</p>
          <div className='mt-3 flex flex-wrap gap-2'>
            {skillOptions.map((skill) => (
              <button
                type='button'
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`rounded-md px-3 py-2 text-sm font-semibold ${
                  selectedSkills.includes(skill)
                    ? 'bg-slate-950 text-white'
                    : 'border border-slate-300'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          <div className='mt-6 flex gap-3'>
            <button type='submit' className='rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white'>
              Save Profile
            </button>
            <button type='button' onClick={handleLogout} className='rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold'>
              Logout
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Profile
