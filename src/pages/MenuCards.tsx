import { Box, Grid, Typography } from "@mui/material";
import menuItems from "../seed/MenuItems";

const MenuCards = () => {
  console.log(menuItems);

  return (
    <Box
      sx={{
        backgroundImage: "url(src/assets/font-page.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Grid container spacing={2}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#ffffff",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 5,
                  rowGap: 1,
                  "&:hover": {
                    bgcolor: "#F77F00",
                    color: "#ffffff",
                  },
                }}
              >
                <img
                  src={item.logo}
                  alt={item.food}
                  style={{ width: "100%" }}
                />
                <Typography variant="h3">{item.food}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MenuCards;
