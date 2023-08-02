import "./spinnerStyle.css";
const SpinnerCustom = () => {
  return (
    <>
    <div className="container_spinner">
      <div className="spinner">
        <div className="spinnerin"> </div>
      </div> 
    </div><br />
    <p className="text_spinner">Cargando mercado pago ... </p>
    </>
  );
};

export default SpinnerCustom;
