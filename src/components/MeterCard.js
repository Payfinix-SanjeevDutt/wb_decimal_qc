import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    CardActionArea,
    Button,
    Stack,
} from "@mui/material";

const MeterCard = ({ record, onClick }) => (
    <Card
        // onClick={onClick}
        sx={{
            cursor: "pointer",
            maxWidth: 350,
            height: "100%",
            borderRadius: 3,
            boxShadow: 3,
            transition: "0.3s",
            "&:hover": {
                boxShadow: 6,
                transform: "translateY(-4px)",
            },
            m: 2,
        }}
    >
        <CardActionArea>
            <CardMedia
                component="img"
                height="300"
                image={record.image_url}
                alt="Meter"
            />
            <CardContent sx={{ px: 2, py: 1.5 }}>
                <Typography variant="body1" gutterBottom>
                    Consumer ID: {record.consumer_id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Is this a decimal image?
                </Typography>

                <Stack direction="row" alignItems={"center"} spacing={2} mt={1}>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("YES clicked for", record);
                        }}
                    >
                        Yes
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("NO clicked for", record);
                        }}
                    >
                        No
                    </Button>
                </Stack>

                {/* <Typography variant="body1" color="text.secondary">
          Meter Reading: {record.meter_reading}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Billing Month: {record.billing_month}
        </Typography> */}
            </CardContent>
        </CardActionArea>
    </Card>
);

export default MeterCard;
