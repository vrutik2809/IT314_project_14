import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Select from "../../components/Select";

/* Actions */
import { listProducts, createProduct } from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";
import Search from "../../components/Search";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Message from "../../components/Message";

Modal.setAppElement("#root");

const ProductScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(1);
    const [stock, setStock] = useState(1);
    const [category, setCategory] = useState(null);

    const [errors, setErrors] = useState({});

    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = productCreate;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
        if (createSuccess) {
            setName("");
            setPrice(0);
            setStock(0);
            setCategory(null);

            setModalIsOpen(false);
        }
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required";
        }
        if (!price) {
            errorsCheck.price = "Price is required";
        }

        if (!stock) {
            errorsCheck.stock = "Stock is required";
        }
        if (!category) {
            errorsCheck.category = "Category is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const product = {
                name: name,
                price: price,
                stock: stock,
                categoryId: category,
            };
            dispatch(createProduct(product));
        }
    };

    const searchCategories = (e) => {
        dispatch(listCategories(e.target.value));
    };

    const renderCategoriesSelect = () => {
        const mappedCategories = categories.map(category =>{
            const {_id,...rest} = category
            return {
                id: _id,
                ...rest
            }
        })
        return <Select
            data={category}
            setData={setCategory}
            items={mappedCategories}
            search={searchCategories}
        />
    };

    const renderModalCreateProduct = () => (
        <>
            <ModalButton
                modal={modalIsOpen}
                setModal={setModalIsOpen}
                classes={"btn-success btn-lg mb-2"}
            />
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <LoaderHandler loading={createLoading} error={createError} />
                <h2>Add a new product</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />
                    <Input
                        name={"price"}
                        type={"number"}
                        data={price}
                        min={1}
                        setData={setPrice}
                        errors={errors}
                    />
                    <Input
                        name={"stock"}
                        type={"number"}
                        data={stock}
                        min={1}
                        setData={setStock}
                        errors={errors}
                    />
                    {renderCategoriesSelect()}
                    <hr />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-danger float-right"}
                    />
                </form>
            </Modal>
        </>
    );

    const renderProductsTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th className="d-none d-sm-table-cell">Created At</th>
                    <th className="d-none d-sm-table-cell">Category</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {products.map((product,idx) => (
                    <tr key={product.id}>
                        <td>{idx+1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td className="d-none d-sm-table-cell">
                            {product.created_at.slice(0, 10)}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {product.category.name}
                        </td>
                        <td>
                            <Link
                                to={`/dashboard/product/${product.id}/edit`}
                                className="btn btn-warning btn-lg"
                            >
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <HeaderContent name={"Products"} />

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateProduct()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Products
                                    </h3>
                                    <div className="card-tools">
                                        <Search
                                            keyword={keyword}
                                            setKeyword={setKeyword}
                                            setPage={setPageNumber}
                                        />
                                    </div>
                                </div>
                                <div className="card-body table-responsive p-0">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={<DataTableLoader />}
                                        render={renderProductsTable}
                                    />
                                </div>
                            </div>
                            <Pagination
                                page={page}
                                pages={pages}
                                setPage={setPageNumber}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductScreen;
