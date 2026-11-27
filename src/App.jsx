import {useState} from 'react'
import {Utensils,Tags,Package,Table2,Receipt,Columns3,LayoutDashboard} from 'lucide-react'
import {Alert,Button} from './components/ui'
import DashboardPage from './pages/DashboardPage'
import CategoriesPage from './pages/CategoriesPage'
import ProductsPage from './pages/ProductsPage'
import SpotsPage from './pages/SpotsPage'
import GuestChecksPage from './pages/GuestChecksPage'
import KanbanPage from './pages/KanbanPage'

const pages=[
 ['dashboard','Visão geral',LayoutDashboard,DashboardPage],
 ['categories','Categorias',Tags,CategoriesPage],
 ['products','Produtos',Package,ProductsPage],
 ['spots','Mesas',Table2,SpotsPage],
 ['checks','Comandas',Receipt,GuestChecksPage],
 ['kanban','Kanban',Columns3,KanbanPage]
]
export default function App(){
 const [active,setActive]=useState('dashboard')
 const [,label,,Page]=pages.find(p=>p[0]===active)
 return <div className="min-h-screen lg:grid lg:grid-cols-[248px_1fr]">
  <aside className="bg-slate-950 p-5 text-white lg:sticky lg:top-0 lg:h-screen">
   <div className="mb-9 flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-green-700"><Utensils size={23}/></span><div><p className="text-lg font-bold">Menu CMS</p><p className="text-xs text-slate-400">Gestão de restaurante</p></div></div>
   <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">Administração</p>
   <nav aria-label="Navegação" className="flex flex-wrap gap-2 lg:flex-col">{pages.map(([key,text,Icon])=><Button key={key} variant="ghost" aria-current={active===key?'page':undefined} onClick={()=>setActive(key)} className={'h-11 justify-start gap-3 px-3 '+(active===key?'bg-green-700 text-white hover:bg-green-700 hover:text-white':'text-slate-300 hover:bg-slate-800 hover:text-white')}><Icon size={18}/>{text}</Button>)}</nav>
   <div className="mt-10 hidden border-t border-slate-800 pt-5 text-xs text-slate-400 lg:block">Painel administrativo<br/>Cardápio e operação</div>
  </aside>
  <div className="min-w-0">
   <header className="flex items-center justify-between border-b border-border bg-white px-5 py-4 lg:px-9"><span className="text-sm text-slate-500">Administração / <strong className="text-slate-800">{label}</strong></span><span className="hidden text-xs font-medium text-slate-500 sm:block">Menu CMS</span></header>
   <main className="mx-auto max-w-[1600px] p-5 lg:p-9">{!import.meta.env.VITE_API_URL?<Alert error>Configure VITE_API_URL no arquivo .env antes de usar o CMS.</Alert>:<Page onNavigate={setActive}/>}</main>
  </div>
 </div>
}
