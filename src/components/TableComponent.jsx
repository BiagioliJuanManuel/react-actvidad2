import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { Box, TextField, Button } from "@mui/material"
import Divider from '@mui/material/Divider';

export default function TableComponent() {

    const mockData = [
        { id: 1, nombre: "Auriculares Inalámbricos", precio: 120, categoria: "Electrónica" },
        { id: 2, nombre: "Silla de Escritorio", precio: 300, categoria: "Muebles" },
        { id: 3, nombre: "Cafetera Espresso", precio: 250, categoria: "Electrodomésticos" },
        { id: 4, nombre: "Juego de Mesa - Monopoly", precio: 50, categoria: "Juguetes" },
        { id: 5, nombre: "Libro de Programación en JavaScript", precio: 35, categoria: "Libros" }
    ];

    const [loading,setLoading] = useState(true);
    const [mock,setMock] = useState(null);

    useEffect(()=>{
        const timer = setTimeout(()=>{
          if(mockData.length > 0 ){
             setMock(mockData);
          }
            setLoading(false);
        }, 1000);
        return ()=> clearTimeout(timer)
    },[]);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newId = mock.length > 0 ? mock[mock.length - 1].id + 1 : 1;

    const productToAdd = {
      id: newId,
      nombre: e.target.nombre.value,
      precio: parseFloat(e.target.precio.value),
      categoria: e.target.categoria.value,
    };

    setMock((prev) => [...prev, productToAdd]);
    e.target.reset(); 
  };



    if(loading){
        return <CircularProgress/>
    }

  return (
    <>
    <Paper elevation={6} sx={{padding: 2}}>
      
    <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          my: 4,
          margin: 2
        }}
      >
      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
                <TableCell>Nombre:</TableCell>
                <TableCell>Precio:</TableCell>
                <TableCell>Categoría:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mock?.map(({id, nombre, precio, categoria})=>(
                <TableRow key={id}>
                    <TableCell>{nombre}</TableCell>
                    <TableCell>{precio}</TableCell>
                    <TableCell>{categoria}</TableCell>
                </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>
      </Box>

      <Divider sx={{margin: 4}} />     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          my: 4,
          margin: 2
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2 }} >
            <TextField
              label="Nombre"
              name="nombre"
              variant="outlined"
              required
              />
            <TextField
              label="Precio"
              name="precio"
              type="number"
              variant="outlined"
              required
              />
            <TextField
              label="Categoría"
              name="categoria"
              variant="outlined"
              required
              />
            <Button type="submit" variant="contained">
              Agregar Producto
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
    </>
  );
}
