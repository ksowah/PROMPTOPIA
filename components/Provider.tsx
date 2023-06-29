"use client"

import { SessionProvider } from "next-auth/react"

type props = {
  children: React.ReactNode
  session?: any
}

const Provider = ({children, session}: props) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default Provider