import { useState, useEffect } from "react";
import { Form, Container, Button, Card, Row, Col } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import { useParams } from "react-router-dom";
import { produtoService } from "../service/produtoService";
import ListarProdutos from "./ListarProdutos";

function FormularioProduto() {
    const [erro, setErro] = useState(null);
    const [ idProduto, setIdProduto ] = useState(null);
    const [recarrega, setRecarrega] = useState(false);
    
    const estadoInicial = {
        nomeProduto: '',
        sabor: '',
        precoUnidade:''
    };
    const [produto, setProduto] = useState(estadoInicial)


    useEffect(() => {
        if(idProduto) {
            produtoService.buscarPorId(idProduto)
                .then(setProduto)
                .catch(err => setErro(err.message));
        }
    }, [idProduto]);

    const handleChange = (e) => {
        console.log(e.target.name);
        setProduto({ ...produto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            if(idProduto) {
                await produtoService.atualizar(idProduto, produto);
            } else {
                await produtoService.salvar(produto);
            }

            setProduto(estadoInicial);
            setRecarrega(p => !p);
        } catch (err) {
            setErro(err.message);
        }
    };


/* ==================================== 
            // Formulario
 ====================================*/
    return(
        <>
            <Container className="mt-4">
                {/* SEÇÃO 1: FORMULÁRIO */}
                <Card className="shadow-sm mb-5 p-4">
                    <Card.Title>
                        {idProduto ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                        {erro && <p style={{ color: "red" }}>{erro}</p>}
                    </Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome do Produto</Form.Label>
                                    <Form.Control
                                        name="nomeProduto"
                                        value={produto.nomeProduto}
                                        onChange={(e) => handleChange(e) }
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Sabor (Opcional)</Form.Label>
                                    <Form.Control
                                        name="sabor"
                                        value={produto.sabor || ''}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço da Unidade</Form.Label>
                                        <CurrencyInput
                                            className="form-control"
                                            prefix="R$ "
                                            value={produto.precoUnidade}
                                            onValueChange={(value) => setProduto({ ...produto, precoUnidade: value })}
                                            required
                                        />
                                </Form.Group>
                            </Col>
                            <Col md={2} className="d-flex align-items-end mb-3">
                                <Button variant={idProduto ? "warning" : "success"} type="submit" className="w-100">
                                    {idProduto ? 'Atualizar' : 'Salvar'}
                                </Button>
                            </Col>
                            <Col md={2} className="d-flex align-items-end mb-3">
                                {idProduto && (
                                    <Button variant="danger" className="w-100" onClick={() => { 
                                            setIdProduto(null); 
                                            setProduto({nomeProduto:'',sabor: '', precoUnidade:''}); 
                                        }}>
                                        Cancelar Edição
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Container>

{/* ==================================== 
       Lista de produtos
 ==================================== */}
            <ListarProdutos 
                setAtualizar={setRecarrega}
                atualizar = {recarrega}
                setIdProduto = {setIdProduto}
            />
        </>
       
    );
}

export default FormularioProduto;