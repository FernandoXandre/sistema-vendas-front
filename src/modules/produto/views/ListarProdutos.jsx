import { useEffect, useState } from "react";
import { Table, Button, Container, Card } from "react-bootstrap";
import { produtoService } from "../service/produtoService";

function ListarProdutos( {setIdProduto, atualizar, setAtualizar} ) {
    const [produtos, setProdutos] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        produtoService.listar()
            .then(setProdutos)
            .catch(err => setErro(err.message));
    }, [atualizar]);

    const handleDelete = async(id) => {
        try{
            await produtoService.deletar(id);
            setAtualizar(p => !p);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const handleId = (idProduto) => {
        setIdProduto(idProduto);
    }

    return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-primary m-0">Meus Produtos</h2>
        </div>
        
        <Table hover responsive>
          <thead className="table-light">
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Sabor</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(p => (
              <tr key={p.idProduto}>
                <td>{p.nomeProduto}</td>
                <td>R$ {p.precoUnidade}</td>
                <td>{p.sabor.toUpperCase()}</td>
                <td className="text-center">
                    <Button variant="outline-primary" size="sm" onClick={() => handleId(p.idProduto)} className="me-2">Editar</Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p.idProduto)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default ListarProdutos;