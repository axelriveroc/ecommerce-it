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
  const [imagePpalFirst, setImagePpalFirst] = useState("");
  const [imagePpalSecond, setImagePpalSecond] = useState("");
  const [imagePpalThird, setImagePpalThird] = useState("");

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

  const handleGalleryImageChange = (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado por el usuario
    const fieldName = event.target.name; // Nombre del campo (ejemplo: "gallery.first", "gallery.second", etc.)

    if (!allowedFileTypes.includes(file.type)) {
      setFieldError(
        fieldName,
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, jpeg, png, gif y svg."
      );
      if (fieldName === "gallery.first") {
        setImagePpalFirst("");
      } else if (fieldName === "gallery.second") {
        setImagePpalSecond("");
      } else {
        setImagePpalThird("");
      }
      console.error(
        "Tipo de archivo no válido. Solo se permiten imágenes jpg, png, gif y svg."
      );
      return;
    } else {
      if (fieldName === "gallery.first") {
        setImagePpalFirst(file);
      } else if (fieldName === "gallery.second") {
        setImagePpalSecond(file);
      } else {
        setImagePpalThird(file);
      }
      //setFieldValue(fieldName, file); // Actualizar el estado de Formik con la imagen seleccionada
      setFieldError(fieldName, "");
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

  const handleGalleryImageUpload = async (fieldName) => {
    try {
      // Obtener la imagen seleccionada del estado de Formik
      if (fieldName === "first") {
        if (!imagePpalFirst) return;
      } else if (fieldName === "second") {
        if (!imagePpalFirst) return;
      } else {
        if (!imagePpalFirst) return;
      }

      setFieldError(`gallery.${fieldName}`, "");

      // formatea la información que va a enviar a Cloudinary con el objeto formData
      const formData = new FormData();
      if (fieldName === "first") {
        formData.append("file", imagePpalFirst);
      } else if (fieldName === "second") {
        formData.append("file", imagePpalSecond);
      } else {
        formData.append("file", imagePpalThird);
      }
      formData.append("upload_preset", "r8lr9ctz");

      // envía la información a Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgur5apfu/image/upload",
        formData
      );

      // Actualiza el estado de Formik con la URL de la imagen subida a Cloudinary
      setFieldValue(`gallery.${fieldName}`, response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    setFieldValue,
    errors,
    setFieldError,
    touched,
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
      gallery: { first: null, second: null, third: null },
      includes: [{ item: "", quantity: 1 }],
    },
    onSubmit: (dataForm) => {
      console.log(dataForm);
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
    validationSchema: Yup.object().shape({
      name: Yup.string().required("El campo 'Name' es obligatorio."),
      subname: Yup.string().required("El campo 'Subname' es obligatorio."),
      price: Yup.number()
        .typeError("El campo 'Price' debe ser un número.")
        .required("El campo 'Price' es obligatorio.")
        .positive("El precio debe ser un valor positivo.")
        .test(
          "is-decimal",
          "El precio debe tener dos decimales como máximo.",
          (value) => /^\d+(\.\d{1,2})?$/.test(value)
        ),
      stock: Yup.number()
        .typeError("El campo 'Stock' debe ser un número.")
        .required("El campo 'Stock' es obligatorio.")
        .integer("El stock debe ser un número entero.")
        .min(0, "El stock no puede ser negativo."),
      category: Yup.string().required("El campo 'Category' es obligatorio."),
      image: Yup.mixed().required("Debe cargar una imagen principal."),
      description: Yup.string().required(
        "El campo 'Description' es obligatorio."
      ),
      features: Yup.string().required("El campo 'Features' es obligatorio."),
      new: Yup.boolean(),
      gallery: Yup.object().shape({
        first: Yup.mixed()
          .required("Debe cargar una imagen para 'First Image'.")
          /* .test("is-valid-image", "Tipo de archivo no válido.", (value) => {
            if (!value) return true;
            return [
              "image/jpeg",
              "image/png",
              "image/gif",
              "image/svg+xml",
            ].includes(value.type);
          }) */,
        second: Yup.mixed()
          .required("Debe cargar una imagen para 'Second Image'."),
        third: Yup.mixed()
          .required("Debe cargar una imagen para 'Third Image'.")
          ,
      }),
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
    validateOnChange: false,
    validateOnBlur: true,
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
              onBlur={handleBlur}
              value={values.name}
              error={errors.name && touched.name ? true : false}
              helperText={errors.name && touched.name ? errors.name : ""}
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
              onBlur={handleBlur}
              error={errors.subname && touched.subname ? true : false}
              helperText={
                errors.subname && touched.subname ? errors.subname : ""
              }
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
              onBlur={handleBlur}
              error={errors.price && touched.price ? true : false}
              helperText={errors.price && touched.price ? errors.price : ""}
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
              onBlur={handleBlur}
              error={errors.stock && touched.stock ? true : false}
              helperText={errors.stock && touched.stock ? errors.stock : ""}
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
              <Box key={index}>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    name={`includes[${index}].item`}
                    label="Item included"
                    onChange={handleChange}
                    value={include.item}
                    onBlur={handleBlur}
                    sx={{
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      width: "75%",
                    }}
                    error={
                      errors.includes &&
                      touched.includes &&
                      touched.includes[index]?.item &&
                      errors.includes[index]?.item
                        ? true
                        : false
                    }
                    helpertext={
                      errors.includes &&
                      touched.includes &&
                      touched.includes[index]?.item &&
                      errors.includes[index]?.item
                        ? errors.includes[index]?.item
                        : ""
                    }
                  />

                  <TextField
                    type="number"
                    name={`includes[${index}].quantity`}
                    label="Quantity"
                    onChange={handleChange}
                    value={include.quantity}
                    /*        error={errors.includes[index].quantity ? true : false}
                  helpertext={errors.includes[index].quantity ? true : false} */
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
                <FormHelperText error>
                  {errors.includes &&
                  touched.includes &&
                  touched.includes[index]?.item &&
                  errors.includes[index]?.item
                    ? errors.includes[index]?.item
                    : ""}
                </FormHelperText>
              </Box>
            ))}

            {/*  TEXTAREA DESCRIPTION */}
            <FormControl>
              <InputLabel htmlFor="description"></InputLabel>
              <TextField
                placeholder="Description"
                id="description"
                className="textArea"
                name="description"
                onChange={handleChange}
                value={values.description}
                onBlur={handleBlur}
                error={errors.description && touched.description ? true : false}
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : ""
                }
                multiline
                rows={4}
              />
            </FormControl>

            {/* TEXTAREA FEATURES */}

            <FormControl>
              <InputLabel htmlFor="features"></InputLabel>
              <TextField
                placeholder="Features"
                id="features"
                className="textArea"
                name="features"
                onChange={handleChange}
                value={values.features}
                onBlur={handleBlur}
                error={errors.features && touched.features ? true : false}
                helperText={
                  errors.features && touched.features ? errors.features : ""
                }
                multiline
                rows={4}
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
                  onBlur={handleBlur}
                  error={errors.category && touched.category ? true : false}
                  helperText={
                    errors.category && touched.category ? errors.category : ""
                  }
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
              <FormHelperText error>
                {errors.category && touched.category ? errors.category : ""}
              </FormHelperText>
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
                onBlur={handleBlur}
                error={errors.image && touched.image ? true : false}
                helperText={errors.image && touched.image ? errors.image : ""}
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
              <FormHelperText error>
                {errors.image && touched.image ? errors.image : ""}
              </FormHelperText>
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
            <p>Gallery photos</p>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* INPUT PARA PRIMERA IMAGEN DE GALLERY */}

              <p>First Image</p>
              <Button
                component="label"
                variant="outlined"
                sx={{
                  width: { md: "45%", xs: "99%" },
                  p: "14px 15px",
                  alignSelf: "flex-start",
                }}
              >
                {values.gallery.first ? "Cargado ✔" : "Subir imagen"}
                <Input
                  type="file"
                  id="gallery-first"
                  onChange={handleGalleryImageChange}
                  name="gallery.first"
                  sx={{
                    letterSpacing: "inherit",
                    height: "1.4375em",
                    padding: " 16px 14px",
                    p: 2.5,
                    display: "none",
                  }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={
                    errors.gallery?.first && touched.gallery?.first
                      ? true
                      : false
                  }
                  helperText={
                    errors.gallery?.first && touched.gallery?.first
                      ? errors.gallery?.first
                      : ""
                  }
                />
              </Button>
              {imagePpalFirst && (
                <Button
                  onClick={() => handleGalleryImageUpload("first")}
                  type="button"
                  variant="outlined"
                  color="success"
                  sx={{ width: { md: "45%", xs: "99%" }, borderRadius: 2 }}
                >
                  Confirm ✔
                </Button>
              )}

              {errors.gallery?.first && (
                <FormHelperText error>
                  {errors.gallery?.first && touched.gallery?.first
                    ? errors.gallery?.first
                    : ""}
                </FormHelperText>
              )}
              {values.gallery.first && (
                <Image
                  cloudName="dgur5apfu"
                  publicId={values.gallery.first}
                  style={{
                    width: "20%",
                    height: "100%",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              )}

              {/* INPUT PARA SEGUNDA IMAGEN DE GALLERY */}
              <p>Second Image</p>
              <Button
                component="label"
                variant="outlined"
                sx={{
                  width: { md: "45%", xs: "99%" },
                  p: "14px 15px",
                  alignSelf: "flex-start",
                }}
              >
                {values.gallery.second ? "Cargado ✔" : "Subir imagen"}
                <Input
                  type="file"
                  id="gallery-second"
                  onChange={handleGalleryImageChange}
                  name="gallery.second"
                  sx={{
                    letterSpacing: "inherit",
                    height: "1.4375em",
                    padding: " 16px 14px",
                    p: 2.5,
                    display: "none",
                  }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={
                    errors.gallery?.second && touched.gallery?.second
                      ? true
                      : false
                  }
                  helperText={
                    errors.gallery?.second && touched.gallery?.second
                      ? errors.gallery?.second
                      : ""
                  }
                />
              </Button>
              {imagePpalSecond && (
                <Button
                  onClick={() => handleGalleryImageUpload("second")}
                  type="button"
                  variant="outlined"
                  color="success"
                  sx={{ width: { md: "45%", xs: "99%" } }}
                >
                  Confirm ✔
                </Button>
              )}
              {errors.gallery?.second && (
                <FormHelperText error>
                  {errors.gallery?.second && touched.gallery?.second
                    ? errors.gallery?.second
                    : ""}
                </FormHelperText>
              )}
              {values.gallery.second && (
                <Image
                  cloudName="dgur5apfu"
                  publicId={values.gallery.second}
                  style={{
                    width: "20%",
                    height: "100%",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              )}

              {/* INPUT PARA TERCERA IMAGEN DE GALLERY */}
              <p>Third Image</p>
              <Button
                component="label"
                variant="outlined"
                sx={{
                  width: { md: "45%", xs: "99%" },
                  p: "14px 15px",
                  alignSelf: "flex-start",
                }}
              >
                {values.gallery.third ? "Cargado ✔" : "Subir imagen"}
                <Input
                  type="file"
                  id="gallery-third"
                  onChange={handleGalleryImageChange}
                  name="gallery.third"
                  sx={{
                    letterSpacing: "inherit",
                    height: "1.4375em",
                    padding: " 16px 14px",
                    p: 2.5,
                    display: "none",
                  }}
                  variant="outlined"
                  onBlur={handleBlur}
                  error={
                    errors.gallery?.third && touched.gallery?.third
                      ? true
                      : false
                  }
                  helperText={
                    errors.gallery?.third && touched.gallery?.third
                      ? errors.gallery?.third
                      : ""
                  }
                />
              </Button>
              {imagePpalThird && (
                <Button
                  onClick={() => handleGalleryImageUpload("third")}
                  type="button"
                  variant="outlined"
                  color="success"
                  sx={{ width: { md: "45%", xs: "99%" } }}
                >
                  Confirm ✔
                </Button>
              )}
              {errors.gallery?.third && (
                <FormHelperText error>
                  {errors.gallery?.third && touched.gallery?.third
                    ? errors.gallery?.third
                    : ""}
                </FormHelperText>
              )}
              {values.gallery.third && (
                <Image
                  cloudName="dgur5apfu"
                  publicId={values.gallery.third}
                  style={{
                    width: "20%",
                    height: "100%",
                    objectFit: "cover",
                    marginTop: "10px",
                  }}
                />
              )}
            </Box>

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
