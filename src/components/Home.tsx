import Form from './Form'
import Footer from './Footer';
import { EditProvider } from '../context/Contexts';

const Home = () => {

  return (
    <>
      <div className='flex justify-center items-center w-full h-48 sticky bg-gray-900 lg:bg-banner bg-cover'>
        <div className="flex text-neutral font-chillax text-4xl z-30">
          bookmarks
        </div>
      </div>
      <div className="bg-neutral">
      <EditProvider>
        <Form />
        <Footer />
      </EditProvider>
      </div>


    </>
  )
}

export default Home