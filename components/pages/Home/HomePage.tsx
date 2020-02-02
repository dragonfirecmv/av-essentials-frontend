//#region Imports
import { h, Fragment as F } from 'preact'
import { useLocation, useHistory } from 'react-router'

import './_home.scss'
import { CommonBackground, CommonMascot1 } from '~/static/img'
import { AVBanner, AVContainer, AVButton } from '~/components/controls'

import { GeneralLinks } from '~/core/libs/constants'
//#endregion


export const HomePage = () => {

  const history = useHistory()

  return (
    <div class="page-home">
      <AVContainer sizingType="TKPDA">
        <div class="enclosure-main">
          {/* <div class="section banner">
            <AVBanner
              loadingMode={false}
              backColor="var(--color-primary)"
              titleText="Lengkapi kebutuhan - kebutuhan eventmu sekarang juga!"
              subText="Adavendor siap membantumu."
              backgroundSrc={CommonBackground} />
          </div> */}

          <div className="section about-us">
            <div className="area-mascot">
              <img src={CommonMascot1} />
            </div>
            <div className="area-message">
              <div className="tx about-header">
                Vendor impianmu, ada di genggaman kamu.
              </div>
              <div className="tx about-par">
                Adavendor adalah platform yang dapat membantumu
                mewujudkan event impian kamu. Bersama kami, kamu
                dapat mencari dan menemukan vendor yang sesuai
                dengan keinginanmu.
              </div>
              <div className="area-action">
                <AVButton size="large" onClick={() => history.push('/browse')}>
                  Temukan vendor >
              </AVButton>
              </div>
            </div>
          </div>

          <div className="section addons">

            <div className="area-join-us">
              <div className="tx joinus-tag">Anda pemilik vendor?</div>
              <div className="tx joinus-header">
                Bergabunglah menjadi partner Adavendor dan rasakan manfaatnya.
              </div>
              <div className="area-action">
                <AVButton
                  btnStyle="secondary"
                  size="large"
                  onClick={() => window.open(GeneralLinks.VENDOR_JOIN_US)}>
                  Bergabung bersama kami
                </AVButton>
              </div>
            </div>

            {/* <div className="area-contact-us">
              <div className="tx joinus-tag">Punya pertanyaan?</div>
              <div className="tx joinus-header">
                
              </div>
              <div className="area-action">
                <AVButton
                  btnStyle="secondary"
                  size="large"
                  onClick={() => window.open(GeneralLinks.VENDOR_JOIN_US)}>
                  Bergabung dengan kami
                </AVButton>
              </div>
            </div> */}

          </div>

        </div>
      </AVContainer>
    </div>
  )
}