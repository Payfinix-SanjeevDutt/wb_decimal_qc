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
    const [showReadingInput, setShowReadingInput] = useState(false);
    const [readingValue, setReadingValue] = useState("");

    const handleDecimalUpdate = async (value, e) => {
        e.stopPropagation();

        if (value) {
            // Show reading input if 'Yes' selected
            setShowReadingInput(true);
        } else {
            // If 'No' selected, update immediately without reading input
            try {
                await axios.patch(`/reading-ds/${record.id}/decimal`, {
                    meter_has_decimal: false,
                });
                alert(`Marked as not decimal.`);
                if (onUpdate) onUpdate();
            } catch (error) {
                console.error("Update failed", error);
                alert("Error updating decimal status.");
            }
        }
    };

    const submitReading = async () => {
        if (!readingValue) {
            alert("Please enter a reading.");
            return;
        }

        try {
            await axios.patch(`/reading-ds/${record.id}/decimal`, {
                meter_has_decimal: true,
                prev_reading: readingValue,
            });
            alert("Reading submitted and marked as decimal.");
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Update failed", error);
            alert("Error submitting reading.");
        }
    };

    return (
        <Card
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
                        Consumer ID: {record.consumer_number}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Is this a decimal image?
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={(e) => handleDecimalUpdate(true, e)}
                        >
                            Yes
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={(e) => handleDecimalUpdate(false, e)}
                        >
                            No
                        </Button>
                    </Stack>

                    {showReadingInput && (
                        <Stack spacing={1} mt={2}>
                            <TextField
                                label="Enter Reading"
                                variant="outlined"
                                size="small"
                                value={readingValue}
                                onChange={(e) => setReadingValue(e.target.value)}
                            />
                            <Button variant="contained" onClick={submitReading}>
                                Submit Reading
                            </Button>
                        </Stack>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default MeterCard;





// import React from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     CardMedia,
//     CardActionArea,
//     Button,
//     Stack,
// } from "@mui/material";
// import axios from "../api/axios";

// const MeterCard = ({ record, onClick, onUpdate }) => {
//     const handleDecimalUpdate = async (value, e) => {
//         e.stopPropagation();
//         try {
//             await axios.patch(`/reading-ds/${record.id}/decimal`, {
//                 meter_has_decimal: value,
//             });
//             alert(`Marked as ${value ? "decimal" : "not decimal"}.`);

//             // Optional callback to refresh the parent view
//             if (onUpdate) onUpdate();
//         } catch (error) {
//             console.error("Update failed", error);
//             alert("Error updating decimal status.");
//         }
//     };

//     return (
//         <Card
//             // onClick={onClick}
//             sx={{
//                 cursor: "pointer",
//                 maxWidth: 350,
//                 height: "100%",
//                 borderRadius: 3,
//                 boxShadow: 3,
//                 transition: "0.3s",
//                 "&:hover": {
//                     boxShadow: 6,
//                     transform: "translateY(-4px)",
//                 },
//                 m: 2,
//             }}
//         >
//             <CardActionArea>
//                 <CardMedia
//                     component="img"
//                     height="300"
//                     image={record.image_url}
//                     alt="Meter"
//                 />
//                 <CardContent sx={{ px: 2, py: 1.5 }}>
//                     <Typography variant="body1" gutterBottom>
//                         Consumer ID: {record.consumer_number}
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Is this a decimal image?
//                     </Typography>

//                     <Stack direction="row" alignItems="center" spacing={2} mt={1}>
//                         <Button
//                             variant="contained"
//                             color="success"
//                             size="small"
//                             onClick={(e) => handleDecimalUpdate(true, e)}
//                         >
//                             Yes
//                         </Button>

//                         <Button
//                             variant="contained"
//                             color="error"
//                             size="small"
//                             onClick={(e) => handleDecimalUpdate(false, e)}
//                         >
//                             No
//                         </Button>
//                     </Stack>
//                 </CardContent>
//             </CardActionArea>
//         </Card>
//     );
// };

// export default MeterCard;



