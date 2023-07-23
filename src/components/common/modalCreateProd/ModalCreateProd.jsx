import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

const ModalCreateProd = ({ open, handleClose }) => {
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
    maxHeight: "95vh",
    overflowY: "auto",
  };

  // IMG PPAL MANEJO CON CLOUDINARY
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ];

  const [imagePpal, setImagePpal] = useState("");

  // Primero carga el archivo que selecciona el usuario en el estado image para luego usarlo.
  const handleImageChange = (e) => {
    if (!allowedFileTypes.includes(e.target.files[0].type)) {
      setFieldError(
        "image",
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, jpeg, png, gif y svg."
      );
      setImagePpal("");
      console.error(
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, png, gif y svg."
      );
      return;
    } else {
      setImagePpal(e.target.files[0]); //setFieldValue --> no lo puedo setear xq todavia no es la url de la nube
      setFieldError("image", "");
    }
  };

  // Recien cuando hace click en subir imagen , ahi se sube a cloudinary.
  const handleImageUpload = async () => {
    try {
      if (!imagePpal) return;

      setFieldError("image", "");
      // formatea la informacion que va a enviar a cloudinary con el objeto formData
      const formData = new FormData();
      formData.append("file", imagePpal);
      formData.append("upload_preset", "r8lr9ctz");

      //envia la info a cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgur5apfu/image/upload",
        formData
      );

      //Aca lo que habria que hacer en realidad es setear el estado de formik de photoUrl
      //values.photoUrl = response.data.secure_url;
      setFieldValue("image", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    errors,
    setFieldError,
  } = useFormik({
    initialValues: {
      // agrego los valores iniciales de mi formulario con las prop del prod que me llega x props.
      name: "",
      subname: "",
      price: "",
      stock: "",
      category: "",
      image: "",
      description: "",
      features: "",
      new: false,
      gallery: "",
      includes: [{ item: "", quantity: 1 }],
    },
    onSubmit: (dataForm) => {
      // los dataForm son los valores que se envian en el formulario
      /* let obj = {
				...dataForm,
				price: +dataForm.price,
			}; */

      handleClose();
      Swal.fire({
        title: "Crear este produto ?",
        text: "Se agregara este producto !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Crearlo!",
      }).then((result) => {
        if (result.isConfirmed) {
          /* OJO 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 */
          /**
           * MANIPULAR LA IMAGEN PARA GUARDARLA EN LA NUBE PRIMERO ANTES DE MANDARLA A LA DB
           */

          console.log("producto creado: ", dataForm); // obj seria acá

          Swal.fire(
            "Creado!",
            "Su producto ha sido Creado con éxito",
            "success"
          );
        }
      });
    },
    validationSchema: Yup.object({
      includes: Yup.array()
        .of(
          Yup.object().shape({
            item: Yup.string().required(
              "El campo 'Item included' es obligatorio."
            ),
            quantity: Yup.number()
              .integer("La cantidad debe ser un número entero.")
              .min(1, "La cantidad no puede ser menor a 1.")
              .required("El campo 'Quantity' es obligatorio."),
          })
        )
        .required("El campo 'Includes' es obligatorio."), // Validación para asegurarse que el array 'includes' no esté vacío
    }),
  });

  // Obtener el último objeto "includes" agregado
  const lastIncludeIndex = values.includes.length - 1;
  const lastInclude = values.includes[lastIncludeIndex];

  // Verificar si el último objeto "includes" tiene valores válidos
  const isLastIncludeValid = lastInclude.item !== "";

  console.log("Valores del formulario: ", values);
  console.log("errors: ", errors);
  //console.log("errors: " , errors.includes[0].item)
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
                Crear Producto
              </Typography>
              <IconButton onClick={handleClose} color="primary">
                <CancelIcon />
              </IconButton>
            </Box>
            <TextField
              name="name"
              label="Name"
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              onChange={handleChange}
              value={values.name}
            />
            <TextField
              name="subname"
              label="subname"
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              onChange={handleChange}
              value={values.subname}
            />
            <TextField
              name="price"
              label="Price"
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              onChange={handleChange}
              value={values.price}
            />
            <TextField
              name="stock"
              label="Stock"
              sx={{
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
              onChange={handleChange}
              value={values.stock}
            />

            {/* INCLUDES */}
            <p>Includes: </p>
            {isLastIncludeValid && (
              <Button
                variant="outlined"
                onClick={() =>
                  setFieldValue("includes", [
                    ...values.includes,
                    { item: "", quantity: 1 },
                  ])
                }
                sx={{ width: "50%" }}
              >
                +
              </Button>
            )}

            {values.includes.map((include, index) => (
              <Box key={index} sx={{ display: "flex" }}>
                <TextField
                  name={`includes[${index}].item`}
                  label="Item included"
                  onChange={handleChange}
                  value={include.item}
                  sx={{
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    width: "75%",
                  }}
                />

                <TextField
                  type="number"
                  name={`includes[${index}].quantity`}
                  label="Quantity"
                  onChange={handleChange}
                  value={include.quantity}
                  inputProps={{
                    min: 1, // Establecer el valor mínimo como 1
                  }}
                  sx={{
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    width: "25%",
                  }}
                />
              </Box>
            ))}

            {/*  TEXTAREA DESCRIPTION */}

            <FormControl>
              <p>Description</p>
              <TextareaAutosize
                placeholder="Description"
                id="description"
                className="textArea"
                name="description"
                onChange={handleChange}
                value={values.description}
              />
            </FormControl>

            {/* TEXTAREA FEATURES */}
            <FormControl>
              <p>Features</p>
              <TextareaAutosize
                placeholder="Features"
                className="textArea"
                style={{ overflow: "auto", height: "auto" }}
                name="features"
                onChange={handleChange}
              />
            </FormControl>

            {/* CHECKBOX NEW PRODUCT */}
            <FormControlLabel
              sx={{
                minWidth: 120,
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                ml: 0,
                mr: 0,
                p: 0.5,
              }}
              control={<Checkbox />}
              label="New product"
              name="new"
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
                  value={values.category}
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
            <p>Main Photo</p>
            <Button
              component="label"
              variant="outlined"
              sx={{
                width: { md: "45%", xs: "99%" },
                p: "14px 15px",
                alignSelf: "flex-start",
              }}
            >
              {values.image ? "Cargado ✔" : "upload photo"}
              <Input
                type="file"
                id="image"
                onChange={handleImageChange}
                name="image"
                sx={{
                  letterSpacing: "inherit",
                  height: "1.4375em",
                  padding: " 16px 14px",
                  p: 2.5,
                  display: "none",
                }}
                variant="outlined"
                error={errors.image ? true : false}
                helperText={errors.image ? true : false}
              />
            </Button>

            {imagePpal && (
              <Button
                onClick={handleImageUpload}
                type="button"
                variant="contained"
                sx={{ width: { md: "45%", xs: "99%" } }}
              >
                Confirm Image
              </Button>
            )}
            {errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}

            {values.image && (
              <Image
                cloudName="dgur5apfu"
                publicId={values.image}
                style={{
                  width: "20%",
                  height: "100%",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}

            {/*  GALLERY */}
            <p>Gallery</p>
            {/* <Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								gap: 1,
							}}
						>
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<img
									//src={values.gallery.first}
									src={imagePreviewGalleryF}
									width="100%"
									height={70}
									className="fotoProduct-gallery"
								/>
								<input
									type="file"
									name="gallery.first"
									//onChange={handleChange}
									onChange={(e) =>
										handleImageChangeTemp("gallery.first", e.target.files[0])
									}
									id="file-input-first"
									accept="image/*"
									style={{ display: "none" }}
								/>
								{!disabled && (
									<label htmlFor="file-input-first">
										<Button variant="outlined" component="span">
											+
										</Button>
										<Typography variant="body2" component="span">
											{values.image ? "" : "Ningún archivo seleccionado"}
										</Typography>
									</label>
								)}
							</Box>

							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<img
									//src={values.gallery.second}
									src={imagePreviewGalleryS}
									width="100%"
									height={70}
									className="fotoProduct-gallery"
								/>
								<input
									type="file"
									name="gallery.second"
									//onChange={handleChange}
									onChange={(e) =>
										handleImageChangeTemp("gallery.second", e.target.files[0])
									}
									id="file-input-second"
									accept="image/*"
									style={{ display: "none" }}
								/>
								{!disabled && (
									<label htmlFor="file-input-second">
										<Button variant="outlined" component="span">
											+
										</Button>
										<Typography variant="body2" component="span">
											{values.image ? "" : "Ningún archivo seleccionado"}
										</Typography>
									</label>
								)}
							</Box>
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<img
									//src={values.gallery.third}
									src={imagePreviewGalleryT}
									width="100%"
									height={70}
									className="fotoProduct-gallery"
								/>
								<input
									type="file"
									name="gallery.third"
									//onChange={handleChange}
									onChange={(e) => handleImageChangeTemp("gallery.third", e.target.files[0])}
									id="file-input-third"
									accept="image/*"
									style={{ display: "none" }}
								/>
								{!disabled && (
									<label htmlFor="file-input-third">
										<Button variant="outlined" component="span">
											+
										</Button>
										<Typography variant="body2" component="span">
											{values.image ? "" : "Ningún archivo seleccionado"}
										</Typography>
									</label>
								)}
							</Box>
						</Box> */}

            {/* BUTTONS */}
            <Box
              sx={{ display: "flex", gap: 0.5, justifyContent: "space-evenly" }}
            >
              <Button type="submit" variant="contained" fullWidth>
                Enviar
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCreateProd;
