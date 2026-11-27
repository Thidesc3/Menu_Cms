import {useState} from 'react'
import {Utensils,Tags,Package,Table2,Receipt,Columns3} from 'lucide-react'
import {Alert,Button} from './components/ui'
import CategoriesPage from './pages/CategoriesPage'
import ProductsPage from './pages/ProductsPage'
import SpotsPage from './pages/SpotsPage'
import GuestChecksPage from './pages/GuestChecksPage'
import KanbanPage from './pages/KanbanPage'
const pages=[['categories','Categorias',Tags,CategoriesPage],['products','Produtos',Package,ProductsPage],['spots','Mesas',Table2,SpotsPage],['checks','Comandas',Receipt,GuestChecksPage],['kanban','Kanban',Columns3,KanbanPage]]
export default function App(){const [active,setActive]=useState('categories');const Page=pages.find(p=>p[0]===active)[3];return <div className="min-h-screen md:grid md:grid-cols-[230px_1fr]"><aside className="bg-slate-900 p-5 text-white"><div className="mb-8 flex items-center gap-3 text-xl font-bold"><Utensils/> Menu CMS</div><p className="mb-3 text-xs uppercase tracking-widest text-slate-400">Administração</p><nav aria-label="Navegação" className="flex flex-wrap gap-2 md:flex-col">{pages.map(([key,label,Icon])=><Button key={key} variant="outline" aria-current={active===key?'page':undefined} onClick={()=>setActive(key)} className={'justify-start gap-2 border-transparent '+(active===key?'bg-green-700 text-white hover:bg-green-700':'bg-transparent text-slate-200 hover:bg-slate-700')}><Icon size={17}/>{label}</Button>)}</nav></aside><main className="min-w-0 p-5 md:p-9"><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-green-700">Painel do restaurante</p>{!import.meta.env.VITE_API_URL?<Alert error>Configure VITE_API_URL no arquivo .env antes de usar o CMS.</Alert>:<Page/>}</main></div>}