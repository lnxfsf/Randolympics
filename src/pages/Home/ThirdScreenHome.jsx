import "../../styles/home.scoped.scss";

import {useTranslation} from "react-i18next";


const ThirdScreenHome = () => {

  const { t } = useTranslation();


  return (
    <>
      <div className="flex bg-[#F8F8F8] min-h-screen flex-col md:flex-row">
      
        <div className="md:basis-1/2 xl:basis-1/3  justify-center items-center lg:block 2xl:m-16  container_beliefs min-h-screen">
          <img src="/home/beliefs.jpg" className="image_beliefs rounded-xl" />
        </div>

        <div className="flex p-8  grow flex-col justify-center items-start text-black_second lexend-font  ">
          <p className="text-3xl md:text-4xl font-bold mb-2">{t('home.ourBeliefs.title1')}</p>

          <p className="font-medium text-lg md:text-xl mb-4 xl:w-[44em]">{t('home.ourBeliefs.content1')}</p>

          <div>
            <div className="flex gap-2 items-center mb-2">
              <img src="/home/earth.svg" />
              <p className="text-xl  font-bold ">
              {t('home.ourBeliefs.subtitle1')}
              </p>
            </div>

            <p className="font-medium mb-4 xl:w-[44em]">
            {t('home.ourBeliefs.content2')}
             
            </p>
          </div>

          <div>
            <div className="flex gap-2 items-center mb-2">
              <img src="/home/trust.svg" />
              <p className="text-xl  font-bold ">{t('home.ourBeliefs.subtitle2')}</p>
            </div>

            <p className="font-medium mb-4 xl:w-[44em]">{t('home.ourBeliefs.content3')}
              
            </p>
          </div>

          <div>
            <div className="flex gap-2 items-center mb-2">
              <img src="/home/morale.svg" />
              <p className="text-xl  font-bold ">{t('home.ourBeliefs.subtitle3')}</p>
            </div>

            <p className="font-medium mb-4 xl:w-[44em]"  dangerouslySetInnerHTML={{ __html: t('home.ourBeliefs.content4') }} />
              
          
          
          </div>
        </div>
      </div>
    </>
  );
};

export { ThirdScreenHome };
