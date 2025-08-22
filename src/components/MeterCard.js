import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import axios from "../api/axios";

const MeterCard = ({ record, onClick, onUpdate }) => {
  const [isGhost, setIsGhost] = useState(record.meter_ghost || false);

  const handleGhostUpdate = async (e) => {
    e.stopPropagation();

    try {
      await axios.patch(`/reading-ds/${record.id}/ghost`, {
        meter_ghost: true,
      });
      setIsGhost(true); // Disable the button after update
      if (onUpdate) onUpdate(record.id, "ghost");
    } catch (error) {
      console.error("Ghost update failed", error);
    }
  };

  const handleDecimalUpdate = async (value, e) => {
    e.stopPropagation();

    try {
      await axios.patch(`/reading-ds/${record.id}/decimal`, {
        meter_has_decimal: value,
      });
      if (onUpdate) onUpdate(record.id, "decimal");
    } catch (error) {
      console.error("Decimal update failed", error);
    }
  };

  return (
    <Card
      sx={{
        cursor: record.disabled ? "not-allowed" : "pointer",
        maxWidth: 350,
        height: "100%",
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: record.disabled ? 3 : 6,
          transform: record.disabled ? "none" : "translateY(-4px)",
        },
        opacity: record.disabled ? 0.5 : 1,
        pointerEvents: record.disabled ? "none" : "auto",
        m: 2,
      }}
    >
      <CardActionArea disabled={record.disabled}>
        <CardMedia
          component="img"
          height="300"
          image={record.image_url}
          alt="Meter"
        />
        <CardContent sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body1" gutterBottom>
            Consumer ID: {record.consumer_number}
          </Typography>
          <Typography variant="body1" gutterBottom>
            IS This Ghost and Decimal image?
          </Typography>

          <Stack direction="row" alignItems="center" spacing={2} mt={1}>
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={(e) => handleGhostUpdate(e)}
              disabled={isGhost || record.disabled}
            >
              Ghost
            </Button>

            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e) => handleDecimalUpdate(true, e)}
              disabled={record.disabled}
            >
              Yes
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={(e) => handleDecimalUpdate(false, e)}
              disabled={record.disabled}
            >
              No
            </Button>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MeterCard;
