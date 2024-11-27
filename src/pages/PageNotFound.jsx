import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";


const PageNotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <section class="flex min-h-screen justify-center items-center">
        <div class="">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
               
               

              

                <div class="lexend-font text-semibold">
                  <p>{t('pagenotfound.title1')}</p>
                  <p>{t('pagenotfound.title2')}</p><br/>

                  <p>{t('pagenotfound.title3')} - <span className="underline text-red_second cursor-pointer " onClick={()=>{navigate("/");}}>{t('pagenotfound.title4')}</span></p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { PageNotFound };
