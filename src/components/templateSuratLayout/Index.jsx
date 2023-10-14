import { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PropTypes from 'prop-types'

export default function Index({ isi }) {
    const containerRef = useRef();
    useEffect(() => {
        const container = containerRef.current;
        const ol = container.querySelectorAll("ol");
        const ul = container.querySelectorAll("ul");
        const li = container.querySelectorAll("li");
        const u = container.querySelectorAll("u");
        const a = container.querySelectorAll("a");
        const h1 = container.querySelectorAll("h1");
        const h2 = container.querySelectorAll("h2");
        const p = container.querySelectorAll("p");
        const h3 = container.querySelectorAll("h3");
        const centerAlignedElement = document.querySelectorAll('.ql-align-center');
        const rightAlignedElement = document.querySelectorAll('.ql-align-right');
        const justifyAlignedElement = document.querySelectorAll('.ql-align-justify');

      
        rightAlignedElement.forEach((e) => {
            e.classList.add("text-right");
        });
        justifyAlignedElement.forEach((e) => {
            e.classList.add("text-justify");
        });
        centerAlignedElement.forEach((e) => {
            e.classList.add("text-center");
        });
        li.forEach((e) => {
            e.classList.add("break-words");
        });
        p.forEach((e) => {
            e.classList.add("break-words", "overflow-clip");
        });
        ol.forEach((e) => {
            e.classList.add("list-decimal", "ml-5");
        });
        ul.forEach((e) => {
            e.classList.add("list-disc", "ml-5");
        });
        u.forEach((e) => {
            e.classList.add("underline-offset-1");
        });
        a.forEach((e) => {
            e.classList.add("text-blue-600", "underline");
        });
        h1.forEach((e) => {
            e.classList.add("text-2xl");
        });
        h2.forEach((e) => {
            e.classList.add("text-xl");
        });
        h3.forEach((e) => {
            e.classList.add("text-lg");
        });
    }, [isi]);
    return (
        <div className="p-3 text-black w-[793px] m-auto ">
            <Header />
            <div className="h-[400px]">
                <div
                    dangerouslySetInnerHTML={{ __html: isi }}
                    ref={containerRef}
                ></div>
            </div>
            <Footer/>
        </div>
    );
}
Index.propTypes ={
    isi:PropTypes.node
}