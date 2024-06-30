import { navigate } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Sidebar from 'src/components/Sidebar/Sidebar'

type UserLayoutProps = {
  children?: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { loading, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    // Jika pengguna belum terautentikasi, arahkan mereka ke halaman login admin
    navigate('/login')
    return null // Tidak perlu menampilkan layout jika tidak terautentikasi
  }
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="">{children}</div>
      </div>
    </>
  )
}

export default UserLayout
