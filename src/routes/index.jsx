import { Routes, Route, Navigate } from "react-router-dom";

import ListarProdutos from '../modules/produto/views/ListarProdutos.jsx';
import FormularioProduto from '../modules/produto/views/FormularioProduto.jsx';

import ListarVendas from '../modules/venda/view/ListarVendas.jsx';
import FormularioVenda from '../modules/venda/view/FormularioVenda.jsx';
function AppRoutes() {
    return (
        <Routes>
            {/* ======================== Produtos ======================== */}
            <Route path="/produtos" element={<ListarProdutos />} />
            <Route path="/produtos/novo" element={<FormularioProduto />} />
            <Route path="/produtos/editar/:id" element={<FormularioProduto />} />

            {/* ======================== Vendas ======================== */}
            <Route path="/vendas" element={< ListarVendas />} />
            <Route path="/vendas/novo" element={< FormularioVenda />} />
            <Route path="/vendas/editar/:id" element={< FormularioVenda />} />
        </Routes>
    );
}

export default AppRoutes;