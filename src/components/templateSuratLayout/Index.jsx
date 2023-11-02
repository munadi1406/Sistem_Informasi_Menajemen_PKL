import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PropTypes from "prop-types";
import ButtonCustom from "../ButtonCustom";
import "./content.css";
import  { useReactToPrint } from "react-to-print";

export default function Index({ isi, data }) {
  const containerRef = useRef();
  const targetRef = useRef();
  const [typeSignature, setTypeSignature] = useState();

  useEffect(() => {
    const container = containerRef.current;
    const ol = container.querySelectorAll("ol");
    const ul = container.querySelectorAll("ul");
    const li = container.querySelectorAll("li");
    const u = container.querySelectorAll("u");
    const a = container.querySelectorAll("a");
    const h1 = container.querySelectorAll("h1");
    const h2 = container.querySelectorAll("h2");
    // const p = container.querySelectorAll("p");
    const h3 = container.querySelectorAll("h3");
    const b = container.querySelectorAll("strong");
    const centerAlignedElement = document.querySelectorAll(".ql-align-center");
    const rightAlignedElement = document.querySelectorAll(".ql-align-right");
    const justifyAlignedElement =
      document.querySelectorAll(".ql-align-justify");

    rightAlignedElement.forEach((e) => {
      e.classList.add("text-right");
    });
    b.forEach((e) => {
      e.classList.add("font-semibold");
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

    ol.forEach((e) => {
      e.classList.add("list-decimal", "ml-5");
    });
    ul.forEach((e) => {
      e.classList.add("list-disc", "ml-5");
    });
    u.forEach((e) => {
      e.classList.add("underline-offset-3");
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
  const [isPrint, setIsPrint] = useState(false);
  useEffect(() => {
    if (isPrint) {
      handlePrint();
    }
  }, [targetRef, isPrint]);

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    onAfterPrint: () => setIsPrint(false),
  });

  return (
    <>
      <div className="text-black w-[793px] m-auto" id="pdf">
        <div id="pdf" className="m-3" ref={targetRef}>
          <Header />
          <div dangerouslySetInnerHTML={{ __html: isi }} ref={containerRef} />
          <Footer
            isSignature={data?.tandaTangan[0]}
            signatureType={typeSignature}
            dataSurat={data}
          />
        </div>
      </div>
      {isi && (
        <div className="flex w-full gap-2 ">
          <ButtonCustom
            onClick={() => {
              setIsPrint(true);
              setTypeSignature("");
            }}
            text={"Print"}
          />
          {data?.tandaTangan[0] && (
            <>
              <ButtonCustom
                onClick={() => {
                  setIsPrint(true);
                  setTypeSignature("qrCode");
                }}
                text={"Qr Code"}
              />
              <ButtonCustom
                onClick={() => {
                  setIsPrint(true);
                  setTypeSignature("tandaTangan");
                }}
                text={"Tanda Tangan"}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
Index.propTypes = {
  isi: PropTypes.node,
  data: PropTypes.object,
};
