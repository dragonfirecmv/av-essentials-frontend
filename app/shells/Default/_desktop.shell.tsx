import { h, Fragment as F } from 'preact'
import './_desktop.scss'
import { CommonIconChat } from '~/static/img'
import { MenubarDefaultView } from '~/components/views/menubar/'
import { FooterDefaultView } from '~/components/views/footer/'
import { FooterLinks } from '~/core/libs/constants'


export const DefaultShellDesktop = ({ children }) => {
  return (
    <div class="av-shell-default-desktop" data-theme="light">
      <div class="enclosing-main">

        <div class="enclosure-menubar">
          <MenubarDefaultView/>
        </div>

        <div class="enclosure-content">
          {children}
        </div>

        <div class="enclosure-footer">
          <FooterDefaultView/>
        </div>

      </div>


      <div className="fab-button" onClick={() => window.open(FooterLinks.HAVE_QUESTIONS)}>
        <img src={CommonIconChat}/>
      </div>
    </div>
  )
}