import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import CriarTarefa from "./CriarTarefa";
import EditarTarefa from "./EditarTarefa";

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefaSelecionada, setTarefaSelecionada] = useState({});
  const [dadosCarregados, setDadosCarregados] = useState(false);

  useEffect(() => {
    if (!dadosCarregados) {
      fetch("http://localhost:5000/tarefas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Erro ao obter tarefas");
          }
          return resp.json();
        })
        .then((data) => {
          setTarefas(data);
          setDadosCarregados(true);
        })
        .catch((err) => console.error(err));
    }
  }, [dadosCarregados]);

  //Troquei o nome da constante para algo mais direto a sua responsabilidade
  const handleAbrirMenuEditar = (id) => {
    const tarefaParaEditar = tarefas.find((obj) => obj.id === id);
    setTarefaSelecionada(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas((current) => current.filter((tarefa) => tarefa.id !== id));
  };

  //Transferi a responsabilidade de atualizar a lista de tarefas a pagina de Listar
  //assim a lista vai ser atualizada imediatamente.
  //O mesmo não ocorreria se o setTarefas fosse chamado da tela de editar
  const handleEditar = (tarefa) => {
    fetch(`http://localhost:5000/tarefas/${tarefa.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tarefa),
    })
      .then((response) => response.json())
      .then((tarefaAtualizada) => {     
        //Removida a call pra setTarefas   
        //Ao inves disso vamos informar ao effect q os dados estão desatualizados
        setDadosCarregados(false);                
      });    
  };

  return (
    <>
      <Card>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.idTarefa}
                      </TableCell>
                      <TableCell>{row.tituloTarefa}</TableCell>
                      <TableCell align="right">{row.descricaoTarefa}</TableCell>
                      <TableCell align="right">{row.inicioTarefa}</TableCell>
                      <TableCell align="right">{row.fimTarefa}</TableCell>
                      <TableCell align="right">{row.statusTarefa}</TableCell>
                      <TableCell align="right">{row.recursoTarefa}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleAbrirMenuEditar(row.id)}
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeletar(row.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            to="/criar-tarefa"
            size="small"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Criar Tarefa
          </Button>
          <Button size="small" variant="outlined">
            Cancelar
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CriarTarefa
          handleClose={() => setOpen(false)}
          tarefas={tarefas}
          setTarefas={setTarefas}
        />
      </Modal>

      <Modal
        open={openEditar}
        onClose={() => setOpenEditar(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >        
        {/* EditarTarefa é um modal e não uma nova tela, com nota rota URL.
            Pode-se passar todo o objeto tarefa sem precisar passar o ID e carregar ele
            em EditarTarefa
        */}
        <EditarTarefa
          handleEditar={handleEditar}
          handleCloseEditar={() => setOpenEditar(false)}
          tarefaSelecionada={tarefaSelecionada}          
          setTarefas={setTarefas}
        />
      </Modal>
    </>
  );
};

export default ListarTarefa;
