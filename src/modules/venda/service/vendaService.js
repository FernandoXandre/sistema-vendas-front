import api from "../../../api/api.js";

const BASE_URL_RECURSO = '/vendas'

export const vendaService = {
    listar: async () => {
        try {
            const resp = await api.get(BASE_URL_RECURSO);
            return resp.data;
        } catch (error) {
            if(error.response) {
                const msg = error.response.data?.message || "Erro ao consultar as vendas.";
                throw new Error(msg);
            } else {
                throw new Error("Não foi possivel conectar ao servidor.");
            }
        }
    },

    buscarPorId: async (id) => {
        try{
            const resp = await api.get(BASE_URL_RECURSO + '/' + id)
            return resp.data;
        } catch(error) {
            throw new Error('Erro ao buscar por id');
        }
    },


    salvar: async (venda) => {
        try {
            const resp = await api.post(BASE_URL_RECURSO + '/novo', venda);
            return resp.data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    atualizar: async (id, vendaAtualizada) => {
        try { 
            const resp = api.put(BASE_URL_RECURSO + '/editar/' + id, vendaAtualizada);
            return resp.data;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deletar: async (id) => {
        try {
            return await api.delete(BASE_URL_RECURSO +'/'+ id);
        } catch (error) {
            throw new Error(error.message);
        } 
    }

}