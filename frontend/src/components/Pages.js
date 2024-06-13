import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Pagination } from "react-bootstrap";
import styled from "styled-components";

const Pages = observer(() => {
    const {product} = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    const Styled = styled(Pagination.Item)`
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin-right: 5px;

    &:hover {
        background-color: #e0e0e0;
    }

    &.active {
        background-color: #007bff;
        color: #fff;
    }`
;

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                key={page}
                active={product.page === page}
                onClick={() => product.setPage(page)}>
                    {page}
                </Pagination.Item>
            )}

        </Pagination>

    );
});


export default Pages;