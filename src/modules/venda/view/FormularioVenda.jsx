import { useState, useEffect } from "react";
import { Form, Container, Card, Button, Row, Col, Table } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { Link } from "react-router-dom";
import { vendaService } from "../service/vendaService";
import ListarVendas from "./ListarVendas";
import { produtoService } from "../../produto/service/produtoService";

function FormularioVenda() {
    const [atualiza, setAtualiza] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [idVenda, setIdVenda] = useState(null); 
    const [saborProdutos, setSaborProdutos] = useState([]);
    const [indexEdicao, setIndexEdicao] = useState(null); 

    const estadoInicialVenda = {
        dataVenda: new Date().toLocaleDateString('en-CA'),
        itens: []
    };
    const [venda, setVenda] = useState(estadoInicialVenda);

    const estadoInicialItemVenda = {
        nomeProduto: '',
        quantidade: '',
        precoVendido: '',
        sabor: ''
    };
    const [itemVenda, setItemVenda] = useState(estadoInicialItemVenda);

    // Busca todos os produtos
    useEffect(() => {
        produtoService.listar()
            .then(dados => {
                const listaSegura = dados || [];
                const produtosComSabor = listaSegura.filter(p => p.sabor && p.sabor.trim() !== "");
                const nomesUnicos = [];
                const produtosFiltrados = produtosComSabor.filter(p => {
                    if (!nomesUnicos.includes(p.nomeProduto)) {
                        nomesUnicos.push(p.nomeProduto);
                        return true;
                    }
                    return false;
                });
                setProdutos(produtosFiltrados);
                setSaborProdutos(produtosComSabor);
            })
            .catch(err => console.error(err));
    }, []);

    // Busca venda por id
    useEffect(() => {
        if (idVenda) {
            vendaService.buscarPorId(idVenda)
                .then(setVenda)
                .catch(err => alert("Erro ao carregar venda: " + err.message));
        }
    }, [idVenda]);

    const handleSelecionarProduto = (nome) => {
        const prod = produtos.find(p => p.nomeProduto === nome);
        if (prod) {
            setItemVenda({
                ...itemVenda,
                nomeProduto: prod.nomeProduto,
                sabor: prod.sabor,
                precoVendido: prod.precoVendido || ''
            });
        }
    };

    // Função para carregar item da tabela para edição
    const editarItem = (index) => {
        const item = venda.itens[index];
        setItemVenda({
            nomeProduto: item.nomeProduto,
            quantidade: item.quantidade,
            precoVendido: item.precoVendido,
            sabor: item.sabor || ''
        });
        setIndexEdicao(index);
    };

    // Função para cancelar edição
    const cancelarEdicao = () => {
        setItemVenda(estadoInicialItemVenda);
        setIndexEdicao(null);
    };

    const adicionarItem = () => {
        if (!itemVenda.nomeProduto || !itemVenda.quantidade || !itemVenda.precoVendido) return;

        const itemFormatado = {
            ...itemVenda,
            quantidade: Number(itemVenda.quantidade),
            precoVendido: Number(itemVenda.precoVendido)
        };

        if (indexEdicao !== null) {
            // Atualizar item existente
            const novosItens = [...venda.itens];
            novosItens[indexEdicao] = itemFormatado;
            setVenda({ ...venda, itens: novosItens });
            setIndexEdicao(null);
        } else {
            // Adicionar novo item
            setVenda({ ...venda, itens: [...venda.itens, itemFormatado] });
        }

        setItemVenda(estadoInicialItemVenda);
    };

    const removerItem = (index) => {
        const novaLista = venda.itens.filter((_, i) => i !== index);
        setVenda({ ...venda, itens: novaLista });
        
        // Se estava editando este item, cancelar edição
        if (indexEdicao === index) {
            cancelarEdicao();
        }

        setIndexEdicao(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (venda.itens.length === 0) {
            alert("Adicione pelo menos um produto na venda.");
            return;
        }

        try {
            if (idVenda) {
                await vendaService.atualizar(idVenda, venda);
                alert("Venda atualizada!");
            } else {
                await vendaService.salvar(venda);
                alert("Venda salva!");
            }
            
            setVenda(estadoInicialVenda);
            setIdVenda(null);
            setIndexEdicao(null);
            setAtualiza(p => !p);
        } catch (error) {
            alert('Erro: ' + error.message);
        } finally {
            setVenda(estadoInicialVenda);
        }
    };

    return(
        <>
            <Container className="mt-4">
                <Card className="shadow-sm p-4">
                    <h3 className="mb-4">🛒 Registrar Nova Venda</h3>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-4">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Data da Venda</Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        value={venda.dataVenda}
                                        onChange={(e) => setVenda({...venda, dataVenda: e.target.value})}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Card className="bg-light p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="mb-0">
                                    {indexEdicao !== null ? '✏️ Editar Produto' : 'Adicionar Produtos'}
                                </h5>
                                {indexEdicao !== null && (
                                    <Button variant="outline-secondary" size="sm" onClick={cancelarEdicao}>
                                        Cancelar Edição
                                    </Button>
                                )}
                            </div>
                            <Row>
                                {produtos.length === 0 && (
                                    <Form.Text className="text-danger">
                                        Você precisa cadastrar produtos antes de realizar uma venda. <Link to={'/produtos/novo'}>Cadastrar Produtos</Link>
                                    </Form.Text>
                                )}
                                {/* === Nome === */}
                                <Col md={3}>
                                    <Form.Select
                                        value={itemVenda.nomeProduto}
                                        onChange={(e) => handleSelecionarProduto(e.target.value)}
                                    >
                                        <option value=''>
                                            {produtos.length > 0 ? 'Selecione um produto' : 'Não existe produtos'}
                                        </option>
                                        {produtos.map(p => (
                                            <option key={p.idProduto} value={p.nomeProduto}>
                                                {p.nomeProduto}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>

                                {/* === Sabor === */}
                                <Col md={2}>
                                    <Form.Select
                                        value={itemVenda.sabor}
                                        onChange={(e) => setItemVenda({...itemVenda, sabor: e.target.value})}
                                    >
                                        <option value=''>
                                            {produtos.length > 0 ? 'Escolha o sabor' : 'Sem sabores '} 
                                        </option>
                                        {saborProdutos
                                            .filter(p => p.nomeProduto === itemVenda.nomeProduto)
                                            .map(p => (
                                                <option key={p.idProduto} value={p.sabor}>
                                                    {p.sabor}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Form.Control 
                                        type="number" 
                                        placeholder="Qtd" 
                                        value={itemVenda.quantidade}
                                        onChange={(e) => setItemVenda({...itemVenda, quantidade: e.target.value})}
                                    />
                                </Col>
                                <Col md={3}>
                                    <Form.Group>
                                        <CurrencyInput
                                            className="form-control"
                                            prefix="R$ "
                                            decimalsLimit={2}
                                            value={itemVenda.precoVendido}
                                            onValueChange={(value) => setItemVenda({...itemVenda, precoVendido: value})}
                                            placeholder="Preço Vendido"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Button 
                                        variant={indexEdicao !== null ? "warning" : "outline-primary"} 
                                        onClick={adicionarItem} 
                                        className="w-100"
                                    >
                                        {indexEdicao !== null ? '💾 Salvar' : '+ Add'}
                                    </Button>
                                </Col>
                            </Row>
                        </Card>

                       <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Produto</th>
                                    <th>Sabor</th>
                                    <th>Qtd</th>
                                    <th>Preço</th>
                                    <th>Subtotal</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venda.itens.map((it, index) => (
                                    <tr 
                                        key={index}
                                        className={indexEdicao === index ? 'table-warning' : ''}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td onClick={() => editarItem(index)}>{it.nomeProduto}</td>
                                        <td onClick={() => editarItem(index)}>{it.sabor}</td>
                                        <td onClick={() => editarItem(index)}>{it.quantidade}</td>
                                        <td onClick={() => editarItem(index)}>R$ {it.precoVendido}</td>
                                        <td onClick={() => editarItem(index)}>R$ {(it.quantidade * it.precoVendido).toFixed(2)}</td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm" 
                                                    onClick={() => editarItem(index)}
                                                    title="Editar"
                                                >
                                                    ✏️
                                                </Button>
                                                <Button 
                                                    variant="danger" 
                                                    size="sm" 
                                                    onClick={() => removerItem(index)}
                                                    title="Remover"
                                                >
                                                    🗑️
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <div className="d-flex justify-content-end mt-3 gap-2">
                            {idVenda && (
                                <Button variant="secondary" onClick={() => { setIdVenda(null); setVenda(estadoInicialVenda); }}>
                                    Cancelar Edição
                                </Button>
                            )}
                            <Button variant={idVenda ? "warning" : "success"} size="lg" type="submit">
                                {idVenda ? "Salvar Alterações" : "Finalizar Venda"}
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>

            <ListarVendas
                atualizar={atualiza}
                setAtualizar={setAtualiza}
                setIdVenda={setIdVenda} 
            />
        </>
    )
}

export default FormularioVenda;