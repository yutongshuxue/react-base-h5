import React,{Fragment} from 'react';
import Icon from '../Icon'
import { useHistory } from 'react-router-dom';
import Styles from './index.module.scss'

function Goback({title,extra,children,titleStyle,...rest}){
  const history = useHistory()

  function goback(){
    history.go(-1)
  }

  return(
    <div className={Styles.goback}>
      <div className={Styles.left_icon} onClick={goback}>
        <Icon type='icon-arrow_lift'/>
      </div>
      <div className={Styles.middle_title} style={titleStyle}>{title}</div>
      <ShowWhat extra={extra} children={children} {...rest}></ShowWhat>
    </div>
  )
}

function ShowWhat({extra,children,...rest}){
  return(
    <Fragment>
      {
        children?<div className={Styles.right_extra} {...rest}>{children}</div>:extra?<div className={Styles.right_extra} {...rest}>{extra}</div>:''
      }
    </Fragment>
  )
}

export default Goback