# Menu CMS

Painel administrativo de restaurante integrado à API NestJS do [Menu-backend](https://github.com/Thidesc3/Menu-backend).

## Executar

Requisitos: Node.js 20+, npm e PostgreSQL para o backend.

1. No backend, configure o `.env`, execute `npm install` e `npm run start:dev` na raiz.
2. Neste repositório, execute `npm install`.
3. Copie `.env.example` para `.env` e configure `VITE_API_URL` com a URL do backend.
4. Execute `npm run dev` e abra a URL indicada pelo Vite.
5. Para gerar a versão de produção: `npm run build`.

## Stack

Vite, React, Tailwind CSS, Axios, TanStack Query e componentes locais baseados no padrão shadcn/ui. Dependências adicionais: Radix Dialog/Select (primitivas acessíveis), clsx e tailwind-merge (composição de classes), lucide-react (ícones), sonner (feedback de operações) e @dnd-kit/core (Kanban com arrastar e soltar).

## Organização

- src/pages: páginas administrativas.
- src/components: componentes reutilizáveis, formulários e estados.
- src/services/api.js: única instância Axios e serviços REST.
- src/lib: utilitários de formatação.

Todas as leituras usam useQuery. Gravações usam useMutation e invalidam as consultas afetadas. O Kanban usa a mesma mutação dos pedidos; o status vem da API, sem armazenamento local.

## Validação necessária antes da entrega

- Cadastrar, editar, excluir categorias, produtos e mesas.
- Criar um pedido pelo frontend de cliente ou POST /orders no Insomnia com spotId e items [{productId,quantity}].
- Verificar a abertura automática da comanda e os valores.
- Alterar status na comanda e arrastar no Kanban; recarregar e verificar persistência.
- Testar erros de API, listas vazias e preço inválido.

O código foi preparado para integração; os testes com banco e navegador precisam ser executados no ambiente local.

## Referências

Estrutura de API consultada: https://github.com/joaohupalo/menu-backend. Interface baseada na stack solicitada na disciplina. 
