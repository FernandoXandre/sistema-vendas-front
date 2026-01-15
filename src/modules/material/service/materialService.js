import api from "../../../api/api";

const BASE_URL_RECURSO = "/materiais";

export const materialService = {
    listar: async () => {
        try{
            const resp = await api.get(BASE_URL_RECURSO);
            return resp.data;
        }catch(error) {
            if(error.response) {
                const msg = error.response.data?.message || "Erro ao buscar os materiais";
                throw new Error(msg);
            } else {
                throw new Error("Não foi possivel conectar ao servidor.");
            }
        }
    },

    buscarPorid: async (id) => {
        try{
            const resp = await api.get(BASE_URL_RECURSO + '/' + id);
            return resp.response;
        } catch(error) {
            if(error.response){
                const msg = error.response.data?.message || "Erro ao buscar pelo id: "+id
                throw new Error(msg);
            }
            throw new Error('Erro ao conectar no servidor.');
        }
    },

    salvar: async (material) => {
        try{
            const resp = api.post(BASE_URL_RECURSO + '/novo', material);
            return resp.data;
        } catch(error) {
            if(error.response) {
                const msg = error.response.data?.massage || "Erro ao salvar o material";
                throw new Error(msg);
            }
            throw new Error('Erro ao conectar ao servidor.');
        }
    }, 

    atualizar: async (id, material) => {
        try{
            const resp = api.put(BASE_URL_RECURSO + '/editar/' + id, material);
            return resp.data;
        } catch(error) {
            if(error.response) {
                const msg = error.response.data?.massage || "Erro ao atualizar o material";
                throw new Error(msg);
            }
            throw new Error('Erro ao conectar ao servidor.');
        }
    },

    deletar: async (id) => {
        try{
            const resp = api.delete(BASE_URL_RECURSO + '/' + id);
            return resp.data;
        } catch(error) {
            if(error.response) {
                const msg = error.response.data?.massage || "Erro ao deletar o material";
                throw new Error(msg);
            }
            throw new Error('Erro ao conectar ao servidor.');
        }
    }
}