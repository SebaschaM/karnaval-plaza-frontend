import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Card,
  CardContent,
  Button,
  TextField, // Importa TextField de Material-UI
} from "@mui/material";
import useClient from "../hooks/useClient";
import * as XLSX from "xlsx";
import theme from "../../theme";

const headers = [
  { id: "id", label: "ID" },
  { id: "nombre", label: "Nombre" },
  { id: "correo", label: "Correo" },
  { id: "fecha_nacimiento", label: "Fecha de nacimiento" },
];

const indicatorCards = [
  { title: "Clientes Activos", value: 100, color: "#2196f3" },
  { title: "Ingresos Mensuales", value: "$10,000", color: "#ff9800" },
  { title: "Clientes Nuevos", value: 20, color: "#4caf50" },
  { title: "Ingresos Anuales", value: "$120,000", color: "#ff5722" },
];

const CustomerTable = () => {
  const { getPersonalInformation } = useClient();
  const [dataClient, setDataClient] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState(""); // Nuevo estado para la consulta de búsqueda

  const onGetPersonalInformation = async () => {
    const response = await getPersonalInformation();
    if (response && response.data) {
      const formattedData = response.data.map((client: any) => {
        if (client.fecha_nacimiento) {
          client.fecha_nacimiento = formatDate(client.fecha_nacimiento);
        }
        return client;
      });
      setDataClient(formattedData);
    }
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${String(day).padStart(2, "0")}/${String(month).padStart(
      2,
      "0"
    )}/${year}`;
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataClient);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");
    XLSX.writeFile(workbook, "clientes.xlsx");
  };

  useEffect(() => {
    onGetPersonalInformation();
  }, []);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para filtrar los clientes basados en la consulta de búsqueda
  const filterClients = (client: any) => {
    return (
      client.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.correo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h3">Clientes</Typography>
          <Box>
            <Button
              variant="contained"
              onClick={handleExportToExcel}
              color="success"
              sx={{
                bgcolor: "green",
                color: "white",
                fontWeight: "bold",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.8rem",
                },
              }}
            >
              Exportar a Excel
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: "2rem" }}>
        <Grid container spacing={3}>
          {/* Tarjetas de dashboard */}
          {indicatorCards.map((card) => (
            <Grid item key={card.title} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  backgroundColor: card.color,
                  color: "white",
                  textAlign: "center",
                  cursor: "pointer",
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    rowGap: "0.6rem",
                  }}
                >
                  <Typography variant="h4" fontWeight={"bold"}>
                    {card.title}
                  </Typography>
                  <Typography variant="h3">{card.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Campo de búsqueda */}
        <TextField
          label="Buscar cliente"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginTop: "1rem",
            width: "20%",
            [theme.breakpoints.down("md")]: {
              width: "50%",
            },
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          }}
        />

        {/* Tabla de clientes */}
        <TableContainer
          component={Paper}
          sx={{
            marginTop: "2rem",
            height: "calc(100vh - 325px)", // Ajustar la altura para dejar espacio para las tarjetas y la barra de navegación
            overflowY: "auto", // Agregar desplazamiento vertical
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="Tabla con paginación">
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header.id}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      borderBottom: "2px solid #ccc",
                      boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                      padding: "0.75rem",
                      textAlign: "center",
                      width: header.id === "id" ? "10%" : "auto", // Ajustar el ancho de la columna "ID"
                    }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataClient
                .filter(filterClients) // Aplicar filtro
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    {headers.map((header) => (
                      <TableCell key={header.id} sx={{ textAlign: "center" }}>
                        {row[header.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <Box sx={{ marginTop: "1rem", textAlign: "center" }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={dataClient.filter(filterClients).length} // Actualizar la cantidad de filas según los resultados filtrados
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Registros por página:"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerTable;
