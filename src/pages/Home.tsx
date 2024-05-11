import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  FormControl,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import theme from "../../theme";
import useClient from "../hooks/useClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { addPersonalInformation } = useClient();
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (!privacyPolicyAccepted) {
        toast.error("Debes aceptar las políticas de privacidad", {
          autoClose: 1600,
        });
        return;
      }
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
        height: "100%",
        minHeight: "100vh",
        padding: { xs: "0.95rem", sm: "3rem" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          backgroundImage:
            "url(https://plazakarnaval.devioz.com/imgs/font-page.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          position: "absolute",
          opacity: 0.5,
          zIndex: -1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
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
          src="https://plazakarnaval.devioz.com/imgs/logo_plaza_karnaval.png"
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
              label="Nombre completo"
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
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={privacyPolicyAccepted}
                  onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                  color="primary"
                />
              }
              label="Acepto las políticas de privacidad"
            />
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
