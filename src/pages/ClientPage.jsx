import { Outlet } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Header from '../components/template-client/Header'
import Footer from '../components/template-client/Footer'


export default function ClientPage() {

  return (
    <MainLayout>
      <Header />
      <div className='bg-dark-subtle'>
        <Outlet />
      </div>
      <Footer />
    </MainLayout>
  )
}

