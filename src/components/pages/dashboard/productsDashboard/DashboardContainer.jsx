import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase/firebaseConfig";
import Swal from "sweetalert2";
//import { Cloudinary } from 'cloudinary-core';

//const cloudinary = new Cloudinary({ cloud_name: import.meta.env.VITE_CLOUD_NAME });

//import axios from "axios";

const DashboardContainer = () => {
  const [productsList, setProductsList] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [data, setData] = useState({});
  const [changesProducts, setChangesProducts] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      setChangesProducts(false);
      let refCollection = collection(db, "products");
      let res = await getDocs(refCollection);

      let productosFinales = res.docs.map((p) => {
        return {
          ...p.data(),
          id: p.id,
        };
      });
      setProductsList(productosFinales);
    })();
  }, [changesProducts]);

  const viewByID = (product) => {
	handleCloseOptions()
    setOpen(true);
    setDisabled(true);
    setData(product);
  };
  const editByID = (product) => {
	handleCloseOptions()
    setOpen(true);
    setDisabled(false);
    setData(product);
  };
  const deleteByID = (product) => {
	handleCloseOptions()
    Swal.fire({
      title: `Seguro quieres editar este producto: ${product.name}? `,
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `Cancelar `,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Eliminar la imagen de ccloudinary
        // Eliminar el producto de firestore DB
        let refDoc = doc(db, "products", product.id);
        deleteDoc(refDoc);
        setChangesProducts(true);
        Swal.fire("Eliminado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Queda todo como esta", "", "info");
      }
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = productsList.filter((prod) => {
    // Convierte tanto el displayName como el email a minúsculas para hacer la búsqueda insensible a mayúsculas
    const prodName = prod.name.toLowerCase();
    const prodCategory = prod.category.toLowerCase();

    // Verifica si el término de búsqueda está incluido en el nombre o email del usuario
    return (
      prodName.includes(searchTerm.toLowerCase()) ||
      prodCategory.includes(searchTerm.toLowerCase())
    );
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const openOptions = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const props = {
    viewByID,
    editByID,
    deleteByID,
    productsList,
    open,
    handleClose,
    disabled,
    data,
    setChangesProducts,
    openCreate,
    setOpenCreate,
    handleCloseCreate,
    filteredProducts,
    setSearchTerm,
    searchTerm,
	openOptions,
	setAnchorEl,
	anchorEl,
	handleClick,
	handleCloseOptions
  };

  return <Dashboard {...props} />;
};

export default DashboardContainer;
