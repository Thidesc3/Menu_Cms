import CrudPage,{Active,activeField,nameField,validatedName} from '../components/CrudPage'
import {categories} from '../services/api'
const initial={name:'',icon:'',displayOrder:0,active:true}
const fields=[nameField,{name:'icon',label:'URL do ícone',type:'url'},{name:'displayOrder',label:'Ordem de exibição',type:'number',min:0,step:1,required:true},activeField]
const columns=[{label:'Ícone',render:r=>r.icon?<img src={r.icon} alt="" className="size-10 rounded object-contain"/>:'—'},{label:'Nome',render:r=>r.name},{label:'Ordem',render:r=>r.displayOrder},{label:'Situação',render:r=><Active value={r.active}/>}]
export default function CategoriesPage(){return <CrudPage title="Categorias" service={categories} queryKey="categories" invalidates={['products']} fields={fields} columns={columns} initial={initial} fromRow={r=>({...initial,...r,icon:r.icon??''})} toPayload={v=>({name:validatedName(v.name),icon:v.icon.trim()||null,displayOrder:Number(v.displayOrder),active:v.active})}/>}
