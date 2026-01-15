import { Routes, Route, Navigate } from "react-router-dom";

import ListarProdutos from '../modules/produto/views/ListarProdutos.jsx';
import FormularioProduto from '../modules/produto/views/FormularioProduto.jsx';

import ListarVendas from '../modules/venda/view/ListarVendas.jsx';
import FormularioVenda from '../modules/venda/view/FormularioVenda.jsx';
import ListarMateriais from "../modules/material/views/ListarMateriais.jsx";
import FormularioMaterial from "../modules/material/views/FormularioMaterial.jsx";
function AppRoutes() {
    return (
        <Routes>
            {/* ======================== Produtos ======================== */}
            <Route path="/produtos" element={<ListarProdutos />} />
            <Route path="/produtos/novo" element={<FormularioProduto />} />
            <Route path="/produtos/editar" element={<FormularioProduto />} />

            {/* ======================== Vendas ======================== */}
            <Route path="/vendas" element={< ListarVendas />} />
            <Route path="/vendas/novo" element={< FormularioVenda />} />
            <Route path="/vendas/editar" element={< FormularioVenda />} />
            
            {/* ======================== Materiais ======================== */}
            <Route path="/materiais" element={<FormularioMaterial/>}/>
            <Route path="/materiais/novo" element={<FormularioMaterial/>}/>
            <Route path="/materiais/editar" element={<FormularioMaterial/>}/>
        </Routes>
    );
}

export default AppRoutes;