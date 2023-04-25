import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import ModalButton from "../../components/ModalButton";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

/* Actions */
import { createCategory, listCategories} from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const CategoryScreen = ({ history, match }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [name, setName] = useState("");

    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories, page, pages } = categoryList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = categoryCreate;

    useEffect(() => {
        dispatch(listCategories(keyword, pageNumber));

        if (createSuccess) {
            setName("");
            setModalIsOpen(false);
        }
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Name is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const category = {
                name: name,
            };

            dispatch(createCategory(category));
        }
    };

    const renderModalCreateCategory = () => (
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
                <h2>Create a new category</h2>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"name"}
                        type={"text"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />

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

    const renderTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th className="d-none d-sm-table-cell">Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category,idx) => (
                    <tr key={category._id}>
                        <td>{idx + 1}</td>
                        <td>{category.name}</td>
                        <td className="d-none d-sm-table-cell">
                            {category.created_at.slice(0, 10)}
                        </td>
                        <td>
                            <Link
                                to={`/dashboard/category/${category._id}/edit`}
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
            <HeaderContent name={"Categories"} />

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateCategory()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Categories</h3>
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
                                        render={renderTable}
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

export default CategoryScreen;
