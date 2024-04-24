import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/UsersList'
import { ROLES } from './config/roles'
import PersistLogin from './features/auth/PersistLogin'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />


        {/* protected routes */}
        <Route element={<PersistLogin />}>

        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
          <Route path="welcome" element={<Welcome />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="userslist" element={<UsersList />} />
        </Route>


        </Route>


      </Route>
    </Routes>
  )
}

export default App;
