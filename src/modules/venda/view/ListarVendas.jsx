import { useEffect, useState } from "react";
import { Table, Button, Container, Card, Badge } from "react-bootstrap";
import {vendaService} from '../service/vendaService.js';

function ListarVendas({setAtualizar, atualizar, setIdVenda}) {
    const [vendas, setVendas] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        vendaService.listar()
            .then(dados => {
                setVendas(Array.isArray(dados) ? dados : []);
            })
            .catch(err => setErro(err));
    }, [atualizar]);

    const handleDelete = async (id) => {
        try {
            await vendaService.deletar(id);
            setAtualizar(p => !p);
        } catch (err) {
            throw new Error(err.message);
        }
    };


    const handleId = async (id) => {
        try{
            setIdVenda(id);
        }catch (err) {
            throw new Error(err.message);
        }
    };

    return ( 
        <Container className="mt-4">
            <Card className="shadow-sm p-4">
                <h2 className="text-primary mb-4">💰 Histórico de Vendas</h2>
                
                <Table hover responsive bordered>
                    <thead className="table-dark">
                        <tr>
                            <th>Data</th>
                            <th>Produtos Vendidos</th>
                            <th>Total da Venda</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendas.map((venda) => (
                            <tr key={venda.idVenda}>
                                <td>{new Date(venda.dataVenda).toLocaleDateString('pt-BR')}</td>
                                <td>
                                    {/* Lista interna de produtos */}
                                    <ul className="list-unstyled mb-0">
                                        {venda.itens.map((item, idx) => (
                                            <li key={idx} style={{ fontSize: '0.9rem' }}>
                                                <Badge bg="secondary" className="me-2">
                                                    {item.quantidade}x
                                                </Badge>
                                                {item.nomeProduto} 
                                                <span className="text-muted small"> (R$ {item.precoVendido})</span>
                                                <span className="text-muted small"> ({item.sabor})</span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="fw-bold text-success">
                                    R$ {venda.valorTotalVendido.toFixed(2).replace('.', ',')}
                                </td>
                                <td className="text-center">
                                    <Button variant="outline-primary" size="sm" onClick={() => handleId(venda.idVenda)} className="me-2">Editar</Button>
                                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(venda.idVenda)}>Excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default ListarVendas;


