import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Actions */
import { createTable, deleteTable, listTables } from "../../actions/tableActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const TableScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");

    const [errors, setErrors] = useState({});

    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const tableList = useSelector((state) => state.tableList);
    const { loading, error, tables, page, pages } = tableList;

    const tableCreate = useSelector((state) => state.tableCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = tableCreate;

    useEffect(() => {
        dispatch(listTables(keyword, pageNumber));
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
            const table = {
                name: name,
            };

            dispatch(createTable(table));
        }
    };
    
    const renderModalCreateTable = () => (
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
                <h2>Register a new table</h2>
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
                        <th>Occupied</th>
                        <th className="d-none d-sm-table-cell">Created At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map((table,idx) => (
                        <tr key={table.id}>
                            <td>{idx+1}</td>
                            <td>{table.name}</td>
                            <td>
                                {table.occupied ? (
                                    <h4 className="text-success">
                                        <i className="fas fa-check"></i>
                                    </h4>
                                ) : (
                                    <h4 className="text-danger">
                                        <i className="far fa-times-circle"></i>
                                    </h4>
                                )}
                            </td>
                            <td className="d-none d-sm-table-cell">
                                {table.created_at.slice(0, 10)}
                            </td>
                            <td>
                                <Link
                                    to={`/dashboard/table/${table.id}/edit`}
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
            <HeaderContent name={"Tables"} />

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateTable()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Tables</h3>
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

export default TableScreen;
