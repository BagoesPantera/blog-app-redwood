import Sidebar from 'src/components/Sidebar/Sidebar'

type UserLayoutProps = {
  children?: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
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
