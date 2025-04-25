import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './common/navbar'
import Footer from './common/footer'

export default function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  )
}