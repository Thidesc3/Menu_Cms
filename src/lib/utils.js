import {clsx} from 'clsx'
import {twMerge} from 'tailwind-merge'
export function cn(...inputs){return twMerge(clsx(inputs))}
export const money = value => Number(value).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})
export const date = value => new Date(value).toLocaleString('pt-BR')