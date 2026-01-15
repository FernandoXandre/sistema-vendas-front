import { useEffect, useState } from "react";
import { Table, Container, Card, Button } from "react-bootstrap";
import { materialService } from "../service/materialService";

function ListarMateriais({setMaterialBuscado, handleLimpar, setAtualizar, atualizar}) {
    const [listaMateriais, setListaMateriais] = useState([]);

    useEffect(() => {
        materialService.listar()
            .then(dados => {
                console.log("Materiais carregados:", dados); // 🔍 Debug
                setListaMateriais(dados || []);
            })
            .catch(err => {
                console.error("Erro ao listar:", err); // 🔍 Debug
            });
    }, [atualizar]);

    const handleId = (id) => {
        const materialUnico = listaMateriais.find(m => m.idMaterial === id);
        setMaterialBuscado(materialUnico);
    };

    const handleDelete = async (id) => {

        try {
            await materialService.deletar(id);
            console.log("Material deletado, atualizando..."); // 🔍 Debug
            setAtualizar(prev => !prev);
            alert("Material excluído com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar:", error); // 🔍 Debug
            alert("Erro ao excluir: " + error.message);
        } finally {
            handleLimpar();
        }
    };

    return(
        <Container>
            <Card className="shadow-sm p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary m-0">Materiais cadastrados</h2>
                    <div>
                        <span className="badge bg-primary me-2">{listaMateriais.length}</span>
                        <Button onClick={() => setAtualizar(p => !p)} className="badge ">Atualizar</Button>
                    </div>
                </div>
                
                <Table hover responsive>
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>QTD por Unidade</th>
                            <th>Tipo medida</th>
                            <th>Preço Pago</th>
                            <th className="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaMateriais.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center text-muted py-4">
                                    Nenhum material cadastrado
                                </td>
                            </tr>
                        ) : (
                            listaMateriais.map(mat => (
                                <tr key={mat.idMaterial}>
                                    <td>{mat.idMaterial}</td>
                                    <td>{mat.nomeMaterial}</td>
                                    <td>{mat.qtdPorUnidade}</td>
                                    <td>{mat.tipoMedida}</td>
                                    <td>R$ {parseFloat(mat.precoPago).toFixed(2)}</td>
                                    <td className="text-center">
                                        <Button 
                                            variant="outline-primary" 
                                            size="sm" 
                                            onClick={() => handleId(mat.idMaterial)} 
                                            className="me-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button 
                                            variant="outline-danger" 
                                            size="sm" 
                                            onClick={() => handleDelete(mat.idMaterial)}
                                        >
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default ListarMateriais;