
import Form from './Form'
import Footer from './Footer';
import { EditProvider } from '../context/Contexts';


const Home = () => {

  return (
    <>
      <div className='flex justify-center items-center w-full h-40 sticky bg-gray-900 '>
        <div className=" text-white font-chillax text-3xl">
          bookmarks
        </div>
      </div>
      <EditProvider>
        <Form />
        <Footer />
      </EditProvider>

    </>
  )
}

export default Home