// Fachada para manter a API simples utilizada pelas páginas.
import {Alert as ShadAlert,AlertDescription} from './ui/alert'
import {Dialog as ShadDialog,DialogContent,DialogHeader,DialogTitle,DialogDescription} from './ui/dialog'
import {Select as ShadSelect,SelectTrigger,SelectValue,SelectContent,SelectItem} from './ui/select'
export {Button} from './ui/button'
export {Input} from './ui/input'
export {Textarea} from './ui/textarea'
export {Badge} from './ui/badge'
export {Table,TableHeader,TableBody,TableRow,TableHead,TableCell} from './ui/table'
export {Card,CardHeader,CardTitle,CardDescription,CardContent} from './ui/card'
export function Alert({children,error=false}){return <ShadAlert variant={error?'destructive':'default'}><AlertDescription>{children}</AlertDescription></ShadAlert>}
export function Dialog({open,onOpenChange,title,description,children}){return <ShadDialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl"><DialogHeader><DialogTitle>{title}</DialogTitle><DialogDescription>{description}</DialogDescription></DialogHeader>{children}</DialogContent></ShadDialog>}
export function Select({value,onValueChange,options,label,disabled=false}){return <ShadSelect value={value} onValueChange={onValueChange} disabled={disabled}><SelectTrigger aria-label={label} className="w-full"><SelectValue/></SelectTrigger><SelectContent className="z-[60]">{options.map(o=><SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></ShadSelect>}
