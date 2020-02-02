import { h, Fragment as F } from 'preact'
import { ModalController } from './controllers/Modal/ModalController';
import { ToastController } from './controllers/Toast/ToastController';


export default (props: IProps) => (
  <F>
    { props.children }

    <ModalController/>
    <ToastController/>
  </F>
)

interface IProps {
  children?: any
}