import { useState, useEffect } from "react";
import { Table, Container, Button, Card, Row, Col, Form, Badge } from "react-bootstrap";
import CurrencyInput from "react-currency-input-field";
import ListarMateriais from "./ListarMateriais";
import { materialService } from "../service/materialService";

function FormularioMaterial() {
    const estadoInicialMaterial = {
        nomeMaterial:'',
        tipoMedida:'',
        qtdPorUnidade:'',
        qtdEstoque:'',
        precoPago:''
    }
    const [material, setMaterial] = useState(estadoInicialMaterial);

    const estadoInicialMaterialBuscado = {
        idMaterial:'',
        nomeMaterial:'',
        tipoMedida:'',
        qtdPorUnidade:'',
        precoPago:''
    }
    const [materialBuscado, setMaterialBuscado] = useState(estadoInicialMaterialBuscado);
    const [atualizar, setAtualizar] = useState(false);
    const [msgErro, setMsgErro] = useState(null);

    useEffect(() => {
        setMaterial(materialBuscado);
    },[materialBuscado]);


    const handleLimpar = () => {
        setMaterialBuscado(estadoInicialMaterialBuscado);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const precoFormatado = material.precoPago
                ? parseFloat(material.precoPago.toString().replace(',', '.'))
                : 0;

            const materialParaEnviar = {
                ...material,
                precoPago: precoFormatado,
                qtdEstoque: materialBuscado.idMaterial ? material.qtdEstoque : material.qtdComprada
            };

            if(materialBuscado.idMaterial) {
                await materialService.atualizar(materialBuscado.idMaterial, materialParaEnviar);
                alert("Material atualizado com sucesso.");
                setMaterialBuscado(estadoInicialMaterialBuscado);
            } else {
                await materialService.salvar(materialParaEnviar);
                alert("Material salvo com sucesso.");
            }
            setMaterial(estadoInicialMaterial);
        } catch(err) {
            setMsgErro(err.message);
        } finally {
            setAtualizar(p => !p);
        }
    }
    
    const handleChange = (e) => {
        setMaterial({...material, [e.target.name]: e.target.value});
    } 

    return (
        <>
            <Container className="mt-5 mb-5">
                <Card className="border-0 shadow-lg" style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '20px',
                    overflow: 'hidden'
                }}>
                    {/* Header do Card */}
                    <div className="p-4 text-white">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h2 className="mb-1 fw-bold">
                                    <i className="bi bi-box-seam me-2"></i>
                                    Cadastro de Material
                                </h2>
                                <p className="mb-0 opacity-75">
                                    Gerencie seus materiais e estoque
                                </p>
                            </div>
                            <Badge 
                                bg="light" 
                                text="dark" 
                                className="px-3 py-2"
                                style={{ fontSize: '0.9rem', borderRadius: '10px' }}
                            >
                                📦 Novo
                            </Badge>
                        </div>
                    </div>

                    {/* Corpo do Formulário */}
                    <Card.Body className="bg-white p-4" style={{ borderRadius: '0 0 20px 20px' }}>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Row className="g-4">
                                {/* Nome do Material */}
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="fw-semibold text-muted small mb-2">
                                            <i className="bi bi-tag-fill me-2 text-primary"></i>
                                            NOME DO MATERIAL
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nomeMaterial"
                                            value={material.nomeMaterial || ''}
                                            onChange={handleChange}
                                            placeholder="Ex: Farinha de Trigo Premium"
                                            className="border-2 py-2"
                                            style={{ 
                                                borderRadius: '12px',
                                                fontSize: '1rem'
                                            }}
                                            required
                                        />
                                    </Form.Group>
                                </Col>


                                {/* Tipo de Medida */}
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="fw-semibold text-muted small mb-2">
                                            <i className="bi bi-rulers me-2 text-success"></i>
                                            UNIDADE DE MEDIDA
                                        </Form.Label>
                                        <Form.Select
                                            name="tipoMedida"
                                            value={material.tipoMedida || ''}
                                            onChange={handleChange}
                                            className="border-2 py-2"
                                            style={{ 
                                                borderRadius: '12px',
                                                fontSize: '1rem'
                                            }}
                                            required
                                        >
                                            <option value="">Selecione a unidade...</option>
                                            <option value="KG">⚖️ Quilograma (KG)</option>
                                            <option value="G">⚖️ Grama (G)</option>
                                            <option value="L">🧪 Litro (L)</option>
                                            <option value="ML">🧪 Mililitro (ML)</option>
                                            <option value="UN">📦 Unidade (UN)</option>
                                            <option value="CX">📦 Caixa (CX)</option>
                                            <option value="PCT">📦 Pacote (PCT)</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                {/* Quantidade por Unidade */}
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="fw-semibold text-muted small mb-2">
                                            <i className="bi bi-calculator-fill me-2 text-info"></i>
                                            QTD. POR UNIDADE
                                        </Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type="number"
                                                name="qtdPorUnidade"
                                                value={material.qtdPorUnidade || ''}
                                                onChange={handleChange}
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                className="border-2 py-2"
                                                style={{ 
                                                    borderRadius: '12px',
                                                    fontSize: '1rem',
                                                    paddingRight: '3rem'
                                                }}
                                                required
                                            />
                                            <span 
                                                className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                                                style={{ fontSize: '0.9rem' }}
                                            >
                                                {material.tipoMedida || 'UN'}
                                            </span>
                                        </div>
                                    </Form.Group>
                                </Col>

                                {/* Preço Pago */}
                                <Col md={4}>
                                    <Form.Group>
                                        <Form.Label className="fw-semibold text-muted small mb-2">
                                            <i className="bi bi-currency-dollar me-2 text-danger"></i>
                                            PREÇO PAGO
                                        </Form.Label>
                                        <CurrencyInput
                                            className="form-control border-2 py-2"
                                            name="precoPago"
                                            prefix="R$ "
                                            decimalsLimit={2}
                                            decimalSeparator=","
                                            groupSeparator="."
                                            value={material.precoPago || ''}
                                            onValueChange={(value) => {
                                                console.log("Valor recebido:", value);
                                                setMaterial({...material, precoPago: value})
                                            }}
                                            placeholder="R$ 0,00"
                                            style={{ 
                                                borderRadius: '12px',
                                                fontSize: '1rem'
                                            }}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Botões de Ação */}
                            <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                                <Button 
                                    variant="light" 
                                    type="button"
                                    onClick={handleLimpar}
                                    className="px-4 py-2 fw-semibold"
                                    style={{ 
                                        borderRadius: '12px',
                                        border: '2px solid #e9ecef'
                                    }}
                                >
                                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                                    Limpar
                                </Button>
                                <Button 
                                    type="submit"
                                    className="px-5 py-2 fw-semibold border-0"
                                    style={{ 
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                    }}
                                >
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    Salvar Material
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>

            {/* Listagem de Materiais */}
            <ListarMateriais 
                handleLimpar={handleLimpar}
                setAtualizar={setAtualizar}
                atualizar={atualizar}
                setMaterialBuscado={setMaterialBuscado}
            />

            {/* Adicione Bootstrap Icons no seu HTML */}
            <style>{`
                @import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css');
                
                .form-control:focus,
                .form-select:focus {
                    border-color: #667eea !important;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
                }
                
                .form-control,
                .form-select {
                    transition: all 0.3s ease;
                }
                
                .form-control:hover,
                .form-select:hover {
                    border-color: #667eea;
                }
            `}</style>
        </>
    );
};

export default FormularioMaterial;