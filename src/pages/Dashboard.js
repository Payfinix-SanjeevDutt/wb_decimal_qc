import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MeterCard from "../components/MeterCard";
import MeterModal from "../components/MeterModal";
import { Grid, Container, Typography, Pagination, Box } from "@mui/material";

const Dashboard = () => {
    const [records, setRecords] = useState([]);
    const [selected, setSelected] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handleCardUpdate = (id) => {
        setRecords((prev) => prev.filter((rec) => rec.id !== id));
    };

    const fetchData = async (currentPage) => {
        try {
            const res = await axios.get(
                `/reading-ds?page=${currentPage}&per_page=12`
            );
            setRecords(res.data.data);
            setTotalPages(res.data.pages);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Container>
            <Typography
                variant="h4"
                mt={4}
                mb={2}
                sx={{
                    textAlign: "center",
                    fontFamily:
                        '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
                    fontWeight: 600,
                    letterSpacing: 0.5,
                }}
            >
                Powerhouse Image Records
            </Typography>

            <Grid container spacing={2}>
                {records.map((record) => (
                    <Grid item xs={12} sm={6} md={4} key={record.id}>
                        {/* <MeterCard
                            record={record}
                            onClick={() => setSelected(record)}
                            onUpdate={() => fetchData(page)}
                        /> */}
                        <MeterCard
                            record={record}
                            onClick={() => setSelected(record)}
                            onUpdate={handleCardUpdate}
                        />
                    </Grid>
                ))}
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            {selected && (
                <MeterModal
                    record={selected}
                    onClose={() => setSelected(null)}
                    onSubmitSuccess={() => {
                        setSelected(null);
                        fetchData(page); // Refresh data after update
                    }}
                />
            )}
        </Container>
    );
};

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "../api/axios";
// import MeterCard from "../components/MeterCard";
// import MeterModal from "../components/MeterModal";
// import { Grid, Container, Typography, Pagination, Box } from "@mui/material";

// const Dashboard = () => {
//     const [records, setRecords] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const fetchData = async (currentPage) => {
//         try {
//             const res = await axios.get(
//                 `/reading-ds?page=${currentPage}&per_page=12`
//             );
//             setRecords(res.data.data); // <-- backend returns objects now
//             setTotalPages(res.data.pages);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchData(page);
//     }, [page]);

//     const handlePageChange = (event, value) => {
//         setPage(value);
//     };

//     return (
//         <Container>
//             <Typography
//                 variant="h4"
//                 mt={4}
//                 mb={2}
//                 sx={{
//                     textAlign: "center",
//                     fontFamily:
//                         '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
//                     fontWeight: 600,
//                     letterSpacing: 0.5,
//                 }}
//             >
//                 ReadingDS Image Records
//             </Typography>
//             <br />

//             <Grid container spacing={2}>
//                 {records.map((record) => (
//                     <Grid item xs={12} sm={6} md={4} key={record.id}>
//                         <MeterCard
//                             record={record}
//                             onClick={() => setSelected(record)}
//                             onUpdate={() => fetchData(page)}
//                         />
//                     </Grid>
//                 ))}
//             </Grid>

//             {/* Pagination */}
//             <Box mt={4} display="flex" justifyContent="center">
//                 <Pagination
//                     count={totalPages}
//                     page={page}
//                     onChange={handlePageChange}
//                     color="primary"
//                 />
//             </Box>

//             {selected && (
//                 <MeterModal
//                     record={selected}
//                     onClose={() => setSelected(null)}
//                     onSubmitSuccess={() => {
//                         setSelected(null);
//                         fetchData(page);
//                     }}
//                 />
//             )}
//         </Container>
//     );
// };

// export default Dashboard;
