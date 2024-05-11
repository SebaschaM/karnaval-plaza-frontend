import { Card, Typography } from "@mui/material";

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
      onClick={() => window.open(item.urlCardMenu, "_blank")}
    >
      <img
        src={item.logo}
        alt={item.food}
        style={{
          width: "100%",
          height: "15rem",
          objectFit: "cover",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      />

      <Typography
        variant="h5"
        component="div"
        fontWeight={"bold"}
        fontSize={"1.3rem"}
        padding={"0.8rem 0"}
      >
        {item.food}
      </Typography>
      {/* <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography> */}
    </Card>
  );
};

export default CardItem;
