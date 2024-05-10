import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { useForm } from "react-hook-form";
import theme from "../../theme";
import useClient from "../hooks/useClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { addPersonalInformation } = useClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const { ok, message, response } = await addPersonalInformation(data);
      console.log(response);
      if (ok) {
        toast.success(message, {
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/cart-menu");
        }, 1500);
        return;
      }
      toast.error(response.message, {
        autoClose: 1600,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100%", // El contenedor debería ser lo suficientemente alto para incluir el contenido
        minHeight: "100vh", // Asegúrate de que tenga al menos la altura de la ventana de visualización
        padding: { xs: "0.95rem", sm: "3rem" },
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
      <Card
        sx={{
          display: "flex",
          opacity: 0.97,
          marginTop: "5rem",
          flexDirection: "column",
          p: 4,
          width: "30rem",
          bgcolor: "#ffffff",
          boxShadow: 5,
          borderRadius: 2,
          rowGap: 3,
          [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginTop: "0",
          },
        }}
      >
        <img
          style={{
            width: "15rem",
            height: "5rem",
            margin: "1rem auto",
          }}
          src="https://plazakarnaval.devioz.com/imgs/logo-karnaval.png"
          alt="Logo"
        />
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          color="black"
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.1rem",
            },
          }}
        >
          Únete a Nuestra Comunidad y Disfruta de Beneficios Especiales
        </Typography>
        <FormControl
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Box>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              {...register("name", { required: true })}
            />
            {errors.name && (
              <Typography sx={{ color: "red" }}>
                Este campo es requerido
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Correo inválido",
                },
              })}
            />
            {errors.email && (
              <Typography sx={{ color: "red" }}>
                Este campo es requerido
              </Typography>
            )}
          </Box>
          <Box>
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              fullWidth
              {...register("birthday", { required: true })}
            />
            {errors.date && (
              <Typography sx={{ color: "red" }}>
                Este campo es requerido
              </Typography>
            )}
          </Box>
          <Box display={"flex"} flexDirection={"column"} rowGap={1}>
            <Button
              sx={{ color: "white", fontWeight: "bold" }}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Enviar
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate("/cart-menu")}
            >
              Omitir
            </Button>
          </Box>
        </FormControl>
      </Card>
      <ToastContainer />
    </Box>
  );
};

export default Home;
