import api from '../../../api/api.js';

const BASE_URL_RECURSO = '/produtos';

export const produtoService = {
    listar: async () => {
        try {
            const response = await api.get(BASE_URL_RECURSO);
            return response.data;
        } catch (err) {
            if(err.response) {
                console.error("Erro no banco de dados: ", err.response.data);
                throw new Error(err.reponse.data.message || "Erro ao listar os produtos cadastrados.");
            }
            throw new Error("Não foi possivel conectar ao servidor.");
        }
    },

    buscarPorId: async (idProduto) => {
        try{
            const response = await api.get(BASE_URL_RECURSO + "/" + idProduto);
            return response.data;
        }catch (err) {
            if(err.response) {
                console.log("Erro ao buscar produto por id: ", err.reponse.data);
                throw new Error(err.reponse.data.message || "Erro ao buscar produto por id.");
            }
            throw new Error("Erro ao conectar com o servidor.");
        }

    },

    salvar: async (produto) => {
        const dadosTratados = {
                ...produto,
                nomeProduto: produto.nomeProduto.trim().toUpperCase(),
                sabor: produto.sabor.trim().toUpperCase(),
                precoUnidade: parseFloat(produto.precoUnidade.toString().replace(',', '.'))
            };
            
        return api.post(BASE_URL_RECURSO +'/novo', dadosTratados);
    },

    atualizar: async (idProduto, produtoEditado) => {
        try{
            return await api.put(BASE_URL_RECURSO + '/editar/' +idProduto, produtoEditado)
        } catch (error) {
            throw new Error(error.message);
        }
    },

    deletar: async (idProduto) => {
        try{
            return await api.delete(BASE_URL_RECURSO + '/' + idProduto);
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
