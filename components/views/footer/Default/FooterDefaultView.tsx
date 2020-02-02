import { h, Fragment as F } from 'preact'
import { useTranslation } from 'react-i18next'
import { AVContainer, AVLink } from '~/components/controls'
import { FooterLinks as FL } from '~/core/libs/constants'
import './_footer-default.scss'


export const FooterDefaultView = () => {

  const { t } = useTranslation('root')

  return (
    <div class="av-view-footer-default">
      <AVContainer sizingType="bootstrap">
        <div class="footer-content">
          <div class="section">
            <h4>{t('footer.about').toUpperCase()}</h4>
            {/* <AVLink link={FL.ABOUT}>{t('footer.about_us')}</AVLink> */}
            <AVLink link={FL.PRESS} target="_blank">{t('footer.about_press')}</AVLink>
            <AVLink link={FL.STATS} target="_blank">{t('footer.about_stats')}</AVLink>
            <AVLink link={FL.JOBS} target="_blank">{t('footer.about_jobs')}</AVLink>
          </div>
          <div class="section">
            <h4>{t('footer.services').toUpperCase()}</h4>
            <AVLink link={FL.HAVE_QUESTIONS} target="_blank" >{t('footer.services_haveQuestions')}</AVLink>
            <AVLink link={FL.TERMS_OF_SVC}>{t('footer.services_termsOfServices')}</AVLink>
            <AVLink link={FL.PRIVACY_POLICY}>{t('footer.services_privacyPolicy')}</AVLink>
            <AVLink link={FL.USER_GUIDE} disabled={true} target="_blank">{t('footer.services_userGuide')}</AVLink>
          </div>
          <div class="section">
            <h4>{t('footer.more').toUpperCase()}</h4>
            <AVLink link={FL.MORE_DAFTARAMBASSADOR} target="_blank">Daftar Campus Ambassador</AVLink>
            <AVLink link={FL.BLOG} target="_blank">{t('footer.more_ourBlog')}</AVLink>
            <AVLink link={FL.RESEARCH} disabled={true}>{t('footer.more_rnd')}</AVLink>
          </div>
          <div>
            <p>
              {t('footer.definition')}
            </p>
          </div>
        </div>
        <div class="footer-copytext">
          <div class='div-copyright-text'>
            {t('footer.copyright')}
          </div>
          <div class='div-lang-selector'>
            {/* <AVLink link="/en">ENGLISH</AVLink>
            <AVLink link="/id">INDONESIA</AVLink> */}
          </div>
        </div>
      </AVContainer>
    </div>
  )
}