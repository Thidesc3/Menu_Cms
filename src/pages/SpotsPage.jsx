import CrudPage,{Active,activeField,nameField,validatedName} from '../components/CrudPage'
import {spots} from '../services/api'
const initial={name:'',active:true}
export default function SpotsPage(){return <CrudPage title="Mesas" service={spots} queryKey="spots" invalidates={['guestChecks','orders']} fields={[nameField,activeField]} columns={[{label:'Mesa',render:r=>r.name},{label:'Situação',render:r=><Active value={r.active}/>}]} initial={initial} fromRow={r=>({name:r.name,active:r.active})} toPayload={v=>({name:validatedName(v.name),active:v.active})}/>}
