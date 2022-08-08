import React from "react";

import axios from "axios";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
    const priceForstripe = price * 100;
    const publishableKey = 'pk_test_51KWJVESJATkWAz1BNwkKHuCnoZ9xLHlWwfucxpzQ8kjiCkWVbjj050t3wy2nupttqkzoppLzmoFg88NZSu2Ony6S00g1IwuVVg'

    const onToken = token => {
        axios({
            url: 'http://localhost:5000/payment',
            method: 'post',
            data: {
                amount: priceForstripe,
                token
            }
        }).then((response) => {
            alert('Payment successful')
        }).catch(error =>
            console.log('Payment error: ', (error.response.data)))
        alert(
            'Payment failed, Please try again later'
        )
    }

    return (
        <StripeCheckout
            label="Pay Now"
            name="Crown Clothing Ltd."
            billingAddress
            shippingAddress
            image="https://res.cloudinary.com/dpg6l4x4g/image/upload/v1658988502/5.2_favicon_yrk5av.ico"
            description={`Your total is $${price}`}
            amount={priceForstripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton