// Main.jsx
import React, { useState } from 'react';
import { Navbar } from '../Navbar/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Main() {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('data')) || []);
    const stripe = useStripe();
    const elements = useElements();

    const handleStripePayment = async () => {
        if (!stripe || !elements) {
            console.error('Stripe or Elements components not yet loaded');
            return;
        }

        const { token, error } = await stripe.createToken(elements.getElement(CardElement));

        if (error) {
            console.error(error);
        } else {
            console.log(token);
        }
    };

    const handleBayClick = () => {
        const stripeCheckoutUrl = 'https://dashboard.stripe.com/register/checkout';
        window.open(stripeCheckoutUrl, '_blank');
    };
    return (
        <div className='main'>
            <Navbar setProducts={setProducts} />

            <main id='main'>
                {products?.map((item, index) => (
                    <Card key={index} sx={{ maxWidth: 545 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.img}
                                alt="green iguana"
                                sx={{ minWidth: 300, width: '100%' }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.price}
                                    <s> {item.discount}</s>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions id='CardActions'>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleStripePayment}
                            >
                                <AddShoppingCartIcon /> add basket
                            </Button>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleBayClick}
                            >
                                Bay
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </main>
        </div>
    );
}
