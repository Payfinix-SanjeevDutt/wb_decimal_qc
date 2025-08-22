import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MeterCard from "../components/MeterCard";
import MeterModal from "../components/MeterModal";
import {
  Grid,
  Container,
  Typography,
  Pagination,
  Box,
  Button,
} from "@mui/material";

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const handleCardUpdate = (id) => {
  //     setRecords((prev) => prev.filter((rec) => rec.id !== id));
  // };

  const handleCardUpdate = (id, type) => {
    if (type === "decimal") {
      // disable the card after Yes/No update
      setRecords((prev) =>
        prev.map((rec) => (rec.id === id ? { ...rec, disabled: true } : rec))
      );
    } else if (type === "ghost") {
      // Just update the meter_ghost value in place
      setRecords((prev) =>
        prev.map((rec) =>
          rec.id === id ? { ...rec, meter_ghost: !rec.meter_ghost } : rec
        )
      );
    }
  };

  const fetchData = async (currentPage) => {
    try {
      const res = await axios.get(
        `/reading-ds?page=${currentPage}&per_page=12`
      );
      //   setRecords(res.data.data);
      // add disabled flag based on meter_has_decimal
      const withDisabled = res.data.data.map((r) => ({
        ...r,
        disabled: r.meter_has_decimal !== null,
      }));
      setRecords(withDisabled);
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
          fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        QC Image Records
      </Typography>

      <Grid container spacing={2}>
        {records.map((record) => (
          <Grid item xs={12} sm={6} md={4} key={record.id}>
            <MeterCard
              record={record}
              onClick={() => {
                if (!record.disabled) setSelected(record);
              }}
              onUpdate={handleCardUpdate}
            />
          </Grid>
        ))}
      </Grid>

      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          overflowX: "auto", // 👈 scrollable
          whiteSpace: "nowrap",
          p: 1,
          gap: 0.5,
        }}
      >
        {/* << jump back 10 */}
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 40 }}
          disabled={page <= 10}
          onClick={() => setPage(Math.max(1, page - 10))}
        >
          {"<<"}
        </Button>

        {/* < prev */}
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 40 }}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          {"<"}
        </Button>

        {(() => {
          const windowSize = 5; // pages shown on each side of current
          const start = Math.max(1, page - windowSize);
          const end = Math.min(totalPages, page + windowSize);

          const items = [];

          // First page + leading ellipsis
          if (start > 1) {
            items.push(
              <Button
                key={1}
                variant={page === 1 ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: 40 }}
                onClick={() => setPage(1)}
              >
                1
              </Button>
            );
            if (start > 2) {
              items.push(
                <Typography
                  key="left-ellipsis"
                  variant="button"
                  sx={{ px: 0.5 }}
                >
                  …
                </Typography>
              );
            }
          }

          // Windowed page numbers
          for (let num = start; num <= end; num++) {
            items.push(
              <Button
                key={num}
                variant={page === num ? "contained" : "outlined"}
                color="primary"
                size="small"
                sx={{ minWidth: 40 }}
                onClick={() => setPage(num)}
              >
                {num}
              </Button>
            );
          }

          // Trailing ellipsis + last page
          if (end < totalPages) {
            if (end < totalPages - 1) {
              items.push(
                <Typography
                  key="right-ellipsis"
                  variant="button"
                  sx={{ px: 0.5 }}
                >
                  …
                </Typography>
              );
            }
            items.push(
              <Button
                key={totalPages}
                variant={page === totalPages ? "contained" : "outlined"}
                size="small"
                sx={{ minWidth: 40 }}
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </Button>
            );
          }

          return items;
        })()}

        {/* > next */}
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 40 }}
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </Button>

        {/* >> jump forward 10 */}
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: 40 }}
          disabled={page > totalPages - 10}
          onClick={() => setPage(Math.min(totalPages, page + 10))}
        >
          {">>"}
        </Button>
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
