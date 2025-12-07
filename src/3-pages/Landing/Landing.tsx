import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
// import bg1 from '../../7-shared/assets/images/bg1.jpg';
import Banner from './Banner';
import SportGroups from './SportGroups';

const Landing = () => {
  return (
    <>
      <Banner />
      <div className="container mx-auto max-w-[1400px] px-4 mt-[50px] mb-[50px]">
        {/* Информация о тренере и школе */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-3xl mb-2">тренеры</h2>
            <p>Кярова Анастасия Юрьевна</p>
          </div>
          <div>
            <h2 className="text-3xl mb-2">спортшкола</h2>
            <p>СШОР "Балтийский берег" <a
                href="https://balticbereg.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block ml-1 text-indigo-700 hover:text-orange-500 transition-colors"
                aria-label="Перейти на сайт СШОР «Балтийский берег»"
              >
              <FontAwesomeIcon icon={faSquareArrowUpRight} />
              </a>
            </p>
            <p>Санкт-Петербург, ул. Черняховского д.49 А</p>
          </div>
        </div>

        {/* Блок с группами */}
        <h2 className="text-3xl mb-2 mt-[50px]">группы</h2>
        <SportGroups />
      </div>
      {/* <div
        className="w-full h-screen bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url("${bg1}")`
        }}
        aria-hidden="true"
      >
      </div> */}
    </>
  )
}
  
export default Landing