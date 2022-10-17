import Icon from "@/components/Icon"
import styles from './index.module.scss'
import Goback from "@/components/Goback"
function Home(){
  return(
    <div>
      <Goback title="商品列表" extra={'...'} titleStyle={{fontWeight:'bold'}}></Goback>
    </div>
    
  )
}

export default Home