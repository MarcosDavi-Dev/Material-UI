import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";


//Adicionada utilização da função React.forwardRef para correta utilização do @Mui/material/Modal
//referencia: https://mui.com/material-ui/guides/composition/#caveat-with-refs
const EditarTarefa = React.forwardRef(({tarefaSelecionada, handleEditar, handleCloseEditar}, ref) => 
{
  
  const [tarefa, setTarefa] = useState({
    ...tarefaSelecionada
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTarefa((prevTarefa) => ({
      ...prevTarefa,
      [name]: value,
    }));
  };

  const handleRecursoChange = (event) => {
    setTarefa((prevTarefa) => ({
      ...prevTarefa,
      recursoTarefa: event.target.value,
    }));
  };

  const handleStatusChange = (event) => {
    setTarefa((prevTarefa) => ({
      ...prevTarefa,
      statusTarefa: event.target.value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Tarefas" subheader="Edição de Tarefas" />
        <CardContent sx={{ width: "95%", maxWidth: "100%" }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                name="tituloTarefa"
                id="tarefa_titulo"
                aria-describedby="tarefa_titulo_helper_text"
                value={tarefa.tituloTarefa}
                onChange={handleInputChange}
              />
              <FormHelperText id="tarefa_titulo_helper_text">
                Título da Tarefa.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input
                name="descricaoTarefa"
                id="tarefa_descricao"
                aria-describedby="tarefa_descricao_helper_text"
                value={tarefa.descricaoTarefa}
                onChange={handleInputChange}
              />
              <FormHelperText id="tarefa_descricao_helper_text">
                Descrição da Tarefa.
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <FormControl>
                <Input
                  name="inicioTarefa"
                  id="tarefa_inicio"
                  type="date"
                  aria-describedby="tarefa_inicio_helper_text"
                  value={tarefa.inicioTarefa}
                  onChange={handleInputChange}
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 400,
                    paddingLeft: "13px",
                  }}
                />
                <FormHelperText id="tarefa_inicio_helper_text">
                  Início da Tarefa.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <Input
                  name="fimTarefa"
                  id="tarefa_fim"
                  type="date"
                  aria-describedby="tarefa_fim_helper_text"
                  value={tarefa.fimTarefa}
                  onChange={handleInputChange}
                  sx={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontWeight: 400,
                    paddingLeft: "13px",
                  }}
                />
                <FormHelperText id="tarefa_fim_helper_text">
                  Fim da Tarefa.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                
                <Select
                  id="tarefa_recurso"
                  name="recursoTarefa"
                  value={tarefa.recursoTarefa}
                  label="Recurso"
                  onChange={handleRecursoChange}
                  size="small"
                  sx={{ color: "rgba(0, 0, 0, 0.6)", fontWeight: 400 }}
                >
                  <MenuItem value={"Recurso 1"}>Recurso 1</MenuItem>
                  <MenuItem value={"Recurso 2"}>Recurso 2</MenuItem>
                  <MenuItem value={"Recurso 3"}>Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Status</InputLabel>              
                <Select
                  id="tarefa_status"
                  name="statusTarefa"
                  value={tarefa.statusTarefa}
                  label="Status"
                  onChange={handleStatusChange}
                  size="small"
                  sx={{ color: "rgba(0, 0, 0, 0.6)", fontWeight: 400 }}
                >
                  <MenuItem value={"Aguardando"}>Aguardando</MenuItem>
                  <MenuItem value={"Em Andamento"}>Em Andamento</MenuItem>
                  <MenuItem value={"Concluída"}>Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={2} pl={2} mt={2}>
              <Grid item xs={1}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleEditar(tarefa)}
                >
                  Salvar
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleCloseEditar}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  p: 4,
};

export default EditarTarefa;
