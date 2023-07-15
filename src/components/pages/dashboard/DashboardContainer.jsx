import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import Swal from "sweetalert2";

const DashboardContainer = () => {
	const [productsList, setProductsList] = useState([]);
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [data, setData] = useState({});
	const [changesProducts, setChangesProducts] = useState(false);

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
		setOpen(true);
		setDisabled(true);
		setData(product);
	};
	const editByID = (product) => {
		setOpen(true);
		setDisabled(false);
		setData(product);
	};
	const deleteByID = (product) => {
		Swal.fire({
			title: `Seguro quieres editar este producto: ${product.name}? `,
			showDenyButton: true,
			confirmButtonText: "Eliminar",
			denyButtonText: `Cancelar `,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
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
	};

	return <Dashboard {...props} />;
};

export default DashboardContainer;
