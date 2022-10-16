import classnames from 'classnames'
import Proptypes from 'prop-types'

function Icon({type,className,...rest}){
  return(
    <svg {...rest} className={classnames('icon',className)} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

Icon.propTypes={
  type:Proptypes.string.isRequired
}

export default Icon