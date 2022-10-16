import Icon from "@/components/Icon"
import styles from './index.module.scss'
function Home(){
  return(
    <div>
      <div className="home">home pagesDSFWE</div>
        <Icon type='icon-anquanchaxun' style={{fontSize:100}} onClick={()=>alert('hahah')}/>

        <div className={styles.test_border}></div>
    </div>
    
  )
}

export default Home