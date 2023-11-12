import Image from 'next/image'
import { Inter } from 'next/font/google'
import KanbanBoard from './screens/KanbanBoard'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <KanbanBoard />
      <Navbar/>

    </>
  )
}