import { Typography } from "@mui/material"

const styles={
    nameProd: {
        textTransform: "uppercase",
        fontWeight: "bold",
        lineHeight: "25px",
        letterSpacing: 1,
      },
      price: {
        color: "#000",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "25px",
        opacity: 0.5,
      },
}

const SummaryPay = ({cart, total}) => {
    console.log(cart)

  return (
    <div>
        SUMMARY
        { 
            cart.map((item)=>(
                <div key={item.id}>
                    <img
                            src={item.image}
                            width={50}
                            height={50}
                            style={{ borderRadius: "8px" }}
                        />

                    <div>
                        <Typography variant="body1" sx={styles.nameProd}>
                            { item.slug2}
                        </Typography>
                        <Typography variant="body2" sx={styles.price}>
                            ${item.price}
                        </Typography>
                    </div>
                    <div>
                        <Typography>x{item.quantity}</Typography>
                    </div>
                </div>
                ))
        }

        <div>
            <Typography>Total: {total}</Typography>
            <Typography>Shipping: {(total*0.15)}</Typography>
            <Typography>VAT(included): {(total*0.21)}</Typography>
            <Typography>GRAND TOTAL: {(total*0.21)+(total*0.15)+total}</Typography>
        </div>
     

    </div>
  )
}

export default SummaryPay