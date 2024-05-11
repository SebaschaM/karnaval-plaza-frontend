import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CardItem = ({ item }: any) => {
  return (
    <Card
      sx={{
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: 5,
        height: "100%",
        transition: "transform 0.5s",
        "&:hover": {
          transform: "scale(1.05)",
          cursor: "pointer",
        },
      }}
    >
      <CardMedia sx={{ height: 140 }} image={item.logo} title={item.food} />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          fontWeight={"bold"}
          fontSize={"1.3rem"}
          marginBottom={"0.8rem"}
        >
          {item.food}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default CardItem;
