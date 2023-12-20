// Navbar.jsx
import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export function Navbar({ setProducts }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        
        p: 4,
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getFormValues = (form) => {
        form.preventDefault();

        const formData = new FormData(form.target);
        const formProps = Object.fromEntries(formData);
        formProps.img = URL.createObjectURL(form.target.img.files[0]);

        setProducts((prevProducts) => {
            localStorage.setItem('data', JSON.stringify([formProps, ...prevProducts]));
            return [formProps, ...prevProducts];
        });

        form.target.reset();
        handleClose();
    };

    return (
        <nav>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            News
                        </Typography>
                        <Button color="inherit"><AddShoppingCartIcon /></Button>
                        <Button onClick={handleOpen} color="inherit">Admin Panel</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form
                        onSubmit={(e) => getFormValues(e)}
                        sx={{
                            '& > :not(style)': { m: 1, width: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <p>Add product</p>
                        <TextField
                            id="outlined-controlled"
                            name="img"
                            type="file"
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            label="add description"
                            name="description"
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            label="add price"
                            name="price"
                        />
                        <TextField
                            id="outlined-uncontrolled"
                            label="add discount"
                            name="discount"
                        />
                        <Button type="submit">Send</Button>
                        <button type="reset" hidden></button>
                    </form>
                </Box>
            </Modal>
        </nav>
    );
}
