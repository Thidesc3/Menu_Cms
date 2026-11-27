import {useQuery} from '@tanstack/react-query'
import {Tags,Package,Table2,Receipt,Wallet,ShoppingBag,ArrowRight} from 'lucide-react'
import {categories,products,spots,guestChecks,orders,errorMessage} from '../services/api'
import {money,date} from '../lib/utils'
import {Alert,Button,Card,CardHeader,CardTitle,CardDescription,CardContent,Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from '../components/ui'
import {StatusBadge,statuses} from '../components/OrderCard'
function Metric({title,icon:Icon,query,value,detail}){
 return <Card className="gap-3 py-5"><CardHeader className="flex flex-row items-center justify-between"><CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle><span className="grid size-9 place-items-center rounded-lg bg-green-50 text-green-800"><Icon size={18}/></span></CardHeader><CardContent><p className="text-3xl font-bold tracking-tight">{query.isPending?'…':query.isError?'—':value}</p><p className="mt-2 text-xs text-muted-foreground">{query.isError?'Falha na consulta':query.isPending?'Carregando...':detail}</p></CardContent></Card>
}
export default function DashboardPage({onNavigate}){
 const c=useQuery({queryKey:['categories'],queryFn:categories.list})
 const p=useQuery({queryKey:['products'],queryFn:products.list})
 const s=useQuery({queryKey:['spots'],queryFn:spots.list})
 const g=useQuery({queryKey:['guestChecks'],queryFn:guestChecks.list,refetchInterval:15000})
 const o=useQuery({queryKey:['orders'],queryFn:()=>orders.list(),refetchInterval:15000})
 const checks=(g.data??[]).filter(x=>x.status==='OPENED')
 const allOrders=o.data??[]
 const recent=[...allOrders].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5)
 const total=checks.reduce((sum,x)=>sum+Number(x.total),0)
 const metrics=[
  {title:'Categorias',icon:Tags,query:c,value:c.data?.length,detail:(c.data??[]).filter(x=>x.active).length+' ativas'},
  {title:'Produtos',icon:Package,query:p,value:p.data?.length,detail:(p.data??[]).filter(x=>x.active).length+' ativos'},
  {title:'Mesas',icon:Table2,query:s,value:s.data?.length,detail:(s.data??[]).filter(x=>x.active).length+' ativas'},
  {title:'Comandas abertas',icon:Receipt,query:g,value:checks.length,detail:'Em atendimento'},
  {title:'Total em aberto',icon:Wallet,query:g,value:money(total),detail:'Soma das comandas abertas'},
  {title:'Pedidos',icon:ShoppingBag,query:o,value:allOrders.length,detail:'Todos os pedidos registrados'}
 ]
 const errors=[c,p,s,g,o].filter(q=>q.isError)
 return <section className="space-y-6">
  <div><p className="text-xs font-semibold uppercase tracking-widest text-green-700">Visão geral</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Painel do restaurante</h1><p className="mt-1 text-sm text-muted-foreground">Acompanhe o cardápio, as mesas e a operação em um só lugar.</p></div>
  {errors.length>0&&<Alert error>{errorMessage(errors[0].error)}<Button variant="outline" onClick={()=>errors.forEach(q=>q.refetch())}>Tentar novamente</Button></Alert>}
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{metrics.map(m=><Metric key={m.title} {...m}/>)}</div>
  <Card className="gap-4"><CardHeader><div className="flex flex-wrap items-center justify-between gap-3"><div><CardTitle>Fluxo de pedidos</CardTitle><CardDescription>Distribuição dos pedidos por status</CardDescription></div><Button variant="outline" onClick={()=>onNavigate('kanban')}>Abrir Kanban <ArrowRight size={16}/></Button></div></CardHeader><CardContent>{o.isPending?<p>Carregando pedidos...</p>:o.isError?<Alert error>Não foi possível carregar os pedidos.</Alert>:<div className="grid gap-3 sm:grid-cols-4">{statuses.map(status=><div key={status.value} className="rounded-lg border border-border bg-slate-50 p-4"><StatusBadge status={status.value}/><p className="mt-3 text-2xl font-bold">{allOrders.filter(x=>x.status===status.value).length}</p></div>)}</div>}</CardContent></Card>
  <Card className="gap-4"><CardHeader><div className="flex items-center justify-between gap-3"><div><CardTitle>Pedidos recentes</CardTitle><CardDescription>Últimos cinco pedidos registrados</CardDescription></div><Button variant="outline" onClick={()=>onNavigate('checks')}>Ver comandas</Button></div></CardHeader><CardContent>{o.isPending?<p>Carregando...</p>:o.isError?<Alert error>Não foi possível carregar os pedidos.</Alert>:!recent.length?<Alert>Nenhum pedido encontrado.</Alert>:<Table><TableHeader><TableRow>{['Mesa','Data','Status','Total'].map(x=><TableHead key={x}>{x}</TableHead>)}</TableRow></TableHeader><TableBody>{recent.map(row=><TableRow key={row.id}><TableCell>{row.guestCheck?.spot?.name??'—'}</TableCell><TableCell>{date(row.createdAt)}</TableCell><TableCell><StatusBadge status={row.status}/></TableCell><TableCell>{money(row.total)}</TableCell></TableRow>)}</TableBody></Table>}</CardContent></Card>
 </section>
}
