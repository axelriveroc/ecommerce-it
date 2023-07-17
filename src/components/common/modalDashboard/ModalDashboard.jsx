import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	IconButton,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { db } from "../../../firebase/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "./ModalDashboardStyles.css";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { TextareaAutosize } from "@mui/base";

const ModalDashboard = ({
	open,
	data,
	handleClose,
	disabled,
	setChangesProducts,
}) => {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: { xs: 320, sm: 400 },
		bgcolor: "background.paper",
		border: "2px solid #000",
		boxShadow: 24,
		p: 4,
		backgroundImage: `url(${data.image})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		maxHeight: "95vh",
		overflowY: "auto",
	};

	const { handleChange, handleSubmit, values } = useFormik({
		initialValues: {
			// agrego los valores iniciales de mi formulario con las prop del prod que me llega x props.
			name: data.name,
			subname: data.subname,
			price: data.price,
			stock: data.stock,
			category: data.category,
			image: data.image,
			description: data.description,
			features: data.features,
      new: data.new
		},
		onSubmit: (dataForm) => {
			// los dataForm son los valores que se envian en el formulario
			let obj = {
				...dataForm,
				price: +dataForm.price,
			};

			handleClose();
			Swal.fire({
				title: "Editar este produto ?",
				text: "Una vez editado se actualiza con esta nueva informacion",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, modificarlo!",
			}).then((result) => {
				if (result.isConfirmed) {
					/* OJO 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 */
					/**
					 * MANIPULAR LA IMAGEN PARA GUARDARLA EN LA NUBE PRIMERO ANTES DE MANDARLA A LA DB
					 */

					let refDoc = doc(db, "products", data.id); // accedo al id del prod xq se lo pase como props
					updateDoc(refDoc, obj); // UPDATEDOC = PATCH --> le paso el product de mi DB y luego las prop que modifico
					setChangesProducts(true);

					Swal.fire(
						"Editado!",
						"Su producto ha sido editado con éxito",
						"success"
					);
				}
			});
		},
	});

	const [imagePreview, setImagePreview] = useState(data.image);

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setImagePreview(URL.createObjectURL(file)); // setea la imagen para que el usuario la vea en su navegador solamente
			values.image = file; // pero en mi formulario cargamos la ruta de la imagen propiamente dicha.
			// OJO deberiamos MANIPULAR PARA QUE LA IMAGEN SE GUARDE EN LA NUBE Y DE AHI MANDAR LA URL A LA DB.
		}
	};

  console.log(values.image)

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<form onSubmit={handleSubmit} className="formulario">
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h5"
								sx={{ textAlign: "center", fontWeight: "bold" }}
							>
								{disabled ? "VER PRODUCTO" : "EDITAR PRODUCTO"}
							</Typography>
							<IconButton onClick={handleClose} color="primary">
								<CancelIcon />
							</IconButton>
						</Box>
						<TextField
							name="name"
							label="Name"
							defaultValue={data.name}
							disabled={disabled}
							onChange={handleChange}
							sx={{
								boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
							}}
						/>
						<TextField
							name="subname"
							label="subname"
							defaultValue={data.subname}
							disabled={disabled}
							onChange={handleChange}
							sx={{
								boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
							}}
						/>
						<TextField
							name="price"
							label="Price"
							defaultValue={!disabled ? data.price : `$${data.price}`}
							disabled={disabled}
							onChange={handleChange}
							sx={{
								boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
							}}
						/>
						<TextField
							name="stock"
							label="Stock"
							defaultValue={data.stock}
							disabled={disabled}
							onChange={handleChange}
							sx={{
								boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
							}}
						/>

						{/*  TEXTAREA DESCRIPTION */}

						<textarea
							className="textArea"
							defaultValue={`DESCRIPCION: ${data.description}`}
							disabled={disabled}
							name="description"
							onChange={handleChange}

						/>

						{/* TEXTAREA FEATURES */}
						<TextareaAutosize
							placeholder="Features"
							className="textArea"
							defaultValue={`FEATURES: ${data.features}`}
							disabled={disabled}
							style={{ overflow: "auto", height: "auto" }}
							name="features"
							onChange={handleChange}

						/>

						<FormControlLabel
							sx={{
								minWidth: 120,
								boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
                ml:0,mr:0,p:.5,
							}}
							control={<Checkbox defaultChecked={ data.new ? true : false} />}
							label="New product"
              name="new"
							disabled={disabled}
							onChange={handleChange}


						/>

						{/* SELECT */}

						<Box
							sx={{
								minWidth: 120,
								boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
								backgroundColor: "rgba(255, 255, 255, 0.8)",
							}}
						>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									name="category"
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Age"
									value={disabled ? data.category : values.category}
									onChange={handleChange}
									sx={{
										boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
										backgroundColor: "transparent",
									}}
								>
									<MenuItem
										value="headphones"
										sx={{
											boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
											backgroundColor: "rgba(255, 255, 255, 0.8)",
										}}
									>
										Headphones
									</MenuItem>
									<MenuItem
										value="speakers"
										sx={{
											boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
											backgroundColor: "rgba(255, 255, 255, 0.8)",
										}}
									>
										Speakers
									</MenuItem>
									<MenuItem
										value="earphones"
										sx={{
											boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
											backgroundColor: "rgba(255, 255, 255, 0.8)",
										}}
									>
										Earphones
									</MenuItem>
								</Select>
							</FormControl>
						</Box>

						{/* IMAGEN */}
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								gap: 1,
							}}
						>
							<img
								src={imagePreview}
								width={100}
								height={100}
								className="fotoProduct"
							/>{" "}
							{/* solo muestra la url para mostrar al usuario cuando carga un nuevo archivo */}
							<input
								type="file"
								id="file-input"
								accept="image/*"
								name="image"
								//onChange={handleChange}
								onChange={handleImageChange}
								style={{ display: "none" }}
							/>
							{!disabled && (
								<label htmlFor="file-input">
									<Button variant="outlined" component="span">
										nueva foto
									</Button>
									<Typography variant="body2" component="span">
										{values.image ? "" : "Ningún archivo seleccionado"}
									</Typography>
								</label>
							)}
						</Box>
						<Box
							sx={{ display: "flex", gap: 0.5, justifyContent: "space-evenly" }}
						>
							{!disabled && (
								<>
									<Button type="submit" variant="contained" fullWidth>
										Enviar
									</Button>
								</>
							)}
						</Box>
					</form>
				</Box>
			</Modal>
		</div>
	);
};

export default ModalDashboard;
