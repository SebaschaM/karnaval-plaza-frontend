import { Box, Card, Grid, Typography } from "@mui/material";
import menuItems from "../seed/MenuItems";
import CardItem from "../components/CardItem";

const MenuCards = () => {
  return (
    <Box
      sx={{
        height: "100%", // El contenedor debería ser lo suficientemente alto para incluir el contenido
        minHeight: "100vh", // Asegúrate de que tenga al menos la altura de la ventana de visualización
        padding: { xs: "1.5rem", sm: "3rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative", // Asegúrate de que el contenido esté en relación con la imagen de fondo
      }}
    >
      <Box
        sx={{
          backgroundImage:
            "url(https://plazakarnaval.devioz.com/imgs/font-page.jpg)",
          backgroundSize: "cover", // Asegúrate de que ocupe todo el espacio
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed", // La imagen se mantendrá fija
          position: "absolute",
          opacity: 0.5,
          zIndex: -1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%", // Asegúrate de que la imagen ocupe todo el espacio del contenedor
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      />

      <Box
        sx={{
          maxWidth: "75rem",
          width: "100%",
          textAlign: "center",
          zIndex: 1, // Asegúrate de que el contenido esté por encima de la imagen de fondo
        }}
      >
        <Typography
          variant="h3"
          color="white"
          fontWeight="bold"
          fontSize="3rem"
          sx={{ marginBottom: "2rem" }}
        >
          Nuestra carta de platos
        </Typography>

        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          {menuItems.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
              <CardItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MenuCards;
