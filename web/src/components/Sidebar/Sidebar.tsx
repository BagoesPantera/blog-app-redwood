import { useEffect, useState } from 'react'

import { IconButton } from '@mui/material'

import { navigate, routes, useLocation } from "@redwoodjs/router";

const Sidebar = () => {
  const location = useLocation()
  const [selectedUrl, setSelectedUrl] = useState('')

  useEffect(() => {
    setSelectedUrl(location.pathname.split('/')[2])
  }, [location])

  const menu = [
    {
      id: 'create',
      label: 'Create',
      url: routes.createBlog(),
      icon: <></>,
    },
    {
      id: 'my-blog',
      label: 'My Blog',
      url: '/my-blog',
      icon: <></>,
    }
  ]
  return (
    <div className="stiky left-0 top-24 mr-4 h-screen w-72 rounded-r-lg bg-red-100">
      <div className="flex flex-col items-start space-y-1">
        {menu.map((item) => (
          <div
            key={item.id}
            className={`w-full rounded-r-lg pl-4 `}
          >
            <IconButton
              className=" m-auto flex"
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => navigate(item.url)}
            >
              <p className={` ml-4 mt-1 text-[16px]`}>
                {item.label}
              </p>
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
